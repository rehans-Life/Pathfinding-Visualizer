import { COLS, END_COL, END_ROW, ROWS } from "../pages";

function isValid(minRow, maxRow, minCol, maxCol) {
  return minRow < maxRow || minCol < maxCol;
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

    while (randomRow === prevSpace) {
      randomRow = randomNumber(minRow, maxRow + 1);
    }

    let randomSpace = randomNumber(minCol, maxCol + 1);

    for (let i = minCol - 2; i < maxCol + 2; i++) {
      let node = grid[randomRow][i];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    if (randomRow - 2 - minRow < maxCol - minCol) {
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "col", randomSpace);
    } else {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "row", randomSpace);
    }
    if (maxRow - (randomRow + 2) < maxCol - minCol) {
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "col", randomSpace);
    } else {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "row", randomSpace);
    }
  } else {
    let randomCol = randomNumber(minCol, maxCol + 1);

    while (randomCol === prevSpace) {
      randomCol = randomNumber(minCol, maxCol + 1);
    }

    let randomSpace = randomNumber(minRow, maxRow);

    for (let i = minRow - 2; i < maxRow + 2; i++) {
      let node = grid[i][randomCol];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    if (maxRow - minRow < randomCol - 2 - minCol) {
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "col", randomSpace);
    } else {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "row", randomSpace);
    }

    if (maxRow - minRow < maxCol - (randomCol + 2)) {
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "col", randomSpace);
    } else {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "row", randomSpace);
    }
  }
}
