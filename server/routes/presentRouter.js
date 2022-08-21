const router = require('express').Router();
const gpc = require('generate-pincode');
const { Presentation, Cloud_template, Type_template } = require('../db/models');

router.route('/presents').get(async (req, res) => {
  const user_id = req.session.user.id;
  const presents = await Presentation.findAll({ where: { user_id } });
  res.json(presents);
});

router.route('/:template').get(async (req, res) => {
  //   const { template } = req.params;
  const pincode = gpc(5);
  const present = await Presentation.Create({
    user_id: res.session.user.id,
    name: req.body.name,
    pincode,
  });
  //! Нужно ли записывать результат в переменную если не отпраляем на фронт?
  const typetemplate = await Type_template.findOne({
    where: { name: req.params.template },
  });
  Cloud_template.Create({
    present_id: present.id,
    question: req.body.question,
    type_id: typetemplate.id,
  });
  res.sendStatus(200);
});

router.route('/:template/:id').get(async (req, res) => {
  //! id из нашего cloud template
  const { id } = req.params;
  const cloudtemplate = await Cloud_template.findOne({
    where: { id },
  });
  res.json(cloudtemplate);
});

//! удаление презентаци на странице со списком всех презентаций
router.route('/:template/:id').delete(async (req, res) => {
  try {
    await Presentation.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
