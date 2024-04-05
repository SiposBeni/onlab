const express = require('express');
const Model = require('../models/model');
const router = express.Router();


module.exports = router;

// post new user
router.post('/post', async (req, res) => {
    // console.log("Inside function")
    const data = new Model({
        name: req.body.name,
        password: req.body.password,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
})

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