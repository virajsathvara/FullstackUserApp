const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "SECRET_TOKEN", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

/* GET users listing. */
router.get('/', authenticateToken, function (req, res, next) {
  const users = req.app.db.collection('users');
  const name = req.query.name;
  const email = req.query.email;
  const query = {};
  if (name)
    query.first_name = name;
  if (email)
    query.email = email;
  users.find(query).toArray()
    .then(result => {
      res.send(result.filter(val => val));
    })
    .catch(error => res.send(error));
});

router.get('/:name', authenticateToken, function (req, res, next) {
  const users = req.app.db.collection('users');
  users.find().toArray()
    .then(result => {
      res.send(result.filter(val => val));
    })
    .catch(error => res.send(error));
});

/* ADD user to listing. */
router.post('/', function (req, res, next) {
  const users = req.app.db.collection('users');
  users.find().toArray()
    .then(result => {
      const exisitingUser = (result.filter(val => val.email === req.body.email));
      if (exisitingUser.length)
        res.send({ message: 'user already exists' });
      else
        users.insertOne(req.body)
          .then(result => {
            //console.log(result);
            res.redirect('/');
          })
          .catch(error => res.send(error));
    })
    .catch(error => res.send(error));
});

/* LOGIN user */
router.post('/login',
  function (req, res, next) {
    const users = req.app.db.collection('users');
    return users.findOne({ email: req.body.email, password: req.body.password }).then((user) => {
      if (user && user.role !== "Admin") {
        res.send({ error: 'You are not admin' });
      } else if (user && user.role === "Admin") {
        console.log(user);
        const accessToken = jwt.sign({ username: user.username, role: user.role }, 'SECRET_TOKEN');
        res.send({ auth: true, token: accessToken });
      } else {
        res.send({ error: 'email or password incorrect' });
      }
    }).catch(err => {
      res.send({ error: `${err}` });
    });
  });

router.post('/logout', function (req, res, next) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
