require('dotenv').config();

const AppError = require('../config/appError');
const Company = require('../models/company');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const axios = require('axios');
const auth = require('./authController');

exports.signup = async(req, res, next) => {
    try {
        let request = ['email', 'companyName', 'phone', 'address', 'password'];
        request.map(item => {
            if(!req.body[item]) return next(new AppError(`${item} is required`, 400));
        })
        let data = _.pick(req.body, request);
        data.email = data.email.toLowerCase();
        const emailExists = await Company.findOne({email: data.email});
        if(emailExists) return next(new AppError('You already have an account', 409));
        let hash = bcrypt.hashSync(data.password);
        data.password = hash;
        const company = await Company.create(data);
        res.status(200).json({
            status: 'success',
            data: company
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
        const company = await Company.findOne({ email }).select('+password');
        if (!company) return next(new AppError('invalid credentials', 400));
        const passwordCorrect = bcrypt.compareSync(password, company.password);
        if (!passwordCorrect) return next(new AppError('invalid credentials', 400));
        let signature = {
            id: company._id,
            email: company.email,
        }
        const token = auth.createAccessToken(signature);

        res.status(200).json({
            status: 'success',
            user: company._id,
            token
        })
    } catch (error) {
        return next(error);
    }
};



exports.addMonoId = async (req, res, next) => {
    try {
        let { id, code } = req.body
        const url = "https://api.withmono.com/account/auth"
        const response = await axios.request({
            url,
            method: 'POST',
            data: {code: code},
            headers: {
                Accept: "application/json",
                "mono-sec-key": process.env.MONO_SECRET_KEY,
                "Content-Type": "application/json",
            }
        })
        const data = {
                companyId: id,
                monoId: response.data.id,
                monoCode: code,
                monoStatus: false
        }
        const company = await Company.findOne({ _id: id });
        if (!company) return next(new AppError("company not found", 404));
        const user = await User.create(data);
        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error){
        console.error(error);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const { id } = req.params
        const company = await Company.findOne({ _id: id });
        if (!company) return next(new AppError("company not found", 404));
        const response = await User.find({ companyId: id });
        if(!response.length) return next(new AppError("company has no users", 404));
        res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        console.error(error);
    }
};
