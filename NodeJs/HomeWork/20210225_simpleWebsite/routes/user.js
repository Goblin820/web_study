const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.route('/insert').post(async (req, res, next) => {
    try {
        const user = await User.create({
            user_id: req.body.user_id,
            user_pass: req.body.user_password,
            user_name: req.body.user_name,
        });
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router
    .route('/update:id')
    .get(async (req, res, next) => {
        try {
            const users = await User.findOne({
                where: {
                    id: req.params.id,
                },
            });
            res.json(users);
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const users = await User.findOne({
                where: {
                    id: req.params.id,
                },
            });
            users
                .update({
                    user_pass: req.body.user_password,
                    user_name: req.body.user_name,
                })
                .then((result) => {
                    console.log(
                        'update id:',
                        req.params.id,
                        '\n result:',
                        result
                    );
                });
            res.status(201).json(users);
        } catch (error) {
            console.error(error);
            next(error);
        }
    });
router.route('/delete:id').post(async (req, res, next) => {
    try {
        const users = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        users.destroy().then((result) => {
            console.log('delete id:', req.params.id, '\n result:', result);
        });
        res.status(201).send(`delete userName: ${users.user_name} success`);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

exports.router = router;
