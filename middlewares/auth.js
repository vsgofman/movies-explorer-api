const jwt = require('jsonwebtoken');
const UnauthorizedApiError = require('../errors/UnauthorizedApiError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedApiError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'jwt');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new UnauthorizedApiError('Прислан некорректный токен');
    }
    throw new UnauthorizedApiError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
