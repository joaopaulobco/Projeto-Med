const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/jwt.middleware');

const User = require('../models/User.model');

const SALT_ROUNDS = 10;

// rotas de autenticação
router.post('/', async (req, res, next)  => {
    console.log(req.body)
    const { username, email, password} = req.body;
  try {
    if(!username || !email || !password) {
        const error = new Error('Campos de login obrigatórios');
        error.status = 400;
        throw error;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!regex.test(password)) {
      const error = new Error('Preencha a senha de acordo com os requisitos')
      error.status = 400;
      throw error;
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    
    const userFromDB = await User.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json(userFromDB);
    
    
  } catch (error) {
    next(error);
  }
});





module.exports = router;