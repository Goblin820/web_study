// 책 [Node.js 교과서] p.132
// 2부터 100만까지의 숫자중에 소수가 모두 몇 개 있는지를 알아내는 코드이다.
// 워커 스레드를 사용하지 않고 작업하는 경우를 작성!
const min = 2;
const max = 1000000;
const primes = [];

function generatePrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let k = min; k < Math.sqrt(end); k++) {
            if (i !== k && i % k === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log('length:', primes.length);

// 결과
// prime: 약 490.ms
// length: 9592
