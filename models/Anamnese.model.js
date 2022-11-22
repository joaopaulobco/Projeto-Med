const { Schema, model } = require("mongoose");

const anamneseSchema = new Schema(
  {
    genre: {
      type: String,
      required: [true, "Gênero obrigatório"],
      unique: true,
    },

    weight: {
      type: Number,
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

module.exports = model("User", userSchema);
