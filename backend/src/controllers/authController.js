const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' 
    };

    res.status(statusCode)
       .cookie('token', token, options)
       .json({ 
           success: true, 
           user: { id: user._id, email: user.email } 
       });
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            email, 
            password: hashedPassword 
        });

        sendToken(user, 201, res);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        sendToken(user, 200, res);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ success: true, message: "Logged out" });
};

exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(401).json({ error: "User not found" });
        
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};