const { param } = require('jquery');

const TitleMenuObj = {
	listArray: [],
};

document.addEventListener('DOMContentLoaded', function () {
	const headerGNB = document.getElementById('header-gnb-list');
	TitleMenuObj.listArray.push('회원가입');
	TitleMenuObj.listArray.push('로그인');
	TitleMenuObj.listArray.push('홈');

	createElementsAndAppendChilds('li', TitleMenuObj.listArray, headerGNB);
});

function createElementsAndAppendChilds(tagName, arrayData, parent) {
	const array = [];
	for (let i = 0; i < arrayData.length; ++i) {
		if (arrayData[i] == null) continue;
		const element = document.createElement(tagName);
		element.innerHTML = arrayData[i];

		array.push(element);

		parent.appendChild(element);
	}
	return array;
}
