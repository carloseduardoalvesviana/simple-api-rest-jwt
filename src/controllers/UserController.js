const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    try {
      const { id, email } = req.headers;

      await User.findOne({ _id: id, email: email }).then((user) => {
        if(user) return res.status(200).json(user);
      }).catch((error) => {
        return res.status(400).json(error);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async store(req, res) {
    try {
      await User.findOne({ email: req.body.email }).then((user) => {
        if(user) return res.status(200).json({ message: 'User already exists' });
      }).catch((error) => {
        return res.status(400).json(error);
      });
      
      req.body.password = await bcrypt.hash(req.body.password, 8);
  
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      
      user.save().then((user) => {
        return res.status(201).json(user);
      }).catch((error) => {
        return res.status(400).json(error);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

