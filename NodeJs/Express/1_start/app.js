const express = require('express');
const app = express();

// process.env 객체에 PORT속성이 있다면 그 값을 사용, 아니면 3000으로 설정
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
	res.send('Express Start!!');
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기 중');
});
