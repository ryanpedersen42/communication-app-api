const handlePost = (req, res, db) => {
  const { username, title, text } = req.body;

  if (!username || !title || !text) {
    return res.status(400).json('incorrect form submission');
  }

  db.transaction(trx => {
    trx.insert({
      username: username,
      title: title,
      text: text, 
      posted: new Date()
    })
    .into('posts')
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
handlePost: handlePost
}