const router = require('express').Router();
const User = require('../models/user');
const UserPreference = require('../models/userPreference');

router.post('/login', async (req, res) => {
    try {
        const users = await User.find({ username: req.body.username, password: req.body.password });
        res.status(200).send({
            loginAllowed: users.length ? true : false,
        });
    } catch (err) {
        res.status(400).send({ error: 'Error fetching user from db' })
    }
})

router.get('/get-preference/:username', async (req, res) => {
    try {
        const user = await UserPreference.findOne({ username: req.params.username });
        const colorPreference = user?.toObject().colorPreference || null;
        res.status(200).send({
            colorPreference
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Error fetching user preference from db' })
    }
})

router.post('/save-preference', async (req, res) => {
    try {
        const userPreference = await UserPreference.findOne({ username: req.body.username });
        if (userPreference) {
            userPreference.colorPreference = req.body?.colorPreference || userPreference.colorPreference;
            userPreference.save();
        } else {
            await UserPreference.create({
                username: req.body.username,
                colorPreference: req.body.colorPreference || null,
            })
        }
        res.status(200).send({
            preferenceUpdated: true,
        });
    } catch (err) {
        res.status(400).send({ error: 'Error fetching user preference from db' })
    }
})


module.exports = router;
