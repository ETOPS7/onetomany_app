const router = require('express').Router();
const gpc = require('generate-pincode');
const {
  Presentation, Cloud_template, Type_template, Result_word,
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

  // console.log('bak allpresents ===>', JSON.parse(JSON.stringify(presents)));
  // console.log('presents.Cloud_template',
  // jsonHalper(jsonHalper(presents[0].Cloud_template).Type_template));

  presents = presents.map((el) => {
    const { type } = jsonHalper(jsonHalper(el.Cloud_template).Type_template);
    return {
      id: el.id,
      name: el.name,
      question: el.question,
      user: user_name,
      pincode: el.pincode,
      createdAt: el.createdAt,
      type,
    };
  });
  res.json(jsonHalper(presents));
});

// создание презентации
router.route('/:template').post(async (req, res) => {
  console.log('size------------------------', req.app.locals.ws.size);

  //   const { template } = req.params;
  const pincode = gpc(5);
  const present = await Presentation.create({
    user_id: req.session.user.id,
    name: req.body.name,
    pincode,
  });
  //! Нужно ли записывать результат в переменную если не отпраляем на фронт?
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
  res.json(OnePresent);
});

// открытие конкретной презентации
router.route('/:template/:id').get(async (req, res) => {
  console.log('size------------------------', req.app.locals.ws.size);

  console.log("router.route('/:template/:id').get=====>", req.params.id);
  const present_id = req.params.id;
  const words = Result_word.findAll({ where: { present_id } });
  res.json(words);
  // //! id из нашего cloud template
  // const { id } = req.params;
  // const cloudtemplate = await Cloud_template.findOne({
  //   where: { id },
  // });
  // res.json(cloudtemplate);
});

//! удаление презентаци на странице со списком всех презентаций
router.route('/:id/:template').delete(async (req, res) => {
  try {
    await Presentation.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.route('/word').post(async (req, res) => {
  console.log('size------------------------', req.app.locals.ws.size);
  const currentword = await Result_word.findOne({
    where: {
      word: req.body.word,
    },
  });
  if (currentword) {
    // Result_word.update({ count: word.count + 1 });
    Result_word.increment(
      { count: +1 },
      {
        where: {
          word: currentword.word,
          present_id: currentword.present_id,
        },
      },
    );
    Result_word.save();
  } else {
    Result_word.create({
      present_id: req.body.present_id,
      word: req.body.word,
      count: 1,
    });
  }

  const allWords = await Result_word.findAll({ where: { present_id: currentword.present_id } });
  req.app.locals.ws.words = allWords;
});

module.exports = router;
