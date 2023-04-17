const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const UrlRegExp = require('../utils/validateUrl');
const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
router.get('/', getSavedMovies);

// POST /movies
router.post('/', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    movieId: Joi.number().required(),
    image: Joi.string().required().pattern(UrlRegExp),
    thumbnail: Joi.string().required().pattern(UrlRegExp),
    trailer: Joi.string().required().pattern(UrlRegExp),
  }),
}), createMovie);

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = router;
