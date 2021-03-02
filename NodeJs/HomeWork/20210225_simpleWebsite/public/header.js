const headerGNBObj = new HeaderGNB();

window.addEventListener('DOMContentLoaded', function () {
    header_initData();
    header_initEventListener();
    header_initSetting();

    // document.getElementById('gnb-list-logout').hidden = true;
    // document.getElementById('gnb-list-userName').hidden = true;
});

function header_initData() {
    headerGNBObj.elements.set(
        'logout',
        document.getElementById('gnb-list-logout')
    );
    headerGNBObj.elements.set(
        'userName',
        document.getElementById('gnb-list-userName')
    );
}

function header_initEventListener() {}

function header_initSetting() {
    headerGNBObj.elements.get('logout').hidden = true;
    headerGNBObj.elements.get('userName').hidden = true;
}
