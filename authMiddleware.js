const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mySecretKey';

const validateToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
      console.log(token)

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  return res.status(401).json({ message: 'No auth header' });

}

module.exports = {validateToken, SECRET_KEY }