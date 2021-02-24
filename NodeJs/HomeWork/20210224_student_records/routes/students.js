const express = require('express');
const Students = require('../models/students');

const router = express.Router();

router
	.route('/')
	.get(async function (req, res, next) {
		console.log('get');
		try {
			const student = await Students.findAll();
			res.json(student);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(async function (req, res, next) {
		console.log('post');
		try {
			const newStudent = await Students.create({
				name: req.body.name,
				age: req.body.age,
				sex: req.sex,
				height: req.height,
				address: req.address,
			});
		} catch (err) {
			console.error(err);
			next(err);
		}
	});
router.route('/delete/:id').get((req, res) => {
	client.query('DELETE FROM products WHERE id=?', [req.params.id], (error, fields) => {
		res.redirect('/');
	});
});

router
	.route('/insert')
	.get((req, res) => {
		fs.readFile('insert.html', 'utf-8', (err, data) => {
			res.send(ejs.render(data));
		});
	})
	.post((req, res) => {
		const body = req.body;
		client.query(
			'INSERT INTO products (name, modelnumber, series) values(?, ?, ?)',
			[body.name, body.modelnumber, body.series],
			(error, results, fields) => {
				res.redirect('/');
			}
		);
	});

router
	.route('/edit/:id')
	.get((req, res) => {
		fs.readFile('edit.html', 'utf-8', (error, data) => {
			client.query('SELECT * FROM products WHERE id =?', [req.params.id], (error, result) => {
				res.send(
					ejs.render(data, {
						data: result[0],
					})
				);
			});
		});
	})
	.post((req, res) => {
		const body = req.body;
		client.query(
			'UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?',
			[body.name, body.modelnumber, body.series, req.params.id],
			(error, results, fields) => {
				res.redirect('/');
			}
		);
	});

module.exports = router;
