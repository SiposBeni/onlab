const express = require('express');
//const { default: mongoose } = require('mongoose');
const EventModel = require('../models/event');
const UserModel = require('../models/user');

const router = express.Router();


module.exports = router;

router.get('/', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.render("home", { user, pageTitle: "Home" });
    } else {
        res.redirect("/login");
    }
});


router.get('/own-events', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.locals.pageTitle = "My events";
        res.render('own_events', { user });
    } else {
        res.redirect("/login");
    }

})

router.get('/events/:id', async function (req, res) {
    const user = req.session.user;
    if (user) {
        const event = await EventModel.findById(req.params.id);
        const creator = await UserModel.findById(event.creator)
        res.render('event', { user, event, pageTitle: "Event", creator });
    } else {
        res.redirect("/login");
    }
})

router.get('/event/new', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.locals.pageTitle = "New event";
        res.render('newEvent', { user, id: req.params.id });
    } else {
        res.redirect("/login");
    }
})

router.post('/event/new', async function (req, res) {
    const user = req.session.user;
    if (user) {
        const { date, address, sport, maxPlayers, description, difficulty, totalCost } = req.body;

        const newEvent = new EventModel({
            date: date,
            address: address,
            sport: sport.toLowerCase(),
            maxPlayers: maxPlayers,
            description: description,
            difficulty: difficulty,
            totalCost: totalCost,
            creator: user._id
        });
        try {
            await newEvent.save();
            const allowedSports = ['volleyball', 'football', 'basketball', 'tennis'];
            const events = await EventModel.find({});
            return res.redirect('/browse');
        } catch (error) {
            res.locals.error = error.message;
            return res.render("newEvent", { user, pageTitle: "New event" });
        }

    } else {
        res.redirect("/login");
    }
})

router.get('/browse', async (req, res) => {
    const user = req.session.user;
    const allowedSports = ['volleyball', 'football', 'basketball', 'tennis'];

    try {
        const events = await EventModel.find({});
        // console.log(events);
        if (user) {
            res.render('browse', { user, pageTitle: "Browse", allowedSports, events });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        res.render('error', { error: "An unexpected error occurred." });
    }
});

router.get('/profile', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.locals.pageTitle = "Profile";
        res.render('profile', { user });
    } else {
        res.redirect("/login");
    }

})