const express = require('express');
const crypto = require('crypto');
const session = require('express-session');

const router = express.Router();

router.get('/signup', function (req, res, next) {
	console.log('회원가입 페이지 렌더링');
	res.render('signup');
});
router.post('/signup', function (req, res) {
	console.log('회원가입 시도');

	let body = req.body;

	// 암호화 작업
	crypto.randomBytes(64, function (err, buf) {
		const salt = buf.toString('base64');
		crypto.pbkdf2(body.userPass, salt, 100000, 64, 'sha512', async function (err, key) {
			let user = {
				id: body.userId,
				password: key.toString('base64'),
				salt: salt,
			};

			// 쿠키 생명주기를 10분으로 설정
			res.cookie(body.userId, user, { maxAge: 600000 });

			res.redirect('/signup/result');
		});
	});
});

// 유저 정보들을 보여준다.
router.get('/signup/result', function (req, res) {
	let html = `
	<!DOCTYPE html>
	    <html lang="ko">
	        <head>
	            <meta charset="UTF-8" />
	            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	            <title>회원가입 확인</title>
	            <style>
	                section {
	                    margin: 100px auto 0px auto;
	                    width: 500px;
	                }
	            </style>
	             </head>
	             <body>
	            <section>
				<h2>
				회원가입 아이디 정보
				</h2>
				<ol>`;

	for (let property in req.cookies) {
		if (!req.cookies.hasOwnProperty(property) || property == 'connect.sid') {
			continue;
		}
		html += `<li>${property}</li>`;
	}
	html += `</ol>
	            </section>
	        </body>
	    </html>`;

	// res.send(req.cookies);
	res.send(html);
});
router.get('/signup/list', function (req, res) {
	res.send(req.cookies);
});

// 유저 정보 삭제
router.get('/signup/clear', function (req, res) {
	let keyArray = [];
	for (let property in req.cookies) {
		if (!req.cookies.hasOwnProperty(property)) {
			continue;
		}
		keyArray.push(property);
	}
	for (let i = 0; i < keyArray.length; i++) {
		res.clearCookie(keyArray[i]);
	}
	res.send('유저 정보 클리어 완료');
});

// 로그인 상태 체크
router.get('/loginCheck', function (req, res) {
	if (req.session.userId) {
		console.log('로그인 체크 id :', req.session.userId);
		res.status(200).send(req.session.userId);
	} else {
		res.status(404).send('로그인 되어있는 아이디가 없다');
	}
});

// 로그인
router.post('/login', function (req, res) {
	console.log(req.body);
	const body = req.body;

	const dbData = req.cookies[body.id];

	// 존재하는 아이디가 없다면
	if (dbData == null) {
		req.session.destroy();
		res.status(404).send('존재하는 아이디가 없습니다.');
	} else {
		let inputPassword = body.pass;
		let dbPassword = dbData.password;
		let salt = dbData.salt;
		let hashPassword = '';

		// 복호화 작업
		crypto.pbkdf2(inputPassword, salt, 100000, 64, 'sha512', async function (err, key) {
			hashPassword = key.toString('base64');

			// 비밀번호 일치
			if (dbPassword === hashPassword) {
				console.log('비밀번호 맞음');
				req.session.userId = dbData.id;
				res.status(200).send(body);
			} else {
				res.status(404).send('비밀번호가 틀렸습니다.');
			}
		});
	}
});

router.get('/logout', function (req, res) {
	req.session.destroy();
	res.status(200).send('로그아웃 성공');
});
exports.router = router;
