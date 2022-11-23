const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Anamnese = require("../models/Anamnese.model");

router.post("/", isAuthenticated, async (req, res, next) => {
  req.body.patientId = req.payload._id;
  try {
    await Anamnese.create(req.body);
    res.status(201).json("Anamnese criada!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
