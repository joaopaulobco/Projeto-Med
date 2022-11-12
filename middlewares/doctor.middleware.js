const Doctor = require("../models/Doctor.model");

async function isDoctor(req, res, next) {
  const userId = req.payload._id;
  const doctorFromDB = await Doctor.findOne({ _id: userId });

  if (!doctorFromDB) {
    return res.status(401).json("Usuário não autorizado.");
  }
  next();
}

module.exports = isDoctor;
