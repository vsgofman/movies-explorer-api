const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const signin = require('./routes/sign-in');
const signup = require('./routes/sign-up');
const routes = require('./routes');
const { auth } = require('./middlewares/auth');
const disablePoweredBy = require('./middlewares/disablePoweredBy');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundApiError = require('./errors/NotFoundApiError');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/moviedb');
app.use(disablePoweredBy);
app.use(express.json());

app.use(requestLogger);
app.use(signin);
app.use(signup);
app.use(auth);
app.use(routes);

app.use('*', (req, res, next) => {
  next(new NotFoundApiError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
