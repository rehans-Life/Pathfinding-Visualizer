import { getPath } from "./dijkstras";

function huristics(grid, src) {
  let queue = [];
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  queue.push(src);
  src.huristic = 0;

  while (queue.length) {
    let node = queue.shift();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        let huristic = Math.sqrt(
          Math.pow(adjRow - src.row, 2) + Math.pow(adjCol - src.col, 2)
        );
        if (!adjNode.isWall && adjNode.huristic === Infinity) {
          adjNode.huristic = huristic;
          queue.push(adjNode);
        }
      }
    }
  }
}

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

var ROWS;
var COLS;

export function britishMuseum(grid, src, target) {
  ROWS = grid.length;
  COLS = grid[0].length;
  huristics(grid, target);
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];
  let visitedNodes = [];

  function dfs(node, parent) {
    visitedNodes.push(node);
    node.parent = parent;
    node.distance = 1;

    if (node.row === target.row && node.col === target.col) {
      return true;
    }

    let adjNodes = [];

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];

        if (
          !adjNode.isWall ||
          (adjNode.row === target.row && adjNode.col === target.col)
        ) {
          adjNodes.push(adjNode);
        }
      }
    }
    adjNodes.sort((a, b) => a.huristic - b.huristic);

    for (let i = 0; i < adjNodes.length; i++) {
      if (adjNodes[i].distance === Infinity) {
        if (dfs(adjNodes[i], node)) return true;
      }
    }
  }
  dfs(src, null);
  return [visitedNodes, getPath(grid, target, src)];
}
