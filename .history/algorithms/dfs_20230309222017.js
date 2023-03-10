function isValid(row, col) {
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

function dfs(grid, src, target) {
  let visitedNodes = [];
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  function helper(node, parent) {
    node.visited = true;
    node.parent = parent;
    visitedNodes.push(node);

    for (let i = 0; i < 4; i++) {
      adjRow = node.row + delRow[i];
      adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
      }
    }
  }

  helper(src, null);
  return visitedNodes;
}
