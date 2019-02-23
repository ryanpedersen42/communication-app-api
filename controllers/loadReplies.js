const handleLoadReplies = (req, res, db) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json('something went wrong with body');
  }
  db.select('*').from('replies')
  .where('id', '=', id)
  .then(data => {
    res.json(data)
  })
  .catch(err => res.json(400).json('didnt work'))
}

module.exports = {
  handleLoadReplies: handleLoadReplies
}