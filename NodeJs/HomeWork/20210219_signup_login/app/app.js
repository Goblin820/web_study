const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../')));
app.use(cookieParser());
app.use(
	session({
		secret: 'Goblin820',
		resave: true,
		saveUninitialized: true,
	})
);

app.set('views', path.join(__dirname, '../', 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const userInfo = require('../routes/userInfo');
app.use(userInfo.router);

app.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname, '../', 'views/home.html'));
	res.render('home');
});

app.listen(3000, () => {
	console.log('3000번 포트에서 대기중');
});
