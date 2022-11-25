const { Schema, model } = require("mongoose");

const anamneseSchema = new Schema(
  //TODO TROCAR PARA userId, tirar gender
  {
    patientId:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    gender: {
      type: String,
      required: [true, "Gênero obrigatório"]
    },

    weight: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
    },

    isSmoker: {
      type: String,
    },

    isAlcoholic: {
      type: String,
    },

    exerciseRestrictions: {
      type: String,
    },

    haveDisease: {
      type: Boolean,
    },

    useMedicine: {
      type: Boolean,
    },

    whatMedications: {
      type: String,
    },

    drugDoses: {
      type: Number,
    },

    hereditaryDisease: {
      type: String,
    },

    doDiet: {
      type: Boolean,
    },

    difficultyLosingWeight: [
      {
        type: String,
      },
    ],

    sleepTime: {
      type: Number,
    },

    wakeUpTired: {
      type: Boolean,
    },

    medicineAllergy: {
      type: Boolean,
    },

    someSurgery: {
      type: Boolean,
    },

    whatSurgery: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Anamnese", anamneseSchema);
