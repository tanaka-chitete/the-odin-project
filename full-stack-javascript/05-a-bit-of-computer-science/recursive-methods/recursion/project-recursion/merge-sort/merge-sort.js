"use strict"; // Converts mistakes to errors (among other things)

function mergeSort(array) {
  function split(array) {
    if (array.length <= 1) return array;

    let middleIndex = Math.floor(array.length / 2);

    let leftSubArray = split(array.slice(0, middleIndex));
    let rightSubArray = split(array.slice(middleIndex));

    return merge(leftSubArray, rightSubArray);
  }

  function merge(leftSubArray, rightSubArray) {
    let sortedArray = [];

    while (leftSubArray.length && rightSubArray.length) {
      if (leftSubArray[0] < rightSubArray[0]) {
        sortedArray.push(leftSubArray.shift());
      } else {
        sortedArray.push(rightSubArray.shift());
      }
    }

    return [...sortedArray, ...leftSubArray, ...rightSubArray];
  }

  return split(array);
}

console.log(
  `mergeSort([3, 2, 1, 13, 8, 5, 0, 1]) = ${mergeSort([
    3, 2, 1, 13, 8, 5, 0, 1,
  ])}`
);
console.log(
  `mergeSort([105, 79, 100, 110]) = ${mergeSort([105, 79, 100, 110])}`
);
