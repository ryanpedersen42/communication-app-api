//for a theoretical future page

const loadFollowingPosts = (req, res, db) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json('something went wrong');
  }
  
  db.select('*').from('following').where('username', '=', username).join('posts', function() {
    this.on(function() {
      this.on('following', '=', 'posts.id')
      this.orOn('accounts.owner_id', '=', 'users.id')
    })
  }).then(data => {
    res.json(data)
  })

  // db.select('*').from('following')
  // .where('username', '=', username)
  // .then(data => {
  //   res.json(data)
  // })
  //     .catch(err => res.status(400).json('unable to find user'))
    // } else {
    //   res.status(400).json('bad credentials')
//     }
//   }).catch(err => res.status(400).json('unable to find user'))
}

module.exports = {
  loadFollowingPosts: loadFollowingPosts
}