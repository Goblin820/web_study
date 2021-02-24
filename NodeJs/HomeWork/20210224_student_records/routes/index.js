const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
	try {
		// const students = await Students.findAll();
		fs.readFile(path.join(__dirname, '/views/list.html'), 'utf-8', (err, data) => {
			client.query('SELECT * FROM students', (err, results) => {
				res.send(
					ejs.render(data, {
						data: results,
					})
				);
			});
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
