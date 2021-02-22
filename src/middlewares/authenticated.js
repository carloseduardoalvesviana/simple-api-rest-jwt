const jwt = require('jsonwebtoken');

module.exports = {
  async verify(req, res, next) {
    try {
      const { token } = req.headers;
      jwt.verify(token, process.env.JWT_SECRET || "123");
      next();
    } catch (error) {
      return res.status(500).json({ 
        token: null, 
        email: null, 
        id: null, 
        message: "Authentication failed!" 
      });
    }
  }
}