const jwt = require('jsonwebtoken');

exports.hello = (req, res) => {
    try {
        res.send('Welcome to the elevate api');
    } catch (error) {
        console.error(error);
    }
};

exports.createAccessToken = (signature) => {
    try {
        const token = jwt.sign(signature, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "3h"
        })    
        return token;
    } catch (error) {
        console.error(error);
        return;
    }
}