const isDoctor = require('../middlewares/doctor.middleware');

const router = require('express').Router();

router.get('/', isDoctor, (req, res, next) => {
    console.log('goiaba', req.goiaba)

    res.status(200).json('Rota de get do doctor');
  });

  module.exports = router;

  //não esquecer do caminho das funções.
  //isAuthenticated --> isDoctor --> função de rota.