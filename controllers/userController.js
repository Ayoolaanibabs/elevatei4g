require('dotenv').config();

const AppError = require('../config/appError');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const auth = require('./authController');

exports.signup = async(req, res, next) => {
    try {
        let request = ['email', 'companyName', 'phone', 'address', 'password'];
        request.map(item => {
            if(!req.body[item]) return next(new AppError(`${item} is required`, 400));
        })
        let data = _.pick(req.body, request);
        data.email = data.email.toLowerCase();
        const emailExists = await User.findOne({email: data.email});
        if(emailExists) return next(new AppError('You already have an account', 409));
        let hash = bcrypt.hashSync(data.password);
        data.password = hash;
        const user = await User.create(data);
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        return next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) return next(new AppError('email and password required', 400));
        email = email.toLowerCase();
        const user = await User.findOne({ email }).select('+password');
        if (!user) return next(new AppError('invalid credentials', 400));
        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if (!passwordCorrect) return next(new AppError('invalid credentials', 400));
        let signature = {
            id: user._id,
            email: user.email,
            role: user.role
        }
        const token = auth.createAccessToken(signature);
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            user: user._id,
            token
        })
    } catch (error) {
        return next(error);
    }
};
