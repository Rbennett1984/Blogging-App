// server.js
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./app/router');
const config = require('./app/config').default;

const app = express();

app.use(bodyParser.json());


app.set('port', config.port);
app.listen(app.get('port'), err=>{
  if(err) console.error(err);
  console.log(`Server listening on port ${app.get('port')}...`);
  const db = mongoose.connect(config.db);
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${config.db}`);
  });
});
router(app);


if(process.env.NODE_ENV === "test") {
  app.set('port', config.test_port);
  app.listen(app.get('port'), err => {
    if(err) console.error(err);
    console.log(`Server listening on port$ {app.get('port')}...`);
    const db = mongoose.connect(config.test_db);
  });
} else {
  app.set('port', config.port);
  app.listen(app.get('port'), err => {
    if(err) console.error(err);
    console.log(`Server listening on port ${app.get('port')}...`);
    const db = mongoose.connect(config.db);
    mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${config.db}`);
    });
  });
}

module.exports = app;
