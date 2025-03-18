"use strict"; // Converts mistakes to errors (among other things)

// Coordinates are represented as (x, y) and (0, 0) is the bottom-left corner of
// the board
const MOVES = [
  [-1, 2], // Top-left
  [1, 2], // Top-right
  [2, 1], // Right-top
  [2, -1], // Right-bottom
  [1, -2], // Bottom-right
  [-1, -2], // Bottom-left
  [-2, -1], // Left-bottom
  [-2, 1], // Left-top
];

/**
 * Shows the shortest possible way to get from one square to another by
 * outputting all squares the knight will stop on along the way.
 * @param {Array} startCoordinates
 * @param {Array} endCoordinates
 */
export function knightMoves(startCoordinates, endCoordinates) {
  const toVisit = [[startCoordinates, [startCoordinates]]];
  const visited = new Set();

  while (toVisit.length !== 0) {
    const [currentCoordinates, currentPath] = toVisit.shift();

    if (
      currentCoordinates[0] === endCoordinates[0] &&
      currentCoordinates[1] === endCoordinates[1]
    ) {
      return currentPath;
    }

    visited.add(`${currentCoordinates[0]},${currentCoordinates[1]}`);

    MOVES.forEach((move) => {
      if (
        0 <= currentCoordinates[0] + move[0] &&
        currentCoordinates[0] + move[0] < 8 &&
        0 <= currentCoordinates[1] + move[1] &&
        currentCoordinates[1] + move[1] < 8
      ) {
        const nextCoordinates = [
          currentCoordinates[0] + move[0],
          currentCoordinates[1] + move[1],
        ];

        if (!visited.has(`${nextCoordinates[0]},${nextCoordinates[1]}`)) {
          toVisit.push([
            nextCoordinates,
            currentPath.concat([nextCoordinates]),
          ]);
        }
      }
    });
  }
}
