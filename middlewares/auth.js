const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedApiError = require('../errors/UnauthorizedApiError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('12, 11');
    throw new UnauthorizedApiError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwt');
  } catch (err) {
    console.log('11, 12');
    if (err.name === 'JsonWebTokenError') {
      throw new UnauthorizedApiError('Прислан некорректный токен');
    }
    throw new UnauthorizedApiError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
