const express = require('express');
const fs = require('fs');
const path = require('path');

const mysql = require('mysql2');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const ejs = require('ejs');

const { sequelize } = require('./models');
const indexRouter = require('./routes/index');
// const studentsRouter = require('./routes/students');

const client = mysql.createConnection({
	user: 'root',
	password: '1234',
	database: 'student_records',
});

const app = express();
app.set('port', process.env.PORT || 3000);

// const Students = require('./models/students');
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, '/views'));

// sequelize
// 	.sync({ force: false })
// 	.then(() => {
// 		console.log('데이터 베이스 연결 성공');
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRouter);

// app.use('/student', studentsRouter);

app.get('/', async (req, res, next) => {
	try {
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

app.get('/delete/:id', (req, res) => {
	client.query('DELETE FROM students WHERE id=?', [req.params.id], (error, fields) => {
		res.redirect('/');
	});
});

app.get('/insert', (req, res) => {
	fs.readFile(path.join(__dirname, '/views/insert.html'), 'utf-8', (err, data) => {
		res.send(ejs.render(data));
	});
});
app.post('/insert', (req, res) => {
	const body = req.body;
	if (!body.height) body.height = 180;
	if (!body.age) body.age = 20;
	client.query(
		'INSERT INTO students (name, age, sex, height, address) values(?, ?, ?, ?, ?)',
		[body.name, body.age, body.sex, body.height, body.address],
		(error, results, fields) => {
			console.log(error);
			console.log(results);
			res.redirect('/');
		}
	);
});

app.get('/edit/:id', (req, res) => {
	fs.readFile(path.join(__dirname, '/views/edit.html'), 'utf-8', (error, data) => {
		client.query('SELECT * FROM students WHERE id =?', [req.params.id], (error, result) => {
			res.send(
				ejs.render(data, {
					data: result[0],
				})
			);
		});
	});
});
app.post('/edit/:id', (req, res) => {
	const body = req.body;
	client.query(
		'UPDATE students SET age=?, sex=?, height=?, address=? WHERE id=?',
		[body.age, body.sex, body.height, body.address, req.params.id],
		(error, results, fields) => {
			console.log(error);
			res.redirect('/');
		}
	);
});

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});
// app.use((err, req, res, next) => {
// 	res.locals.message = err.message;
// 	res.locals.error = process.env.NODE_ENV !== 'student_records' ? err : {};
// 	res.status(err.status || 500);
// 	// res.render('error');
// });

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기 중');
});
