const isDoctor = require('../middlewares/doctor.middleware');

const router = require('express').Router();

router.get('/', isDoctor, (req, res, next) => {
    console.log('payload', req.payload)
    console.log('goiaba', req.goiaba)

    res.status(200).json('Rota de get do doctor');
  });

  module.exports = router;