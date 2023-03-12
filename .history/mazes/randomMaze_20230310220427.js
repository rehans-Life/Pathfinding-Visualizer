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
    let random = Math.floor(Math.random() * wallList.length);
    let node = wallList.pop(random);
    let visitedAdjNodes = 0;

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = newGrid[adjRow][adjCol];
        if (adjNode.distance === 1) {
          visitedAdjNodes++;
        }
      }
    }
    if (visitedAdjNodes > 0) {
      node.distance = 1;
      node.isWall = false;
      for (let i = 0; i < 4; i++) {
        let adjRow = node.row + delRow[i];
        let adjCol = node.col + delCol[i];

        if (isValid(adjRow, adjCol)) {
          let adjNode = newGrid[adjRow][adjCol];
          if (adjNode.isWall) {
            wallList.push(adjNode);
          }
        }
      }
    }
  }
  console.log(newGrid);
  setGrid(newGrid);
}
