const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
router.get('/', getSavedMovies);

// # создаёт фильм с переданными в теле
// # country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies
router.post('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    nameRU
    nameEN
    duration
    description
    country
    director
    year
    image
    thumbnail
    trailer
  }),
}), createMovie);

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
router.delete('/movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);
