const mongoose = require('mongoose');
const config = require('../config');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('./models/portfolio');
require('./models/user');

exports.connect = () => {
  mongoose.connect(config.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }, () => {
    console.log('Connected to DB!');
  })
}

exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: config.DB_URI,
    collection: 'portfolioSessions'
  });

  return store;
}
