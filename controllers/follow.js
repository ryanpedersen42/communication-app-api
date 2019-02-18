const handleFollow = (req, res, db) => {
  const { username, following } = req.body;

  if (!username || !following ) {
    return res.status(400).json(`incorrect form submission`);
  }

  db.select('following').from('following').where('username', '=', username)
  .then(responseData => {
    const arrayThis = responseData.map(e => e.following)
    const findNumber = arrayThis.find(e => e === Number(req.body.following))

    if (findNumber) {
        removeFollowing(username, following)
      } else {
        addNumber(username, following)
      }
    })


  const addNumber = (username, following) => {
    db.transaction(trx => {
      trx.insert({
        username: username,
        following: following
      })
      .into('following')
      .then(trx.commit)
      .catch(trx.rollback)
    })      
  }

  const removeFollowing = (username, following) => {
      db.transaction(trx => {
        trx.del()        
        .from('following')
        .where({
          username: username,
          following: following
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
    }
}

module.exports = {
handleFollow: handleFollow
}