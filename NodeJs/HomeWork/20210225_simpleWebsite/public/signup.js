const signupObj = new SignupData();

window.addEventListener('DOMContentLoaded', function () {
    signup_initData();
    signup_initEventListener();
});

function signup_initData() {
    signupObj.elements.set('userId', document.getElementById('user-id'));
    signupObj.elements.set(
        'userPassword',
        document.getElementById('user-password')
    );
    signupObj.elements.set('userName', document.getElementById('user-name'));
    signupObj.elements.set('btnSubmit', document.getElementById('btn-submit'));
}
function signup_initEventListener() {
    const t = document.getElementById('submit');
    // t.addEventListener('click', function (e) {
    //     e.preventDefault;
    // });
    signupObj.elements.get('btnSubmit').addEventListener('click', signupSubmit);
}

function signupSubmit(e) {
    e.preventDefault();

    const userId = signupObj.elements.get('userId').value;
    console.log(userId);
    // const result = await axios.post(`/users`, )
}
