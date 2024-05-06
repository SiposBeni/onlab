const express = require('express');
const router = express.Router();

const EventModel = require('../models/event');
const isAuthenticated = require('../middlewares/user/session/isAuthenticated');
const fetchEvent = require('../middlewares/event/fetchEvent');
const fetchCreator = require('../middlewares/event/fetchCreator');
const setPageTitle = require('../middlewares/setPageTitle');
const saveEvent = require('../middlewares/event/saveEvent');
const joinEvent = require('../middlewares/event/joinEvent');
const leaveEvent = require('../middlewares/event/leaveEvent');
const checkParticipant = require('../middlewares/event/checkParticipant');
const getUser = require('../middlewares/user/getUser');
const deleteUser = require('../middlewares/user/deleteUser');
const logout = require('../middlewares/user/logout');

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

router.post('/event/:id/join', isAuthenticated, fetchEvent(), checkParticipant, joinEvent, (req, res) => {
    res.redirect(`/event/${req.params.id}`);
});

router.post('/event/:id/leave', isAuthenticated, fetchEvent(), checkParticipant, leaveEvent, (req, res) => {
    res.redirect(`/event/${req.params.id}`);
});

router.get('/event/:id', isAuthenticated, setPageTitle("Event"), fetchEvent({ populateParticipants: true }), fetchCreator, checkParticipant, (req, res) => {
    res.render('event/event', {
        event: req.event,
        creator: res.locals.creator,
        participants: req.event.currentPlayers
    });
});

router.get('/profile/:id', isAuthenticated, setPageTitle("Player profile"), getUser, (req, res) => {
    res.render('playerProfile', {
        player: req.player
    });
})

router.post('/deleteUser', isAuthenticated, deleteUser, logout, (req,res) => {
    res.render('profile');
})

router.get('/profile', isAuthenticated, setPageTitle("Profile"), (req, res) => {
    res.render('profile');
})

module.exports = router;