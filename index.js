const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jwt-simple')
const path = require('path')
const massive = require('massive')
const moment = require('moment')
const dotenv = require('dotenv')

//----Load Environment Variables----//
dotenv.load({ path: '.env' });

//----Connect to Database----//
const db = massive.connectSync({connectionString: process.env.DB_CONNECT})


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
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
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
app.put('/auth/validate', authCtrl.validateUser);
app.put('/auth/validateAndLogin', authCtrl.validateUserAndLogin);
app.put('/auth/sendPasswordResetUrl', authCtrl.sendPasswordResetUrl);
app.put('/auth/resetPassword', authCtrl.resetPassword);
app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);

//----User Ctrl----//
app.get('/api/getUsers', ensureAuthenticated, userCtrl.getUsers)
app.get('/api/getLoggedInUser/:id', ensureAuthenticated, userCtrl.getLoggedInUser)
app.post('/api/addUser', ensureAuthenticated, userCtrl.addUser);
app.delete('/api/deleteUser/:id', ensureAuthenticated, userCtrl.deleteUser);

app.listen(process.env.PORT, function(){
  console.log('Listening on port ', process.env.PORT)
})