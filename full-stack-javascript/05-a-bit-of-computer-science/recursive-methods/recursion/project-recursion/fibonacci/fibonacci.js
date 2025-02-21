function fibs(endNumber) {
  const numbers = [0, 1];
  for (let i = 2; i < endNumber; i++) {
    const nextNumber = numbers[i - 2] + numbers[i - 1];
    numbers.push(nextNumber);
  }

  return numbers;
}

function fibsRec(n) {
  const cache = [0, 1];
  function helper(n) {
    // fib(0) = 0, fib(1) = 1
    if (n < 2) return n;

    if (n > cache.length - 1) cache.push(helper(n - 1) + helper(n - 2));

    return cache[n];
  }
  helper(n);

  return cache.slice(0, cache.length - 1);
}

console.log(`fibs(0) = ${fibs(0)}`);
console.log(`fibs(8) = ${fibs(8)}`);
console.log(`fibs(100) = ${fibs(100)}`);
console.log(`fibs(1000) = ${fibs(1000)}`);
console.log(`fibs(10000) = ${fibs(10000)}`);

console.log(`fibsRec(0) = ${fibsRec(0)}`);
console.log(`fibsRec(8) = ${fibsRec(8)}`);
console.log(`fibsRec(100) = ${fibsRec(100)}`);
console.log(`fibsRec(1000) = ${fibsRec(1000)}`);
console.log(`fibsRec(10000) = ${fibsRec(10000)}`); // Stack overflow occurs
