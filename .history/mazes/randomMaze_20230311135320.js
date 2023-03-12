import { COLS, END_COL, END_ROW, ROWS } from "../pages";

function isValid(minRow, maxRow, minCol, maxCol) {
  return minRow < maxRow || minCol < maxCol;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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

  divide(newGrid, 2, ROWS - 3, 2, COLS - 3, "row");
  newGrid[END_ROW][END_COL].isWall = false;
  setGrid(newGrid);
}

function selectRandom(random1, random2) {
  let number = Math.floor(Math.random());
  if (number === 0) {
    return random1;
  } else {
    return random2;
  }
}

function divide(grid, minRow, maxRow, minCol, maxCol, direction, prevSpace) {
  if (maxRow < minRow || maxCol < minCol) return;

  if (direction === "row") {
    let randomRow1 = randomNumber(minRow, prevSpace - 1);
    let randomRow2 = randomNumber(prevSpace + 1, maxRow);

    let randomRow = selectRandom(randomRow1, randomRow2);

    if (minRow === maxRow) return;

    let randomSpace = randomNumber(minCol, maxCol);

    for (let i = minCol - 1; i < maxCol + 2; i++) {
      let node = grid[randomRow][i];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    if (randomRow - 2 - minRow < maxCol - minCol) {
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "col", randomSpace);
    } else {
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "row", randomSpace);
    }
    if (maxRow - (randomRow + 2) < maxCol - minCol) {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "col", randomSpace);
    } else {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "row", randomSpace);
    }
  } else {
    let randomCol = randomNumber(minCol, maxCol);

    if (minCol === maxCol) return;

    if (randomCol === prevSpace) {
      randomCol = randomNumber(minCol, maxCol);
    }

    let randomSpace = randomNumber(minRow, maxRow);

    let start = minRow - 2;
    let end = maxRow + 2;

    if (!grid[start][randomCol].isWall) {
    }

    for (let i = minRow - 1; i < maxRow + 2; i++) {
      let node = grid[i][randomCol];
      if (i != randomSpace) {
        node.isWall = true;
      }
    }
    if (maxRow - minRow < randomCol - 2 - minCol) {
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "col", randomSpace);
    } else {
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "row", randomSpace);
    }

    if (maxRow - minRow < maxCol - (randomCol + 2)) {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "col", randomSpace);
    } else {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "row", randomSpace);
    }
  }
}
