const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true}).then(() => {
    console.log('DB connected...');
}).catch(err=>{
    console.log('Error connecting DB!!', err.name, err.message);
})

module.exports = mongoose.connection;