const express = require('express');
const router = express.Router();

const EventModel = require('../models/event');
const isAuthenticated = require('../middlewares/user/session/isAuthenticated');
const fetchEvent = require('../middlewares/event/fetchEvent');
const fetchCreator = require('../middlewares/event/fetchCreator');
const setPageTitle = require('../middlewares/setPageTitle');
const saveEvent = require('../middlewares/event/saveEvent');
const config = require('../config');


router.get('/', isAuthenticated, setPageTitle("Home"), (req, res) => {
    res.render("home");
});

router.get('/own-events', isAuthenticated, setPageTitle("My events"), (req, res) => {
    res.render('own_events');
})

router.get('/events/:id', isAuthenticated, setPageTitle("Event"), fetchEvent, fetchCreator, (req, res) => {
    res.render('event', { event: req.event, creator: req.creator});
});

router.get('/event/new', isAuthenticated, setPageTitle("New Event"), (req, res) => {
    res.render('newEvent');
});

router.post('/event/new', isAuthenticated, setPageTitle("New Event"), saveEvent, (req, res) => {
    res.redirect('/browse');
});

router.get('/browse', isAuthenticated, setPageTitle("Browse"), async (req, res) => {
    const events = await EventModel.find({});
    res.render('browse', { allowedSports: config.allowedSports, events });
});

router.get('/profile', isAuthenticated, setPageTitle("Profile"), (req, res) => {
    res.render('profile');
})

module.exports = router;