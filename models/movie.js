const mongoose = require('mongoose');
const UrlRegExp = require('../utils/validateUrl');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: { validator: UrlRegExp, message: 'Введите валидную ссылку' },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: { validator: UrlRegExp, message: 'Введите валидную ссылку' },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: { validator: UrlRegExp, message: 'Введите валидную ссылку' },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);