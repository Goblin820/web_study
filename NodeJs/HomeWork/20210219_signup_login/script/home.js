const loginPageObject = {
	contentUserInfo: HTMLElement,
	btnLogInOut: HTMLElement,
	btnSignup: HTMLElement,
};

const loginPopupObject = {
	popupSelector: HTMLElement,
	btnClose: HTMLElement,
	btnLogin: HTMLElement,
	inputId: HTMLElement,
	inputPassword: HTMLElement,
};

window.addEventListener('DOMContentLoaded', function initialize() {
	initDataSetting();
	initEventListener();

	offLoginPoup();
	onLoginBtn();
	userLoginChecking();
});

function initDataSetting() {
	loginPageObject.contentUserInfo = document.getElementById('userInfo');

	loginPageObject.btnLogInOut = document.getElementById('btn-login-logout');
	loginPageObject.btnSignup = document.getElementById('btn-sigup');

	loginPopupObject.popupSelector = document.getElementById('login-popup');
	loginPopupObject.btnClose = document.getElementById('btn-popup-close');
}

function initEventListener() {
	loginPageObject.btnSignup.addEventListener('click', (e) => {
		window.location.href = './signup';
	});
	loginPopupObject.btnClose.addEventListener('click', (e) => {
		offLoginPoup();
	});
}

function onLoginPopup() {
	loginPopupObject.popupSelector.hidden = false;
	setTimeout(() => {
		// 버튼의 요소가 없다면
		if (loginPopupObject.btnLogin == HTMLElement) {
			loginPopupObject.btnLogin = document.getElementById('btn-popup-login');
			loginPopupObject.inputId = document.getElementById('input-login-id');
			loginPopupObject.inputPassword = document.getElementById('input-login-password');

			loginPopupObject.btnLogin.addEventListener('click', (e) => {
				console.log('하고있나');
				const inputData = {
					id: loginPopupObject.inputId.value,
					pass: loginPopupObject.inputPassword.value,
				};

				$.ajax({
					url: '/login',
					type: 'post',
					dataType: 'json',
					data: inputData,
					success: function (req, res) {
						const resText = req.responseText;
						console.log(resText);
						offLoginPoup();
						onLogoutBtn();
					},
					error: function (error) {
						console.log('home.js Error :', error.responseText);
						onLoginBtn();
					},
				});
			});
		} else {
			console.log('sdf');
		}
	}, 200);
}
function offLoginPoup() {
	loginPopupObject.popupSelector.hidden = true;
}

let logInOutEvent = null;

function onLoginBtn() {
	loginPageObject.contentUserInfo.hidden = true;
	loginPageObject.btnLogInOut.setAttribute('value', '로그인');
	loginPageObject.btnLogInOut.removeEventListener('click', logInOutEvent);
	logInOutEvent = function (e) {
		// e.preventDefault();
		onLoginPopup();
	};
	loginPageObject.btnLogInOut.addEventListener('click', logInOutEvent);
}
function onLogoutBtn() {
	loginPageObject.contentUserInfo.hidden = false;
	loginPageObject.btnLogInOut.setAttribute('value', '로그아웃');
	loginPageObject.btnLogInOut.removeEventListener('click', logInOutEvent);
	logInOutEvent = function (e) {};
	loginPageObject.btnLogInOut.addEventListener('click', logInOutEvent);
}

// ------------------------ 비동기 통신 ----------------------- //

function userLoginChecking() {
	$.ajax({
		url: '/loginCheck',
		type: 'get',
		success: function (req, res) {
			const resText = req.responseText;
			console.log(resText);
			onLogoutBtn();
		},
		error: function (error) {
			console.log('home.js Error :', error.responseText);
			onLoginBtn();
		},
	});
}
