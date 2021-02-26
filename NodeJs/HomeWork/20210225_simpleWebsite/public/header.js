const headerGNBObj = new HeaderGNB();

document.addEventListener('DOMContentLoaded', function () {
    initDataSet();

    headerGNBObj.elements.get('logout').hidden = true;
    headerGNBObj.elements.get('userName').hidden = true;

    // document.getElementById('gnb-list-logout').hidden = false;
    // document.getElementById('gnb-list-userName').hidden = true;
});

function initDataSet() {
    headerGNBObj.elements.set(
        'logout',
        document.getElementById('gnb-list-logout')
    );
    headerGNBObj.elements.set(
        'userName',
        document.getElementById('gnb-list-userName')
    );
}

function initEventListener() {}
