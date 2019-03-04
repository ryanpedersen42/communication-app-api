const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const editor = require('./controllers/editor');
const follow = require('./controllers/follow');
const loadUserPosts = require('./controllers/loadUserPosts');
const loadAllPosts = require('./controllers/loadAllPosts');
const loadFollowingPosts = require('./controllers/loadFollowingPosts');
const upvote = require('./controllers/upvote');
const reply = require('./controllers/reply');
const loadReplies = require('./controllers/loadReplies');
const loadReplyPost = require('./controllers/loadReplyPost');

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
app.post('/api/loadUserPosts', (req, res) => { loadUserPosts.loadUserPosts(req, res, db) });
app.post('/api/loadAllPosts', (req, res) => { loadAllPosts.loadAllPosts(req, res, db) });
app.post('/api/loadFollowingPosts', (req, res) => { loadFollowingPosts.loadFollowingPosts(req, res, db) });
app.post('/api/upvote', (req, res) => { upvote.handleUpvote(req, res, db) });
app.post('/api/loadReplies', (req, res) => { loadReplies.handleLoadReplies(req, res, db) });
app.post('/api/loadReplyPost', (req, res) => { loadReplyPost.handleReplyPost(req, res, db) });
app.post('/api/reply', (req, res) => { reply.handleReply(req, res, db) });

//confirming app is running on port 3000
app.listen(3000, () => {
  console.log('app is running')
})