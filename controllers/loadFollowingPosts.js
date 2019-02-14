const loadFollowingPosts = (req, res, db) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json('something went wrong');
  }
  db.select('following').from('following')
  .then(responseData => {
    if (responseData.length > 1) {
      return db.select('*').from('posts')
          .where('username', '=', username)
          .then(data => {
            res.json(data)
          })
          .catch(err => res.status(400).json('unable to find following'))
      } else {
        res.status(400).json('nothing to show')
      }
    }).catch(err => res.status(400).json('unable to find posts'))
}


module.exports = {
  loadFollowingPosts: loadFollowingPosts
}