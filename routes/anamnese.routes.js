const router = require('express').Router();

const Anamnese = require('../models/Anamnese.model')

router.post('/anamnese', async (req, res, next) =>{
    console.log(req.Anamnese)
})