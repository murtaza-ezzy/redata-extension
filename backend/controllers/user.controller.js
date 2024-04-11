const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const email = require('../helpers/email.helper');
const Otp = require('../models/otp.model');

module.exports = {
    async auth(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email, status: true })
                .lean();

            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

                // Add the token to the user payload
                user.token = token;

                // Exclude the "password" field
                const { password, ...userWithoutPassword } = user;

                res.json(userWithoutPassword);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },

    async create(req, res) {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'email is already taken.' });
            }
            const payload = req.body;
            payload.password = bcrypt.hashSync(req.body.password, 10);
            const user = new User(payload);

            await user.save();

            res.status(201).json({ message: 'User created successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },

    async getProfile(req, res) {
        try {
            const result = await User.find({
                _id: req.session.user._id
            }).exec();
            res.json(result);
        } catch (error) {
            console.error('Error in fetching user profile:', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    async update(req, res) {
        try {
            const existingUser = await User.findOne({
                email: req.body.email, _id: {
                    $ne: req.body._id
                }
            });
            if (existingUser) {
                return res.status(400).json({ message: 'email is already taken.' });
            }
            const payload = req.body;
            if (req.body.password) {
                payload.password = bcrypt.hashSync(req.body.password, 10);
            }
            const user = await User.findOneAndUpdate({ _id: req.body._id }, {
                $set: payload
            }).exec();

            await user.save();

            res.status(200).json({ message: 'User updated successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },

    async getUsers(req, res) {
        try {
            const payload = {};

            if (req.query._id) {
                payload._id = req.query._id
            }

            const result = await User.find(payload)
                .sort({ createdAt: -1 })
                .select('-password')
                .exec();
            res.json(result);
        } catch (error) {
            console.error('Error in fetching users:', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },

    async sendResetPasswordOtp(req, res) {
        try {
            let user = await User.findOne({ _id: req.session.user._id }).select('name').exec();
            email.sendOtp({
                to: user.email
            });

            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },

    async verifyResetPasswordOtp(req, res) {
        try {
            let user = await User.findOne({ _id: req.session.user._id }).exec();
            let otp = await Otp.findOne({ otp: req.body.otp, email: req.body.email }).exec();
            if (!otp) {
                res.status(401).send('Invalid OTP');
                return;
            }

            if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
                await User.findOneAndUpdate({
                    _id: req.session.user._id
                }, {
                    $set: {
                        password: bcrypt.hashSync(req.body.password, 10)
                    }
                });

                await Otp.findOneAndRemove({
                    _id: otp._id
                }).exec();
                res.sendStatus(200);
            }
            else {
                res.status(401).send('Invalid Current Password');
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
}