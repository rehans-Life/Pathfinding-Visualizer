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
    let adjNode = newGrid[adjRow][adjCol];
    adjNode.distance = 1;

    if (isValid(adjRow, adjCol)) {
      for (let i = 0; i < 4; i++) {
        let frontierRow = adjRow.row + delRow[i];
        let frontierCol = adjCol.col + delCol[i];

        if (isValid(frontierRow, frontierCol)) {
          let frontierNode = newGrid[frontierRow][frontierCol];
          frontierNode.isWall = false;
          wallList.push(frontierNode);
        }
      }
    }
  }

  while (wallList.length) {}

  setGrid(newGrid);
}
