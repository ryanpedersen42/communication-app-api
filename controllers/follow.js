const handleFollow = (req, res, db) => {
  const { username, following } = req.body;

  if (!username || !following ) {
    return res.status(400).json(` ${req.body.username} ${req.body.following} in incorrect form submission`);
  }

  db.transaction(trx => {
    trx.insert({
      username: username,
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