import { COLS, ROWS } from "../pages";

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomMaze(grid, setGrid) {
  let newGrid = grid.slice();
  for (let i = 0; i < COLS; i++) {
    const element = array[i];
  }
  divide(newGrid, 0, ROWS - 1, 0, COLS - 1, "row");
  setGrid(newGrid);
}

function divide(grid, minRow, maxRow, minCol, maxCol, direction, prevSpace) {
  if (direction === "row") {
    let randomRow = randomNumber(minRow, maxRow);

    while (randomRow === prevSpace) {
      randomRow = randomNumber(minRow, maxRow);
    }

    let randomSpace = randomNumber(minCol, maxCol);

    for (let i = minCol; i < maxCol + 1; i++) {
      let node = grid[randomRow][i];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    divide(grid, minRow, randomRow - 2, minCol, maxCol, "col", randomSpace);
    divide(grid, randomRow + 2, maxRow, minCol, maxCol, "col", randomSpace);
  } else {
    let randomCol = randomNumber(minCol, maxCol);

    while (randomCol === prevSpace) {
      randomCol = randomNumber(minCol, maxCol);
    }

    let randomSpace = randomNumber(minRow, maxRow);

    for (let i = minRow; i < maxRow + 1; i++) {
      let node = grid[i][randomCol];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    divide(grid, minRow, maxRow, minCol, randomCol - 2, "row", randomSpace);
    divide(grid, minRow, maxRow, randomCol + 2, maxCol, "row", randomSpace);
  }
}
