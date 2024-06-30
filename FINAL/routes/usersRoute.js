const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/register", async(req, res) => {
    const newuser = new User(req.body)
    try {
        const user = await newuser.save()
        res.send('user Registered succesfully')
    }
    catch (error)
     {
        return res.status(400).send('user not registered')
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const userData = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            };
            return res.send(userData);
        } else {
            // No user found
            return res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        // Error during query
        return res.status(500).json('Internal Server Error');
    }
});

module.exports = router;