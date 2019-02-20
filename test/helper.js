const config = require('../config');
const mongoose = require('mongoose');

before(function() {
    mongoose.connect(
        config.DB_URI,
        { useNewUrlParser: true }
    );
    mongoose.set('useFindAndModify', false);
});

after(function() {
    mongoose.connection.close();
});
