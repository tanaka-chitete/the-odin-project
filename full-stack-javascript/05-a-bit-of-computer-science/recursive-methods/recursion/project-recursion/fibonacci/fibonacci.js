function fibs(endNumber) {
  const numbers = [0, 1];
  for (let i = 2; i < endNumber; i++) {
    const nextNumber = numbers[i - 2] + numbers[i - 1];
    numbers.push(nextNumber);
  }

  return numbers;
}

console.log(`fibs(0) = ${fibs(0)}`);
console.log(`fibs(8) = ${fibs(8)}`);
