const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ryanpedersen',
    password : '',
    database : 'pensiv'
  }
});

const app = express();

// //npm installed pieces
app.use(bodyParser.json());
app.use(cors());

//controller actions
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });


//confirming app is running on port 3000
app.listen(3000, () => {
  console.log('app is running')
})