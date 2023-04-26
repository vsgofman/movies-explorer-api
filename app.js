const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const signin = require('./routes/sign-in');
const signup = require('./routes/sign-up');
const routes = require('./routes');
const { auth } = require('./middlewares/auth');
const disablePoweredBy = require('./middlewares/disablePoweredBy');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundApiError = require('./errors/NotFoundApiError');

const app = express();
app.use(cors());
const { PORT = 3003 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/moviedb');
app.use(disablePoweredBy);
app.use(express.json());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);
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
  console.log(`App listening on port ${PORT}`);
});
