require('dotenv').config();
const jwt = require('jsonwebtoken');

const create_token = async (id) => {
  try {
    const token = await jwt.sign(
      { _id: id },
      process.env.TOKEN_SECRET_KEY
    );
    return token;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = create_token;
