const handleUpvote = (req, res, db) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json(`incorrect submission`);
  }

  db.transaction(trx => {
    db('posts').where('id', '=', id).increment('upvotes', 1)
    .then(trx.commit)
    .catch(trx.rollback)
  })



  // db.transaction(trx => {
  //   trx.increment('upvotes', 1)        
  //   .from('posts')
  //   .where('id', '=', id)
  //   .then(trx.commit)
  //   .catch(console.log(trx.rollback))
  // })

}

module.exports = {
  handleUpvote: handleUpvote
  }