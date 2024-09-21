const User = require('../models/userModel.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr'});
        res.status(201).json({ token });

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            res.status(400).json({ error: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.status(201).json({ token });

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if(!token) {
            res.status(403).json({ error: 'Token required' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

module.exports = { signup, login, verifyToken };