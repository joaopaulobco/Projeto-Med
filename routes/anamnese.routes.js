const router = require("express").Router();

const { query } = require("express");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Anamnese = require("../models/Anamnese.model");
const User = require("../models/User.model");

router.post("/", async (req, res, next) => {
  //TODO VALIDAR TODOS OS CAMPOS NECESSÁRIOS
  req.body.patientId = req.payload._id;
  try {
    const anamneseCreated = await Anamnese.create(req.body);
    res.status(201).json(anamneseCreated);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const anamnese = await Anamnese.findById(req.params.id);
    res.status(200).json(anamnese);
  } catch (error) {
    next(error);
  }
});

const getAnamneses = async (req, res, next) => {
  const userId = req.payload._id;
  const isDoctor = req.payload.role === "doctor";
  const queryParams = req.query;

  try {
    if (queryParams.userId && queryParams.name) {
      throw new Error(
        "Proibido pesquisar por usúario com userid e nome ao mesmo tempo."
      );
    }

    if ((queryParams.userId || queryParams.name) && !isDoctor) {
      throw new Error("Um usúario comum não pode filtrar por userid ou name");
    }

    if (isDoctor && queryParams.name) {
      const regex = new RegExp(queryParams.name, "i");
      const users = await User.find({ username: regex });

      const userIds = users.map((user) => user._id);

      const anamneses = await Anamnese.find({ patientId: userIds });
      res.status(200).json(anamneses);
      return;
    }

    const dbQuery = isDoctor
      ? { patientId: queryParams.userId }
      : { patientId: userId };

    const anamneses = await Anamnese.find(dbQuery);
    res.status(200).json(anamneses);
  } catch (error) {
    next(error);
  }
};

router.get("/", getAnamneses);


module.exports = router;
