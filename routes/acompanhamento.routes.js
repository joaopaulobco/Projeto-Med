const router = require("express").Router();
const User = require("../models/User.model");


const Acompanhamento = require("../models/Acompanhamento.model");

router.post("/consulta", async (req, res, next) => {
  req.body.patientId = req.payload._id;
  try {
    const acompanhamentoCriado = await Acompanhamento.create(req.body);
    res.status(201).json(acompanhamentoCriado);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const acompanhamento = await Acompanhamento.findById(req.params.id);
    res.status(200).json(acompanhamento);
  } catch (error) {
    next(error);
  }
});

const getAcompanhamentos = async (req, res, next) => {
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
        throw new Error("Um usúario comum não pode filtrar por id de usúario ou nome");
      }
  
      if (isDoctor && queryParams.name) {
        const regex = new RegExp(queryParams.name, "i");
        const users = await User.find({ username: regex });
  
        const userIds = users.map((user) => user._id);
  
        const acompanhamentos = await Acompanhamento.find({ patientId: userIds });
        res.status(200).json(acompanhamentos);
        return;
      }
  
      const dbQuery = isDoctor
        ? { patientId: queryParams.userId }
        : { patientId: userId };
  
      const acompanhamentos = await Acompanhamento.find(dbQuery);
      res.status(200).json(acompanhamentos);
    } catch (error) {
      next(error);
    }
  };

  router.get("/", getAcompanhamentos);
module.exports = router;

