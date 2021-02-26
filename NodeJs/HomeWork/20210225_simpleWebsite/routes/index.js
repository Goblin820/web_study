const express = require('express');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const User = require('../models/user');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
    try {
        const users = await User.findAll();

        // console.log(
        //     'mime : ',
        //     mime.getType(path.join(__dirname, 'images/home_main.jpg'))
        // );
        res.render('home');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.route('/images').get(async (req, res, next) => {
    try {
        const fileName = req.query.fileName;
        const imagePath = path.join(__dirname, '../public/images/', fileName);
        const mimeType = mime.getType(imagePath);
        console.log(imagePath);
        fs.readFile(imagePath, function (error, data) {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.route('/books').get(async (req, res, next) => {
    try {
        res.render('books');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.route('/about').get(async (req, res, next) => {
    try {
        res.render('about');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.route('/signup').get(async (req, res, next) => {
    try {
        res.render('signup');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

exports.router = router;
