const handleFollow = (req, res, db) => {
  const { username, following } = req.body;

  if (!username || !following ) {
    return res.status(400).json('incorrect form submission');
  }

  db.transaction(trx => {
    trx.insert({
      //get this from the state
      username: username,
      //get this from the post
      following: following
    })
    .into('following')
    .then(trx.commit)
    .catch(trx.rollback)
    })
  .catch(err => res.status(400).json('unable to follow'))
}

module.exports = {
handleFollow: handleFollow
}