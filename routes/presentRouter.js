const router = require('express').Router();
const gpc = require('generate-pincode');
const {
  Presentation,
  Cloud_template,
  Type_template,
  Result_word,
} = require('../db/models');
const jsonHalper = (string) => JSON.parse(JSON.stringify(string));

router.route('/presents').get(async (req, res) => {
  const user_id = req.session.user.id;
  const user_name = req.session.user.name;
  let presents = await Presentation.findAll({
    where: { user_id },
    // plain: true,
    include: [
      {
        model: Cloud_template,
        // attributes: {
        //   exclude: ['id', 'present_id', 'createdAt', 'updatedAt'],
        // },
        include: [
          {
            // all: true,
            model: Type_template,
            attributes: [['name', 'type']],
          },
        ],
      },
    ],
  });

  if (presents.length) {
    presents = presents.map((el) => {
      const { type } = jsonHalper(jsonHalper(el.Cloud_template).Type_template);
      return {
        id: el.id,
        name: el.name,
        question: el.Cloud_template.question,
        user: user_name,
        pincode: el.pincode,
        createdAt: el.createdAt,
        type,
      };
    });
    return res.json(jsonHalper(presents));
  } else {
    return res.json(jsonHalper(presents));
  }
  res.sendStatus(400);
});

router.route('/checkpincode').post(async (req, res) => {
  const present = await Presentation.findOne({
    where: {
      pincode: req.body.pincode,
    },
    include: [
      {
        model: Cloud_template,
        attributes: {
          exclude: ['id', 'present_id', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            // all: true,
            model: Type_template,
            attributes: [['name', 'type']],
          },
        ],
      },
    ],
  });
  if (present) {
    const { type } = jsonHalper(
      jsonHalper(present.Cloud_template).Type_template
    );
    const { question } = jsonHalper(present.Cloud_template);

    res.json(
      jsonHalper({
        type,
        id: present.id,
        pincode: req.body.pincode,
        question,
      })
    );

  } else {
    res.sendStatus(400);
  }
});

router.route('/word').post(async (req, res) => {

  const [curword, created] = await Result_word.findOrCreate({
    where: {
      word: req.body.word,
      present_id: req.body.present_id,
    },
    defaults: {
      count: 1,
    },
  });
  if (!created) {
    await curword.increment({ count: +1 });
    await curword.save();
  }
  const allWords = await Result_word.findAll({
    where: {
      present_id: curword.present_id,
    },
    attributes: [['word', 'value'], 'count'],
  });

  for (const [, wsClient] of req.app.locals.ws) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'GET_WORDS',
        payload: allWords,
      })
    );
  }
  res.sendStatus(200);
});

router.route('/:id/:template').delete(async (req, res) => {
  try {
    await Presentation.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.route('/:template/:id').get(async (req, res) => {
  const present_id = req.params.id;
  const words = Result_word.findAll({ where: { present_id } });
  res.json(words);
});

router.route('/:template').post(async (req, res) => {
  const pincode = gpc(5);
  try {
    const present = await Presentation.create({
      user_id: req.session.user.id,
      name: req.body.name,
      pincode,
    });
    const typetemplate = await Type_template.findOne({
      where: { name: req.params.template },
    });
    Cloud_template.create({
      present_id: present.id,
      question: req.body.question,
      type_id: typetemplate.id,
    });
    const OnePresent = {
      id: present.id,
      name: present.name,
      question: req.body.question,
      user: req.session.user.name,
      pincode: present.pincode,
      createdAt: present.createdAt,
      type: req.params.template,
    };
    return res.json(OnePresent);
  } catch (error) {
    console.log(error);
    return res.sendStatus(409);
  }
});

router.route('/word').post(async (req, res) => {
  const currentword = await Result_word.findOne({
    where: {
      word: req.body.word,
    },
  });
  if (currentword) {
    Result_word.increment(
      { count: +1 },
      {
        where: {
          word: currentword.word,
          present_id: currentword.present_id,
        },
      }
    );
    Result_word.save();
  } else {
    Result_word.create({
      present_id: req.body.present_id,
      word: req.body.word,
      count: 1,
    });
  }

  const allWords = await Result_word.findAll({
    where: { present_id: currentword.present_id },
  });
  req.app.locals.ws.words = allWords;
});

router.route('/:id').delete(async (req, res) => {
  try {
    await Presentation.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
