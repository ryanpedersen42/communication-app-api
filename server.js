const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const editor = require('./controllers/editor');
const follow = require('./controllers/follow');
const loadPosts = require('./controllers/loadPosts');
const loadFollowingPosts = require('./controllers/loadFollowingPosts');
const upvote = require('./controllers/upvote');

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
app.post('/api/posts', (req, res) => { editor.handlePost(req,res, db) });
app.post('/api/follow', (req, res) => { follow.handleFollow(req, res, db) });
app.post('/api/loadPosts', (req, res) => { loadPosts.loadPosts(req, res, db) });
app.post('/api/loadFollowingPosts', (req, res) => { loadFollowingPosts.loadFollowingPosts(req, res, db) });
app.post('/api/upvote', (req, res) => { upvote.handleUpvote(req, res, db) });

//confirming app is running on port 3000
app.listen(3000, () => {
  console.log('app is running')
})