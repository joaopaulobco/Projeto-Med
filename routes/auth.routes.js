const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/jwt.middleware');

const User = require('../models/User.model');

const SALT_ROUNDS = 10;

// rotas de autenticação
router.post('/signin', async (req, res, next)  => {
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

router.post('/login', async (req, res, next) => {
  const { email, password} = req.body;
  try {
    if(!email || !password) {
      return res.status(400).json('Email e senha obrigatórios.')
    }

    const userFromDB = await User.findOne({ email });

    if(!userFromDB) {
      return res.status(401).json('Usuário ou senha não encontrados.')
    }

    const verify = bcrypt.compareSync(password, userFromDB.password);

    const payload = {
      _id: userFromDB._id,
      username: userFromDB.username,
      email: userFromDB.email,
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '6h'
      }
    )

    res.status(200).json({token});

  } catch (error) {
    next(error);
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
})





module.exports = router;