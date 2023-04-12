const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
module.exports = db;