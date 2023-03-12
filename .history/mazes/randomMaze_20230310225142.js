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
      };
      newGrid[i][j] = newNode;
    }
  }

  let wallList = [];

  let startNode = newGrid[0][0];
  startNode.distance = 1;

  for (let i = 0; i < 4; i++) {
    let adjRow = startNode.row + delRow[i];
    let adjCol = startNode.col + delCol[i];

    if (isValid(adjRow, adjCol)) {
      let adjNode = newGrid[adjRow][adjCol];
      wallList.push(adjNode);
    }
  }

  while (wallList.length) {
    let random = Math.floor(Math.random * wallList.length);
    let node = wallList.splice(random);
    node.distance = 1;
    let visitedAdjNodes = [];

    for (let i = 0; i < 4; i++) {
      let adjRow = startNode.row + delRow[i];
      let adjCol = startNode.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = newGrid[adjRow][adjCol];
        if (adjNode.distance === 1) visitedAdjNodes.push(adjNode);
      }
    }

    if (visitedAdjNodes.length) {
    }
  }

  setGrid(newGrid);
}
