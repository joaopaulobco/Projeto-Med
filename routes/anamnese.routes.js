const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Anamnese = require("../models/Anamnese.model");
const User = require("../models/User.model");

const createAnamnese = async (req, res, next) => {
  //TODO VALIDAR TODOS OS CAMPOS NECESSÁRIOS
  req.body.patientId = req.payload._id;
  try {
    const anamneseCreated = await Anamnese.create(req.body);
    res.status(201).json(anamneseCreated);
  } catch (error) {
    next(error);
  }
};

const getAnamneseById = async (req, res, next) => {
  try {
    const anamnese = await Anamnese.findById(req.params.id);
    res.status(200).json(anamnese);
  } catch (error) {
    next(error);
  }
};

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
      throw new Error(
        "Um usúario comum não pode filtrar por id de usúario ou nome"
      );
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

const updateAnamneses = async (req, res, next) => {
  const userId = req.payload._id;
  const isDoctor = req.payload.role === "doctor";

  try {
    const anamnese = await Anamnese.findOne({ _id: req.params.anamneseId });

    if(!anamnese){
      res.status(404).json({message: 'Anamnese não encontrada'})
    }

    if (userId !== anamnese.patientId.toString() && !isDoctor) {
      throw new Error("O id do usuário não corresponde ao id da anamnese ");
    }

    const updatedAnamnese = await Anamnese.findByIdAndUpdate(
      req.params.anamneseId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedAnamnese);
  } catch (error) {
    next(error);
  }
};

const deleteAnamneses = async (req, res, next) => {
  try {
    const deletedAnamnese = await Anamnese.findByIdAndDelete(
      req.params.anamneseId,
      req.body
    );
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
router.post("/", createAnamnese);
router.get("/:id", getAnamneseById);
router.get("/", getAnamneses);
router.put("/:anamneseId", updateAnamneses);
router.delete("/:anamneseId", deleteAnamneses);

module.exports = router;
