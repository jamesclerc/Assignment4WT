var router = require('express').Router();
const User = require('./../db/models/UserModel');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
}

//return an array of all the list of task
router.get('/', async (req, res) => {
  verifyToken(req, res)
  try {
    const users = await User.find();
    res.send(users);
  } catch(err) {
    res.status.send("Unauthorized request")
  }
});

//register user
router.post('/register', async (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    }
  });
});

router.post('/login', async (req, res) => {
  let userData = req.body;

  try {
    user = await User.findOne({ email: userData.email });
    console.log(user);
    if (!user) {
      console.log('401');
      res.status(401).send('Invalid Email');
    } else if (user.password !== userData.password) {
      console.log(401);
      res.status(401).send('Invalid password');
    } else {
      let payload = { subject: user._id };
      let token = jwt.sign(payload, 'secretKey');
      console.log('200');
      console.log(token);
      res.status(200).send({ token });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
