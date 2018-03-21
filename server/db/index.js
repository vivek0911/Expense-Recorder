const mongoose = require('mongoose');
const constant = require('./constant');

module.exports = () => {
  const connect = () => {
    mongoose.connect(constant.db, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${constant.db}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${constant.db}`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
};
