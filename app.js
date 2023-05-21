require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const disablePoweredBy = require('./middlewares/disablePoweredBy');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DB_URL } = process.env;

const app = express();
app.use(cors());
const { PORT = 3003 } = process.env;

mongoose.connect(DB_URL);
app.use(disablePoweredBy);
app.use(express.json());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
