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

  wallList = [];

  let node = grid[0][0];
  start.distance = 1;

  for (let i = 0; i < 4; i++) {
    let adjRow = node.row + delRow[i];
    let adjCol = node.col + delCol[i];

    if (isValid(adjRow, adjCol)) {
      let adjNode = grid[adjRow][adjCol];
      wallList.push(adjNode);
    }
  }

  while (wallList.length) {
    let random = Math.floor(Math.random() * wallList.length);
    let node = wallList.pop(random);
    let visitedAdjNodes = 0;

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (adjNode.distance === 1) {
          visitedAdjNodes++;
        }
      }
    }
    if (visitedAdjNodes === 1) {
      node.distance = 1;
      node.isWall = false;
      for (let i = 0; i < 4; i++) {
        let adjRow = node.row + delRow[i];
        let adjCol = node.col + delCol[i];

        if (isValid(adjRow, adjCol)) {
          let adjNode = grid[adjRow][adjCol];
          if (adjNode.distance !== 1) {
            wallList.push(adjNode);
          }
        }
      }
    }
  }
}
