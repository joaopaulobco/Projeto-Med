const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [ true, 'username obrigatório'],
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'email obrigatório'],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'insira um formato de email válido.']
  },

  password: {
    type: String,
    required: [true, 'password obrigatório']
  }
  
},{ timestamps: true });

module.exports = model('User', userSchema);