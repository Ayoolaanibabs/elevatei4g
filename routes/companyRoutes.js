const express = require('express');
const router = express.Router();
const company = require('../controllers/companyController');

router.get('/users/:id', company.getAllUsers);

router.post('/signup', company.signup);
router.post('/login', company.login);
router.post('/addid', company.addMonoId);


module.exports = router;
