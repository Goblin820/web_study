const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const htmlDir = path.join(__dirname, '../') + 'html/';

app.use(express.static(path.join(__dirname, '../')));

app.use('/', (req, res) => {
	res.redirect('html/index.html');
});

app.listen(3000, () => {
	console.log('3000번 포트에서 대기중');
});
