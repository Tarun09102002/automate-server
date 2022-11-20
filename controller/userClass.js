var geohash = require('ngeohash');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const activeUsers = []
const { passwordStrength } = require('check-password-strength')


exports.register_user = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(401).send({ error: true, message: 'User already exists' });
    }
    else {
        const { id } = passwordStrength(password)
        if (id < 2) {
            res.status(401).send({ error: true, message: 'Password is too weak' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const result = await newUser.save();
        res.status(200).send({ error: false, message: 'User registered successfully', token: result.id });
    }
}
exports.login_user = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            activeUsers.push(user.id)
            res.status(200).send({ error: false, message: 'User logged in successfully', token: user._id });
        }
        else {
            res.status(401).send({ error: true, message: 'Invalid password' });
        }
    }
    else {
        res.status(401).send({ error: true, message: 'Invalid username' });
    }
}