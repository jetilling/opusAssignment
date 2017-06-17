const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jwt-simple')
const path = require('path')
const massive = require('massive')
const moment = require('moment')
const config = require('./config.json')
const string = config.connectionString

//const db = massive.connectSync({connectionString: string})

const corsOptions = {
  origin: 'http://localhost:6060'
}

const app = module.exports = express();
//app.set('db', db);

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/node_modules", express.static(path.resolve(__dirname, './node_modules')));
app.use(express.static(__dirname + '/src'));



app.listen(config.port, function(){
  console.log('This part works on ', config.port)
})