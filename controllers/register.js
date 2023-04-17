const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestApiError = require('../errors/BadRequestApiError');
const ConflictApiError = require('../errors/ConflictApiError');

const register = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    })).then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
    })).catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestApiError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        next(new ConflictApiError('Пользователь с таким email уже существует'));
      } next(err);
    });
};

module.exports = register;
