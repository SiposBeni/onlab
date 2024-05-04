var express = require('express');
const UserModel = require('../models/user');
var router = express.Router();
const bcrypt = require('bcrypt');

router.get('/login', function (req, res, next) {
  res.locals.pageTitle = "Login";
  res.render('login', { error: false });
});

router.get('/register', function (req, res, next) {
  res.render('register', { pageTitle: "Register" });
});



router.post('/register', async function (req, res, next) {
  let name = req.body.username;
  let password = req.body.password;
  let passwordAgain = req.body.passwordAgain;

  if (password !== passwordAgain) {
    return res.render("register", { pageTitle: "Register", error: "Nem egyezik a két jelszó!" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    name: name,
    password: hashedPwd
  });

  try {
    await newUser.save();
    return res.redirect("/login");
  } catch (error) {
    return res.render("register", { pageTitle: "Register", error: error.message });
  }
});


router.post('/login', async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const user = await UserModel.findOne({ name: username });

 
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.locals.error = "Invalid username or password.";
    return res.render("login", { pageTitle: "Login" });
  }

  req.session.user = {
    _id: user._id,
    name: user.name
  }

  return res.redirect("/");
});

router.use('/logout', function (req, res, next) {
  req.session.destroy();
  return res.redirect('login');
});

module.exports = router;