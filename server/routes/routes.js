const express = require('express');
const router = express.Router();

const EventModel = require('../models/event');
const isAuthenticated = require('../middlewares/user/session/isAuthenticated');
const fetchEvent = require('../middlewares/event/fetchEvent');
const fetchCreator = require('../middlewares/event/fetchCreator');
const setPageTitle = require('../middlewares/setPageTitle');
const saveEvent = require('../middlewares/event/saveEvent');
const createEvent = require('../middlewares/event/createEvent');
const joinEvent = require('../middlewares/event/joinEvent');
const leaveEvent = require('../middlewares/event/leaveEvent');
const getMyEvents = require('../middlewares/event/getMyEvents');
const checkParticipant = require('../middlewares/event/checkParticipant');
const getUser = require('../middlewares/user/getUser');
const deleteUser = require('../middlewares/user/deleteUser');
const logout = require('../middlewares/user/logout');
const addCommendation = require('../middlewares/user/addCommendation');
const changePassword = require('../middlewares/user/changePassword');


const config = require('../config');

/**
 * Main routes
 */

router.get('/event/own', isAuthenticated, setPageTitle("My events"), getMyEvents, (req, res) => {
    const upcomingEvents = req.upcomingEvents;
    const archivedEvents = req.archivedEvents;
    // console.log(archivedEvents);
    res.render('event/eventOwn', { upcomingEvents, archivedEvents });
})

router.get('/event/browse', isAuthenticated, setPageTitle("Browse"), async (req, res) => {
    const now = new Date();
    const events = await EventModel.find({ date: { $gt: now } });
    res.render('event/browse', { allowedSports: config.allowedSports, events });
});

router.get('/event/new', isAuthenticated, setPageTitle("New Event"), (req, res) => {
    res.render('event/eventNew');
});

router.get('/event/:id/edit', isAuthenticated, setPageTitle("Edit Event"), fetchEvent({ populateParticipants: true }), fetchCreator, checkParticipant, (req, res) => {
    if(res.locals.creator._id == res.locals.user._id){
        const formattedDate = new Date(req.event.date.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19);

        return res.render('event/edit', {
            event: req.event,
            creator: res.locals.creator,
            participants: req.event.currentPlayers,
            formattedDate: formattedDate
        });
    }
    res.redirect(`/event/${req.params.id}`);
});

router.post('/event/new', isAuthenticated, setPageTitle("New Event"), createEvent, (req, res) => {
    res.redirect('/event/browse');
});

router.post('/event/save', isAuthenticated, setPageTitle("Save Event"), saveEvent, (req, res) => {
    res.redirect(`/event/${req.event._id}`);
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

router.post('/changePassword', isAuthenticated, setPageTitle("Profile"), changePassword, function (req, res) {
    if (res.locals.error) {
        res.render('profile', { error: res.locals.error, showModal: true  });
    } else {
        res.render('profile', { success: "Password successfuly changed.", showModal: true  });
    }
});

router.post('/profile/:id/commend', isAuthenticated, setPageTitle("Player profile"), getUser, addCommendation, (req, res) => {
    res.redirect(`/profile/${req.params.id}`);
})

router.get('/profile/:id', isAuthenticated, setPageTitle("Player profile"), getUser, (req, res) => {
    console.log(req.recentCommendations);
    res.render('playerProfile', {
        player: req.player,
        recentCommendations: req.recentCommendations
    });
})

router.get('/profile', isAuthenticated, setPageTitle("Profile"), (req, res) => {
    res.render('profile');
})

router.post('/deleteUser', isAuthenticated, deleteUser, logout, (req, res) => {
    res.render('profile');
})

router.get('/', isAuthenticated, setPageTitle("Home"), (req, res) => {
    res.render("home");
});

module.exports = router;