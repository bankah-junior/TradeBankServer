const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).send({ message: 'Wrong Credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ message: 'Wrong Credentials' });
    }
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.SECRET, { expiresIn: '1h' });
    res.send({ token, user });
  },

  async register(req, res) {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (user) {
      return res.status(409).send({ message: 'User Already Exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = new User({ name, password: hashedPassword });
    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id, name: savedUser.name }, process.env.SECRET, { expiresIn: '1h' });
    res.send({ token, user: savedUser });
  },

  async forgotPassword(req, res) {
    const { name } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.SECRET, { expiresIn: '1h' });
    res.send({ token });
  },

  async resetPassword(req, res) {
    const { token, password } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decoded.userId);
      const hashedPassword = await bcrypt.hash(password, 15);
      user.password = hashedPassword;
      await user.save();
      res.send({ message: 'Password Reset Successfully' });
    } catch (error) {
      res.status(401).send({ message: 'Invalid Token' });
    }
  },
};
