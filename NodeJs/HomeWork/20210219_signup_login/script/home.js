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

// 데이터 초기화
function initDataSetting() {
	loginPageObject.contentUserInfo = document.getElementById('userInfo');

	loginPageObject.btnLogInOut = document.getElementById('btn-login-logout');
	loginPageObject.btnSignup = document.getElementById('btn-sigup');

	loginPopupObject.popupSelector = document.getElementById('login-popup');
	loginPopupObject.btnClose = document.getElementById('btn-popup-close');
}

// 이벤트 리스너 초기화
function initEventListener() {
	loginPageObject.btnSignup.addEventListener('click', (e) => {
		window.location.href = './signup';
	});
	loginPopupObject.btnClose.addEventListener('click', (e) => {
		offLoginPoup();
	});
}

// 로그인 팝업 창 보이기
function onLoginPopup() {
	loginPopupObject.popupSelector.hidden = false;

	setTimeout(() => {
		// 버튼의 요소가 없다면
		if (loginPopupObject.btnLogin == HTMLElement) {
			loginPopupObject.btnLogin = document.getElementById('btn-popup-login');
			loginPopupObject.inputId = document.getElementById('input-login-id');
			loginPopupObject.inputPassword = document.getElementById('input-login-password');

			// 이벤트 리스너 추가
			loginPopupObject.btnLogin.addEventListener('click', (e) => {
				console.log('하고있나');
				const inputData = {
					id: loginPopupObject.inputId.value,
					pass: loginPopupObject.inputPassword.value,
				};

				// 로그인 통신
				$.ajax({
					url: '/login',
					type: 'post',
					dataType: 'json',
					data: inputData,
					success: function (req, res) {
						offLoginPoup();
						userLoginChecking();
						alert('로그인 성공');
					},
					error: function (error) {
						console.log('로그인 실패');
						// console.log('home.js Error :', error.responseText);
						if (error.responseText.length < 50) alert(error.responseText);
					},
				});
			});
		} else {
			console.log('sdf');
		}
	}, 200);
}
// 로그인 팝업 창 닫기
function offLoginPoup() {
	loginPopupObject.popupSelector.hidden = true;
}

// 로그인과 로그아웃 이벤트 리스너를 담을 변수
let logInOutEvent = null;

// 로그인 버튼으로 체인지
function onLoginBtn() {
	loginPageObject.contentUserInfo.hidden = true;
	loginPageObject.btnLogInOut.setAttribute('value', '로그인');

	// 기존 이벤트 리스너 삭제
	loginPageObject.btnLogInOut.removeEventListener('click', logInOutEvent);

	// 이벤트 리스너 추가
	logInOutEvent = function (e) {
		onLoginPopup();
	};
	loginPageObject.btnLogInOut.addEventListener('click', logInOutEvent);
}
// 로그아웃 버튼으로 체인지
function onLogoutBtn() {
	loginPageObject.contentUserInfo.hidden = false;
	loginPageObject.btnLogInOut.setAttribute('value', '로그아웃');

	// 기존 이벤트 리스너 삭제
	loginPageObject.btnLogInOut.removeEventListener('click', logInOutEvent);

	// 이벤트 리스너 추가
	logInOutEvent = function (e) {
		$.ajax({
			url: '/logout',
			type: 'get',
			success: function (req, res) {
				loginPopupObject.inputId.value = '';
				loginPopupObject.inputPassword.value = '';
				userLoginChecking();
				alert(req);
			},
			error: function (error) {
				console.log('로그아웃 실패 :', error.responseText);
			},
		});
	};
	loginPageObject.btnLogInOut.addEventListener('click', logInOutEvent);
}

// 유저 로그인 체크 통신
function userLoginChecking() {
	$.ajax({
		url: '/loginCheck',
		type: 'get',
		success: function (req, res) {
			document.getElementById('userId').innerText = req;
			onLogoutBtn();
		},
		error: function (error) {
			console.log('home.js Error :', error.responseText);
			onLoginBtn();
		},
	});
}
