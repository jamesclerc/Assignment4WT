var router = require('express').Router();
const User = require('./../db/models/UserModel');
const jwt = require('jsonwebtoken');
const Task = require('./../db/models/TaskModel');
const moment = require('moment');
const nodemailer = require('nodemailer');

let testAccount;
let transporter;
nodemailer.createTestAccount((err, testaccount) => {
  testAccount = testaccount;
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
});

// create reusable transporter object using the default SMTP transport

function verifyToken(req, res) {
  if (!req.headers || !req.headers.authorization) {
    res.status(401).send('Unauthorized request');
    return false;
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send('Unauthorized request');
    return false;
  }
  try {
    var payload = jwt.verify(token, 'secretKey');
  } catch (err) {
    console.log("Payload didn't get verify");
    res.status(401).send('Unauthorized request');
    return false;
  }
  if (!payload) {
    res.status(401).send('Unauthorized request');
    return false;
  }
  req.userId = payload.subject;
  return true;
}

//return all the users
router.get('/', async (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status.send('Unauthorized request');
  }
});


//get a user using the id
router.get('/:id', async (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status.send('Unauthorized request');
  }
});

//used to notify a user because the task are not done
router.get('/notify', async (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  try {
    const user = await User.findById(req.userId);

    const today = moment().startOf('day');

    let tasks = await Task.find({
      userId: user.id,
      completed: false,
      completeBefore: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
    });
    let text = 'Theses tasks are for today : ';
    for (const task in tasks) {
      text += `${task.title}\n`;
    }
    text += `check it on http://localhost:4200/`;
    let info = await transporter.sendMail({
      from: '"Ass4 James & Kévin" <Ass4@example.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Hello You got somes tasks pending for today', // Subject line
      text, // plain text body
    });
    res.send({ message: 'notified' });
  } catch (err) {
    res.status.send('Unauthorized request');
  }
});

//register user
router.post('/register', async (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      res.sendStatus(400)
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    }
  });
});


//login a user
router.post('/login', async (req, res) => {
  let userData = req.body;

  try {
    user = await User.findOne({ email: userData.email });
    if (!user) {
      res.status(401).send('Invalid Email');
    } else if (user.password !== userData.password) {
      res.status(401).send('Invalid password');
    } else {
      let payload = { subject: user._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    }
  } catch (e) {
  }
});

module.exports = router;
