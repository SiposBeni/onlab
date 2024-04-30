var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');

var router = express.Router();

// get user by id
router.get('/user/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        if (!data) {
            return res.status(404).json({message: "No user found"});
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, row);
      });
    });
  }));

router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router;