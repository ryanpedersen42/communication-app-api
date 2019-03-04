const loadUserPosts = (req, res, db) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json('something went wrong');
  }
  db.select('title').from('posts')
  .then(responseData => {
    if (responseData.length > 1) {
      return db.select('*').from('posts')
          .where('username', '=', username)
          .then(data => {
            res.json(data)
          })
          .catch(err => res.status(400).json('unable to find user'))
      } else {
        res.status(400).json('wrong credentials inside')
      }
    }).catch(err => res.status(400).json('unable to find user'))
}

module.exports = {
  loadUserPosts: loadUserPosts
}