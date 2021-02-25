const express = require('express');
// const User = require('../models/user');
const path = require('path');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
    try {
        // const users = await User.findAll();
        res.render('home');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

exports.router = router;
