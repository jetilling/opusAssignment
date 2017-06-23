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

/**
 * Retrieves logged in user id
 */
app.get('/api/me/', ensureAuthenticated, authCtrl.getMe);

/**
 * Finds matching validation token in db and sets validated to true
 */
app.put('/auth/validate', authCtrl.validateUser);

/**
 * Finds matching validation token in db and sets validated to true
 * It then logs the user in
 */
app.put('/auth/validateAndLogin', authCtrl.validateUserAndLogin);

/**
 * Sends password reset url with random token to email address provided
 */
app.put('/auth/sendPasswordResetUrl', authCtrl.sendPasswordResetUrl);

/**
 * Changes password in db with new password provided
 */
app.put('/auth/resetPassword', authCtrl.resetPassword);

/**
 * Verifies there is a matching email in db and that the passwords match
 */
app.post('/auth/login', authCtrl.login);

/**
 * Verifies there is not a matching email in db and then populates
 * password column, email column, first_name column, and last_name column
 */
app.post('/auth/register', authCtrl.register);


//----User Ctrl----//

/**
 * Retrieves all the users in the database
 */
app.get('/api/getUsers', ensureAuthenticated, userCtrl.getUsers)

/**
 * Retrieves the user information for the logged in user. Searches db based on
 * the id parameter
 */
app.get('/api/getLoggedInUser/:id', ensureAuthenticated, userCtrl.getLoggedInUser)

/**
 * Adds user to db then sends an email to that user with a validation token to 
 * reset their password
 */
app.post('/api/addUser', ensureAuthenticated, userCtrl.addUser);

/**
 * Finds the user in the db with the mathcing id and deletes them
 */
app.delete('/api/deleteUser/:id', ensureAuthenticated, userCtrl.deleteUser);

app.listen(process.env.PORT, function(){
  console.log('Listening on port ', process.env.PORT)
})