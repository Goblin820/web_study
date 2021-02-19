const loginLogoutBtn = document.getElementById('btn-login-logout');
const signupBtn = document.getElementById('btn-sigup');

(function initialize() {
	offLoginPoup();
	onLoginBtn();
	signupBtn.addEventListener('click', (e) => {
		window.location.href = './signup.html';
	});
})();

function onLoginPopup() {
	document.getElementById('login-popup').hidden = false;
}
function offLoginPoup() {
	document.getElementById('login-popup').hidden = true;
}

function onLoginBtn() {
	loginLogoutBtn.setAttribute('value', '로그인');
	loginLogoutBtn.removeAttribute('click');
	loginLogoutBtn.addEventListener('click', (e) => {});
}
function onLogoutBtn() {
	loginLogoutBtn.setAttribute('value', '로그아웃');
	loginLogoutBtn.removeAttribute('click');
	loginLogoutBtn.addEventListener('click', (e) => {});
}
