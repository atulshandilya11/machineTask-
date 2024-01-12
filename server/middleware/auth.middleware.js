const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['authorization'];

  if (!token) {
    res.status(200).send({
      success: false,
      msg: 'A token is required for authentication',
    });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = decode;
  } catch (error) {
    res.status(400).send('invalid token');
  }
  return next();
};

module.exports = verifyToken;
