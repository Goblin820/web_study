// 책 [Node.js 교과서] p.133
// 2부터 100만까지의 숫자중에 소수가 모두 몇 개 있는지를 알아내는 코드를
// 워커로 돌렸을 때의 경우

const workerThreads = require('worker_threads');
const Worker = workerThreads.Worker;
const workerData = workerThreads.workerData;
const min = 2;
let primes = [];

function findPrimes(start, range) {
    let isPrime = true;
    let end = start + range;
    for (let i = start; i < end; i++) {
        for (let k = min; k < Math.sqrt(end); k++) {
            if (i !== k && i % k === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
        isPrime = true;
    }
}

if (workerThreads.isMainThread) {
    const max = 1000000;
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max - min) / threadCount);
    let start = min;
    console.time('prime');
    for (let i = 0; i < threadCount - 1; i++) {
        const wStart = start;
        threads.add(
            new Worker(__filename, { workerData: { start: wStart, range } })
        );
        start += range;
    }
    threads.add(
        new Worker(__filename, {
            workerData: {
                start,
                range: range + ((max - min + 1) % threadCount),
            },
        })
    );
    for (let worker of threads) {
        worker.on('error', (err) => {
            throw err;
        });
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.timeEnd('prime');
                console.log('length :', primes.length);
            }
        });
        worker.on('message', (msg) => {
            primes = primes.concat(msg);
        });
    }
} else {
    findPrimes(workerData.start, workerData.range);
    workerThreads.parentPort.postMessage(primes);
}

// 결과
// prime: 약 220.ms
// length: 9592

// 100만개의 숫자의 경우 멀티스레드가 빠랐으나
// 10만개 같은 비교적 적은 수에서는 싱글 스레드가 더 빨랐다
