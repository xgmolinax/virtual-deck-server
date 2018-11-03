require('dotenv').config();
const mongoose = require('mongoose');

before(function() {
    mongoose.connect(
        process.env.DB_URI,
        { useNewUrlParser: true }
    );
    mongoose.set('useFindAndModify', false);
});

after(function() {
    mongoose.connection.close();
});
