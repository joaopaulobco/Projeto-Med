const router = require("express").Router();

const Anamnese = require("../models/Anamnese.model");
const { isDoctor } = require("../middlewares/roles.middleware");

router.post("/", async (req, res, next) => {
  req.body.patientId = req.payload._id;
  try {
    await Anamnese.create(req.body);
    res.status(201).json("Anamnese criada!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
