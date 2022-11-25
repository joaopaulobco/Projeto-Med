const router = require("express").Router();

const Acompanhamento = require("../models/Acompanhamento.model");

router.post("/consulta", async(req, res, next) =>{
    req.body.patientId = req.payload._id;
    try {
        await Acompanhamento.create(req.body);
        res.status(201).json("Acompanhamento feito.")
    } catch (error) {
        next(error);
    }
});



module.exports = router;