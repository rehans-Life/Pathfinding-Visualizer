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
  return row < 25 && row >= 0 && col < 50 && col >= 0;
}

function britishMuseum(grid, src, target) {
  huristics(grid, target);
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];
  let visitedNodes = [];

  function dfs(node, parent, visitedNodes) {
    visitedNodes.push(node);
    node.parent = parent;
    node.distance = 1;
    let adjNodes = [];

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall) {
          if (adjNode.row === target.row && adjNode.col === target.col) {
            return true;
          }

          adjNodes.push(adjNode);
        }
      }
    }
    adjNodes.sort((a, b) => a.huristic < b.huristic);

    for (let i = 0; i < adjNodes.length; i++) {
      if (adjNodes.distance == Infinity) {
        if (dfs(adjNodes[i], node, visitedNodes, grid)) return true;
      }
    }
  }
  dfs(src, null, visitedNodes, grid);
  return visitedNodes;
}
