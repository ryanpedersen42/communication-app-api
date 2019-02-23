const handleReply = (req, res, db) => {
  const { username, text, id } = req.body;

  if (!username || !id || !text ) {
    return res.status(400).json('incorrect form submission');
  }

  db.transaction(trx => {
    trx.insert({
      username: username,
      text: text, 
      id: id,
    })
    .into('replies')
    .returning('*')
    .then(editor => {
      res.json(editor[0]);
    })
    .then(trx.commit)
    .catch(trx.rollback)
    })
  .catch(err => res.status(400).json('unable to post'))
}

module.exports = {
handleReply: handleReply
}