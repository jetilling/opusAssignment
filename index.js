const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jwt-simple')
const path = require('path')
const massive = require('massive')
const moment = require('moment')
const config = require('./config.json')
const string = config.connectionString

const db = massive.connectSync({connectionString: string})
// console.log(db.register_user(['j@j.com', "jfdkal;sdlkf"], function(err, users){
//   if (err) console.log(err)
//   else console.log(users)
// }))

const corsOptions = {
  origin: 'http://localhost:6060'
}

const app = module.exports = express();
app.set('db', db);

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/node_modules", express.static(path.resolve(__dirname, './node_modules')));
app.use(express.static(__dirname + '/src'));

//----Authentication Controller----//
const authCtrl = require('./controllers/authCtrl.js');

//----User Controller----//
const userCtrl = require('./controllers/userCtrl.js');

//----Login Required Middleware----//
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization');
  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

//----Endpoints----//
//----authCtrl----//
app.get('/api/me/', ensureAuthenticated, authCtrl.getMe);
app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);

//----User Ctrl----//
app.get('/api/getUsers', ensureAuthenticated, userCtrl.getUsers)

app.listen(config.port, function(){
  console.log('This part works on ', config.port)
})