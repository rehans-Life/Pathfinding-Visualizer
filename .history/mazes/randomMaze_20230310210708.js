function isValid(row, col) {
  return row < 25 && row >= 0 && col < 50 && col >= 0;
}

export function randomMaze(grid, setGrid) {
  let delRow = [-1, 0, 0, +1];
  let delCol = [0, +1, -1, 0];

  let newGrid = grid.slice();
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = grid[i][j];
      let newNode = {
        ...node,
        isWall: true,
        distance: Infinity,
      };
      newGrid[i][j] = newNode;
    }
  }
  function dfs(node) {
    node.distance = 1;
    let adjNodes = [];

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = newGrid[adjRow][adjCol];
        if (adjNode.distance !== 1) {
          adjNodes.push(adjNode);
        }
      }
    }
    if (adjNodes.length) {
      let random = Math.floor(Math.random() * adjNodes.length);
      node.isWall = false;
      dfs(adjNodes[random]);
    }
  }
  dfs(newGrid[0][0]);
  setGrid(newGrid);
}
