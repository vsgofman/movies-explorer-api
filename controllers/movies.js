const Movie = require('../models/movie');
const BadRequestApiError = require('../errors/BadRequestApiError');
const NotFoundApiError = require('../errors/NotFoundApiError');

// GET /movies
const getSavedMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.status(200).send(movies))
  .catch(next);

// POST /movies
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  }).then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestApiError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// DELETE /movies/:movieId
const deleteMovieById = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundApiError('Фильм с указанным id не найден');
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch(next);
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestApiError('Переданы некорректные данные для удаления фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovieById,
};
