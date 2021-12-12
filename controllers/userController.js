const axios= require("axios");
const User = require('../models/user');

exports.getUserInfo = async (req, res) => {
    try {
        const { id } = req.params
        const url = `https://api.withmono.com/accounts/${id}/identity`
        const response = await axios.request({
            url,
            method: 'GET',
            headers: {
                Accept: "application/json",
                "mono-sec-key": process.env.MONO_SECRET_KEY,
                "Content-Type": "application/json",
            }
        })
        const data = response.data
        const update = {
            $set: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                address: data.addressLine1,
                gender: data.gender
            }
        }
        const emailExists = await User.findOne({email: data.email});
        if(!emailExists) {
            const userExists = await User.findOne({monoID: id});
            if (!userExists) return next(new AppError("user not found", 404));
            User.updateOne({monoId: id}, update, {new: true}, function(err, res) {});
        }
        res.status(200).json({
            status: 'success',
            data,
        });
    } catch (error){
        console.error(error);
    }
};

exports.getTransactions = async (req, res)=> {
    try {
        const { id } = req.params
        const url = `https://api.withmono.com/accounts/${id}/transactions`
        const response = await axios.request({
            url,
            method: 'GET',
            headers: {
                Accept: "application/json",
                "mono-sec-key": process.env.MONO_SECRET_KEY,
                "Content-Type": "application/json",
            }
        })
        const data = response.data
        res.status(200).json({
            status: 'success',
            data,
        });
    } catch (error){
        console.error(error);
    }
};

exports.getBalance = async (req, res)=> {
    try {
        const { id } = req.params
        const url = `https://api.withmono.com/accounts/${id}`
        const response = await axios.request({
            url,
            method: 'GET',
            headers: {
                Accept: "application/json",
                "mono-sec-key": process.env.MONO_SECRET_KEY,
                "Content-Type": "application/json",
            }
        })
        const data = response.data.account.balance
        res.status(200).json({
            status: 'success',
            data,
        });
    } catch (error){
        console.error(error);
    }
};

exports.getIncome = async (req, res)=> {
    try {
        const { id } = req.params
        const url = `https://api.withmono.com/accounts/${id}/income`
        const response = await axios.request({
            url,
            method: 'GET',
            headers: {
                Accept: "application/json",
                "mono-sec-key": process.env.MONO_SECRET_KEY,
                "Content-Type": "application/json",
            }
        })
        const data = response.data;
        res.status(200).json({
            status: 'success',
            data,
        });
    } catch (error){
        console.error(error);
    }
};
