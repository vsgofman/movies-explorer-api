const express = require('express');
const mongoose = require('mongoose');
const signin = require('./routes/sign-in');
const signup = require('./routes/sign-up');
const routes = require('./routes');
const { auth } = require('./middlewares/auth');
const setupMiddlewares = require('./middlewares');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundApiError = require('./errors/NotFoundApiError');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
setupMiddlewares(app);

app.use(signin);
app.use(signup);
app.use(auth);
app.use(routes);

app.use('*', (req, res, next) => {
  next(new NotFoundApiError('Страница не найдена'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
