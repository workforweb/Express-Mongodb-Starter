const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function () {
//   console.log('Connected to Mongoose');
// });

module.exports = db;
