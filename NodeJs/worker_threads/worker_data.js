// 책 [Node.js 교과서] p.131
const workerThreads = require('worker_threads');
const Worker = workerThreads.Worker;
if (workerThreads.isMainThread) {
    // 자료구조 생성
    const threads = new Set();

    // 워크 스레드 추가
    threads.add(
        new Worker(__filename, {
            workerData: { start: 1 },
        })
    );
    threads.add(
        new Worker(__filename, {
            workerData: { start: 5 },
        })
    );
    // 모든 워크 스레드를 순회
    for (let worker of threads) {
        // 메세지 이벤트 준비
        worker.on('message', (message) =>
            console.log('from worker :', message)
        );
        // 종료 이벤트 준비
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) console.log('worker done');
        });
    }
} else {
    // 실제 워커 쓰레드가 실행하는 구문, 데이터 메세지를 보낸다.
    const data = workerThreads.workerData;
    workerThreads.parentPort.postMessage(data.start + 100);
}
