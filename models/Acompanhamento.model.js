const { Schema, model } = require('mongoose');

const acompanhamentoSchema = new Schema({
    // anamneseId: {
    //     type: Schema.Types.ObjectId,
            // ref:'Anamnese'
    // }
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    weight:{
        type: Number
    },

    abdominalCircumference: {
        type: Number
    },

    hipCircumference: {
        type: Number
    },

    followedSteps: {
        type: String
    },

    messageToDoctor: {
        type: String
    }

},
 {timestamps: true}
 );

module.exports = model("Acompanhamento", acompanhamentoSchema);