const { Router } = require("express");
const router = Router();

const {
  createAnamnese,
  getAnamneses,
  getAnamneseById,
  updateAnamneses,
  deleteAnamneses,
} = require("../controllers/anamnese.controller");

router
  .post("/", createAnamnese)
  .get("/", getAnamneses)
  .get("/:id", getAnamneseById)
  .put("/:anamneseId", updateAnamneses)
  .delete("/:anamneseId", deleteAnamneses);

module.exports = router;
