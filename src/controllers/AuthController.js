const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async authenticate(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(!user) return res.status(400).json({ message: 'User Does Not Exists!' });
      
      const auth = bcrypt.compareSync(req.body.password, user.password);
      if(!auth) return res.status(400).json({ message: 'Password Incorrect!' });

      const token = jwt.sign(
        { 
          id: user._id, email: user.email 
        }, 
          process.env.JWT_SECRET || "123", 
        {
          algorithm: "HS256",
          expiresIn: "6h"
        }
      );

      if(!token) return res.status(500).json({ message: 'Authentication Failed!' });

      return res.status(200).json({ token: token, email: user.email, id: user._id });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}