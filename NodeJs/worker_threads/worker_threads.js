// 책 [Node.js 교과서] p.130

const workerThreads = require('worker_threads');

// mainThread
if (workerThreads.isMainThread) {
    // workerThread 생성(대상)
    const worker = new workerThreads.Worker(__filename);
    // 작업 준비(메세지) 메세지가 오면 실행
    worker.on('message', (message) => console.log('from worker :', message));
    // 작업 준비(종료) 종료지시가 오면 실행
    worker.on('exit', () => console.log('worker exit'));
    // 부모 스레드에게 데이터 메세지를 보낸다.
    worker.postMessage('ping');
}
// workerThread 실행 작업문
else {
    // 부모 스레드 작업 준비(메세지)
    // 메세지가 오면 실행한다.
    workerThreads.parentPort.on('message', (value) => {
        // 받은 메세지를 표시
        console.log('from parent :', value);
        // 워커 스레드에게 데이터 메세지를 보낸다.
        workerThreads.parentPort.postMessage('pong');
        // 부모 스레드와 자식 스레드의 연결을 종료시킨다.
        // 워커 스레드의 worker.on('exit')가 실행된다.
        workerThreads.parentPort.close();
    });
    console.log('workerThread logic');
}
