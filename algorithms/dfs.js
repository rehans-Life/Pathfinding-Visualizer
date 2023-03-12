import { COLS, ROWS } from "../pages";
import { getPath } from "./dijkstras";

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

export function dfs(grid, src, target) {
  let visitedNodes = [];
  let delRow = [-1, 0, 0, +1];
  let delCol = [0, +1, -1, 0];

  function helper(node, parent) {
    node.distance = 1;
    node.parent = parent;
    visitedNodes.push(node);

    if (node.row === target.row && node.col === target.col) return true;

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (
          (!adjNode.isWall && adjNode.distance === Infinity) ||
          (adjNode.row === target.row && adjNode.col === target.col)
        ) {
          if (helper(adjNode, node)) {
            return true;
          }
        }
      }
    }
  }

  helper(src, null);
  return [visitedNodes, getPath(grid, target)];
}
