const router = require('express').Router();

const Anamnese = require('../models/Anamnese.model')
const {isDoctor} = require('../middlewares/roles.middleware')

router.post('/anamnese', isDoctor, async (req, res, next) =>{

})

module.exports = router