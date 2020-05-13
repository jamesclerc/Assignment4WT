var router = require('express').Router();
const User = require('./../db/models/User');

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
      res.status(200).send(registeredUser);
    }
  });
});

router.post('/login', async (req, res) => {
  let userData = req.body;

  try {
    user = await User.findOne({ email: userData.email });
    if (!user) {
      res.status(401).send('Invalid Email');
    } else if (user.password !== userData.password) {
      res.status(401).send('Invalid password');
    } else {
      res.status.send(user);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
