// server.js
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const config = require('./app/config');
app.set('port', config.port);
app.listen(app.get('port'), err=>{
  if(err) console.error(err);
  console.log(`Server listening on port ${app.get('port')}...`);
});

