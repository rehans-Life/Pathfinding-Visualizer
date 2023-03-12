import { COLS, END_COL, END_ROW, ROWS } from "../pages";

function isValid(minRow, maxRow, minCol, maxCol) {
  return minRow < maxRow && minCol < maxCol;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isValidRandom(number, direction) {
  return;
}

export function randomMaze(grid, setGrid) {
  let newGrid = grid.slice();

  for (let i = 0; i < COLS; i++) {
    let firstRowNode = newGrid[0][i];
    let lastRowNode = newGrid[ROWS - 1][i];
    firstRowNode.isWall = true;
    lastRowNode.isWall = true;
  }

  for (let i = 0; i < ROWS; i++) {
    let firstColNode = newGrid[i][0];
    let lastColNode = newGrid[i][COLS - 1];
    firstColNode.isWall = true;
    lastColNode.isWall = true;
  }

  divide(newGrid, 2, ROWS - 2, 2, COLS - 2, "row");
  newGrid[END_ROW][END_COL].isWall = false;
  setGrid(newGrid);
}

function divide(grid, minRow, maxRow, minCol, maxCol, direction, prevSpace) {
  if (!isValid(minRow, maxRow, minCol, maxCol)) return;

  if (direction === "row") {
    let randomRow = randomNumber(minRow, maxRow);

    if (minRow === prevSpace) {
    }

    if (randomRow === prevSpace) {
      randomRow = randomNumber(minRow, maxRow);
    }

    // if (!isValid(randomRow, "row")) return;

    let randomSpace = randomNumber(minCol, maxCol);

    for (let i = minCol - 2; i < maxCol + 2; i++) {
      let node = grid[randomRow][i];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    divide(grid, minRow, randomRow - 2, minCol, maxCol, "col", randomSpace);
    divide(grid, randomRow + 2, maxRow, minCol, maxCol, "col", randomSpace);
  } else {
    let randomCol = randomNumber(minCol, maxCol);

    if (randomCol === prevSpace) {
      randomCol = randomNumber(minCol, maxCol);
    }

    let randomSpace = randomNumber(minRow, maxRow);

    for (let i = minRow - 2; i < maxRow + 2; i++) {
      let node = grid[i][randomCol];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    divide(grid, minRow, maxRow, minCol, randomCol - 2, "row", randomSpace);
    divide(grid, minRow, maxRow, randomCol + 2, maxCol, "row", randomSpace);
  }
}
