const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const register = require('../controllers/register');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).required(),
  }),
}), register);

module.exports = router;
