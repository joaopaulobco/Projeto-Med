const { Router } = require("express");
const router = Router();

const Acompanhamento = require("../models/Acompanhamento.model");

const createAcompanhamento = async (req, res, next) => {
  req.body.patientId = req.payload._id;
  try {
    const acompanhamentoCriado = await Acompanhamento.create(req.body);
    res.status(201).json(acompanhamentoCriado);
  } catch (error) {
    next(error);
  }
};

const getAcompanhamentosById = async (req, res, next) => {
  try {
    const acompanhamento = await Acompanhamento.findById(req.params.id);
    res.status(200).json(acompanhamento);
  } catch (error) {
    next(error);
  }
};

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
      throw new Error(
        "Um usúario comum não pode filtrar por id de usúario ou nome"
      );
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

const updateAcompanhamento = async (req, res, next) => {
  const userId = req.payload._id;
  const isDoctor = req.payload.role === "doctor";

  try {
    const acompanhamento = await Acompanhamento.findOne({ _id: req.params.acompanhamentoId });

    if (!acompanhamento) {
      res.status(404).json({ message: "Acompanhamento não encontrado" });
    }
    
    if (userId !== acompanhamento.patientId.toString() && !isDoctor) {
      throw new Error("O id do usuário não corresponde ao id do acompanhamento ");
    }
    const updatedAcompanhamento = await Acompanhamento.findByIdAndUpdate(
      req.params.acompanhamentoId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedAcompanhamento);
  } catch (error) {
    next(error);
  }
};

const deleteAcompanhamentos = async (req, res, next) => {
  const userId = req.payload._id;
  const isDoctor = req.payload.role === "doctor";
  try {
    const acompanhamento = await Acompanhamento.findOne({ _id: req.params.acompanhamentoId });

    if (!acompanhamento) {
      res.status(404).json({ message: "Anamnese não encontrada" });
    }

    if (userId !== acompanhamento.patientId.toString() && !isDoctor) {
      throw new Error("Ação não autorizada");
    }

    await Acompanhamento.findByIdAndDelete(req.params.acompanhamentoId, req.body);
    res.status(200).json({ message: "Acompanhamento deletado" });
  } catch (error) {
    next(error);
  }
};

router.post("/consulta", createAcompanhamento);
router.get("/", getAcompanhamentos);
router.get("/:id", getAcompanhamentosById);
router.put("/:acompanhamentoId", updateAcompanhamento)
router.delete("/:acompanhamentoId", deleteAcompanhamentos);

module.exports = router;

