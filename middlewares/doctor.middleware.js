const Doctor = require('../models/Doctor.model')

function isDoctor (req, res, next) {
console.log('Estou no middleware')
console.log(req.payload)

    req.goiaba = 'goiaba'
    // if (req.user.role === 'doctor') next();
    //  res.status(401).json('Nao é um médico');
    next()
  }


  module.exports = isDoctor;