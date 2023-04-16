const { json } = require('express');
const disablePoweredBy = require('./disablePoweredBy');

module.exports = (app) => {
  app.use(json);

  app.use(disablePoweredBy);
};
