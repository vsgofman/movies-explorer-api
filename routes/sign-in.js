const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const authorize = require('../controllers/authorize');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
}), authorize);

module.exports = router;
