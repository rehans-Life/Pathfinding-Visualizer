import { COLS, END_COL, END_ROW, ROWS, START_COL, START_ROW } from "../pages";

export function randomMaze(grid, setGrid) {
  let newGrid = grid.slice();
  let visitedNodes = [];

  for (let i = 0; i < COLS; i++) {
    let firstRowNode = newGrid[0][i];
    visitedNodes.push(firstRowNode);
  }

  for (let i = 0; i < ROWS; i++) {
    let firstColNode = newGrid[i][0];
    let lastColNode = newGrid[i][COLS - 1];
    visitedNodes.push(firstColNode);
    visitedNodes.push(lastColNode);
  }

  for (let i = 0; i < COLS; i++) {
    let lastRowNode = newGrid[ROWS - 1][i];
    visitedNodes.push(lastRowNode);
  }

  divide(newGrid, 2, ROWS - 3, 2, COLS - 3, "row", visitedNodes);
  animateWalls(visitedNodes, grid, newGrid);
  newGrid[START_ROW][START_COL].isWall = false;
  newGrid[END_ROW][END_COL].isWall = false;
  setGrid(newGrid);
}

function divide(grid, minRow, maxRow, minCol, maxCol, direction, visitedNodes) {
  if (maxRow < minRow || maxCol < minCol) return;
  if (direction === "row") {
    let possibleRows = [];

    for (let i = minRow; i <= maxRow; i += 2) {
      possibleRows.push(i);
    }

    let randomRow =
      possibleRows[Math.floor(Math.random() * possibleRows.length)];

    let possibleSpaces = [];

    for (let i = minCol - 1; i <= maxCol + 1; i += 2) {
      possibleSpaces.push(i);
    }

    let randomSpace =
      possibleSpaces[Math.floor(Math.random() * possibleSpaces.length)];

    for (let i = minCol - 1; i <= maxCol + 1; i++) {
      let node = grid[randomRow][i];
      if (i != randomSpace) {
        visitedNodes.push(node);
      }
    }
    if (randomRow - 2 - minRow < maxCol - minCol) {
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "col");
    } else {
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "row");
    }
    if (maxRow - (randomRow + 2) < maxCol - minCol) {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "col");
    } else {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "row");
    }
  } else {
    let possibleCols = [];

    for (let i = minCol; i <= maxCol; i += 2) {
      possibleCols.push(i);
    }

    let randomCol =
      possibleCols[Math.floor(Math.random() * possibleCols.length)];

    let possibleSpaces = [];

    for (let i = minRow - 1; i <= maxRow + 1; i += 2) {
      possibleSpaces.push(i);
    }

    let randomSpace =
      possibleSpaces[Math.floor(Math.random() * possibleSpaces.length)];

    for (let i = minRow - 1; i <= maxRow + 1; i++) {
      let node = grid[i][randomCol];
      if (i != randomSpace) {
        visitedNodes.push(node);
      }
    }
    if (maxRow - minRow < randomCol - 2 - minCol) {
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "col");
    } else {
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "row");
    }

    if (maxRow - minRow < maxCol - (randomCol + 2)) {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "col");
    } else {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "row");
    }
  }
}

function animateWalls(visitedNodes, grid, setGrid) {
  for (let i = 0; i < visitedNodes?.length; i++) {
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = visitedNodes[i];
      let newNode = {
        ...node,
        isWall: true,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, 10 * i);
  }
}
