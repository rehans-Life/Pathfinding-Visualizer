import { COLS, ROWS } from "../pages";

export function verticalSkew(
  grid,
  setGrid,
  clearBoard,
  setDisable,
  startNode,
  endNode
) {
  clearBoard();
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

  divide(
    newGrid,
    2,
    ROWS - 3,
    2,
    COLS - 3,
    "col",
    visitedNodes,
    startNode,
    endNode
  );
  animateWalls(visitedNodes, newGrid, setGrid, setDisable, startNode, endNode);
  startNode.isWall = false;
  endNode.isWall = false;
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
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "row", visitedNodes);
    } else {
      divide(grid, minRow, randomRow - 2, minCol, maxCol, "col", visitedNodes);
    }
    if (maxRow - (randomRow + 2) < maxCol - minCol) {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "col", visitedNodes);
    } else {
      divide(grid, randomRow + 2, maxRow, minCol, maxCol, "col", visitedNodes);
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
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "col", visitedNodes);
    } else {
      divide(grid, minRow, maxRow, minCol, randomCol - 2, "col", visitedNodes);
    }

    if (maxRow - minRow < maxCol - (randomCol + 2)) {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "col", visitedNodes);
    } else {
      divide(grid, minRow, maxRow, randomCol + 2, maxCol, "row", visitedNodes);
    }
  }
}

function animateWalls(
  visitedNodes,
  grid,
  setGrid,
  setDisable,
  startNode,
  endNode
) {
  for (let i = 0; i < visitedNodes?.length; i++) {
    if (i === visitedNodes.length - 1) {
      setTimeout(() => {
        setDisable(false);
      }, 12 * i);
    }
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = visitedNodes[i];
      let newNode = {
        ...node,
        isWall: node.row !== endNode.row || node.col !== endNode.col,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, 10 * i);
  }
}
