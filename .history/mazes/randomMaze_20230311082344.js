import { COLS, ROWS } from "../pages";

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomMaze(grid, setGrid) {
  let delRow = [-1, 0, 0, +1];
  let delCol = [0, +1, -1, 0];

  let newGrid = grid.slice();
  divide(newGrid, 0, ROWS - 1, 0, COLS - 1, "row");
}

function divide(grid, minRow, maxRow, minCol, maxCol, direction) {
  if (direction === "row") {
    let randomRow = randomNumber(minRow, maxRow);
    let randomSpace = randomNumber(minCol, maxCol);

    for (let i = minCol; i < maxCol + 1; i++) {
      let node = newGrid[randomRow][i];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
  } else {
    let randomRow = randomNumber(minCol, maxCol);
    let randomSpace = randomNumber(minRow, maxRow);

    for (let i = minRow; i < maxRow + 1; i++) {
      let node = newGrid[randomRow][i];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
  }
}
