var router = require('express').Router();
const User = require('./../db/models/UserModel');
const jwt = require('jsonwebtoken');

//return an array of all the list of task
router.get('/', async (req, res) => {
  const list = await List.find();
  res.send(list);
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