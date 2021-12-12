const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.get('/info/:id', user.getUserInfo);
router.get('/transactions/:id', user.getTransactions);
router.get('/balance/:id', user.getBalance);
router.get('/income/:id', user.getIncome);

module.exports = router;
