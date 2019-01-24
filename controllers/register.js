const handleRegister = (req, res, db, bcrypt) => {
  const { email, username, password } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  if (!email || !username || !password) {
    return res.status(400).json('incorrect form submission');
  }

  db.transaction(trx => {
    trx.insert({
      email: email,
      hash: hash
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {   
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          username: username,
          joined: new Date(),
        })
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister
}