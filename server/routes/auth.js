var express = require('express');
var router = express.Router();

const setPageTitle = require('../middlewares/setPageTitle');
const regPassMatch = require('../middlewares/user/register/regPassMatch');
const register = require('../middlewares/user/register/register');
const login = require('../middlewares/user/login');
const initSession = require('../middlewares/user/session/initSession');
const logout = require('../middlewares/user/logout');

/**
 * Routes for authentication related stuff
 */

router.get('/login', setPageTitle("Login"), function (req, res) {
  res.render('login');
});

router.get('/register', setPageTitle("Register"), function (req, res) {
  res.render('register');
});

router.post('/register', regPassMatch, register, (req, res) => {
  return res.redirect("/login");
});

router.post('/login', setPageTitle("Home"), login, initSession, (req, res) => {
  return res.redirect("/");
});

router.get('/logout', logout);

module.exports = router;