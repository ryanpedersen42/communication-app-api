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
}

module.exports = {
  handleUpvote: handleUpvote
  }