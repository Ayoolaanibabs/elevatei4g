const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./config/appError');
const errorHandler = require('./config/errorController');
const authRouter = require('./routes/authRoutes');
const companyRouter = require('./routes/companyRoutes');
const userRouter = require('./routes/userRoutes');

app.use(cors());
app.options('*', cors());

app.use(morgan('short'));

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/user', userRouter);


//error handling
app.use((req, res, next)=>{
    let err = new AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

app.use(errorHandler);

module.exports = app;
