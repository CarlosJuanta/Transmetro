const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '1d',
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};