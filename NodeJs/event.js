// 책 [Node.js 교과서] p.158
/* 
이벤트(event)란 프로그램에 의해 감지되고 처리될 수 있는 동작이나 사건을 말한다. 
대체로 이벤트는 프로그램 동작 과정과 함께 동시에 처리되도록 되어 있다.

Node.js의 on('data', callback) 또는 on('end', callback)의 경우를 예를 들어 설명한다.
data라는 이벤트와 end라는 이벤트가 발생할 때 콜백 함수를 호출하도록 이벤트를 등록한 것이다.
createReadStream 같은 경우는 내부적으로 알아서 data와 end라는 이벤트를 호출하지만, 우리가 직접 이벤트를 만들 수도 있다.
*/

const EventEmitter = require('events');

const eventEmitterObj = new EventEmitter();
eventEmitterObj.addListener('event1', () => {
	console.log('event 1 실행');
});
eventEmitterObj.on('event2', () => {
	console.log('event 2 실행');
});
eventEmitterObj.on('event2', () => {
	console.log('event 2의 두번째 이벤트 실행');
});
// once의 경우 한번만 실행된다.
eventEmitterObj.once('event3', () => {
	console.log('event 3');
});

// 이벤트를 호출한다
eventEmitterObj.emit('event1');
eventEmitterObj.emit('event2'); // 'event2'에 해당되는 이벤트 모두 실행
eventEmitterObj.emit('event3');
eventEmitterObj.emit('event3'); // once로 설정되어 있어서 실행되지 않는다

eventEmitterObj.on('event4', () => {
	console.log('event 4');
});
// 'event4'로 설정된 이벤트들을 모두 삭제한다
eventEmitterObj.removeAllListeners('event4');
// 'event4'는 삭제되어 실행되지 않는다.
eventEmitterObj.emit('event4');

const listener = () => {
	console.log('event 5');
};
eventEmitterObj.on('event5', listener);
eventEmitterObj.removeAllListeners('event5', listener);
eventEmitterObj.emit('event5'); // 삭제되어 실행 안됨

console.log(`'event2' listenerCount :`, eventEmitterObj.listenerCount('event2'));
