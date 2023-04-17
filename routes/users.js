const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

// GET /users/me возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);
// PATCH /users/me обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string(),
  }),
}), updateProfile);

module.exports = router;
