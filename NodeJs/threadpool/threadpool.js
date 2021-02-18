// 책 [Node.js 교과서] p.156
// 스레드풀을 사용하는 모듈에는 crypto, zlib, dns.lookup 등이 있다.

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('1:', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('2:', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('3:', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('4:', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('5:', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('6:', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('7:', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('8:', Date.now() - start);
});

/*
실행할 때 마다 시간과 순서가 달라진다. 스레드풀이 작업을 동시에 처리하므로 
여덟 개의 작업 중에서 어느 것이 먼저 처리될 지 모른다. 
1~4와 5~8은 각각 그룹으로 묶어져있고 5~8은 1~4보다 시간이 늦다는 것을 알 수 있다.
스레드풀이 네개 이므로 처음 네 작업이 동시에 실행되고, 
그것들이 종료되면 다음 네 개의 작업이 실행된다. 
그러나 컴퓨터의 코어 개수에 따라 다른 결과가 생길 수 있다.

*/
