const express = require('express');
const router = express.Router();

const EventModel = require('../models/event');
const isAuthenticated = require('../middlewares/user/session/isAuthenticated');
const fetchEvent = require('../middlewares/event/fetchEvent');
const fetchCreator = require('../middlewares/event/fetchCreator');
const setPageTitle = require('../middlewares/setPageTitle');
const saveEvent = require('../middlewares/event/saveEvent');
const config = require('../config');

/**
 * Main routes
 */
router.get('/', isAuthenticated, setPageTitle("Home"), (req, res) => {
    res.render("home");
});

router.get('/event/own', isAuthenticated, setPageTitle("My events"), (req, res) => {
    res.render('event/eventOwn');
})

router.get('/event/browse', isAuthenticated, setPageTitle("Browse"), async (req, res) => {
    const events = await EventModel.find({});
    res.render('event/browse', { allowedSports: config.allowedSports, events });
});

router.get('/event/new', isAuthenticated, setPageTitle("New Event"), (req, res) => {
    res.render('event/eventNew');
});

router.post('/event/new', isAuthenticated, setPageTitle("New Event"), saveEvent, (req, res) => {
    res.redirect('/event/browse');
});


router.get('/event/:id', isAuthenticated, setPageTitle("Event"), fetchEvent, fetchCreator, (req, res) => {
    res.render('event/event', { event: req.event, creator: req.creator});
});

router.get('/profile', isAuthenticated, setPageTitle("Profile"), (req, res) => {
    res.render('profile');
})

module.exports = router;