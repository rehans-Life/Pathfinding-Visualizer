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
      adjNode.distance = 1;
      for (let j = 0; j < 4; j++) {
        let frontierRow = adjRow.row + delRow[j];
        let frontierCol = adjCol.col + delCol[j];
        console.log(adjNode);

        if (isValid(frontierRow, frontierCol)) {
          let frontierNode = newGrid[frontierRow][frontierCol];
          if (frontierNode.distance !== 1) {
            frontierNode.isWall = false;
            frontierNode.parent = adjNode;
            wallList.push(frontierNode);
          }
        }
      }
    }
  }
  console.log(wallList);

  while (wallList.length) {
    let random = Math.floor(Math.random() * wallList.length);
    let node = wallList.splice(random);
    node.parent.isWall = false;
    node.distance = 1;

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = newGrid[adjRow][adjCol];
        if (adjNode.distance !== 1) {
          adjNode.distance = 1;
          for (let j = 0; j < 4; j++) {
            let frontierRow = adjRow + delRow[j];
            let frontierCol = adjCol + delCol[j];

            if (isValid(frontierRow, frontierCol)) {
              let frontierNode = newGrid[frontierRow][frontierCol];
              if (frontierNode.distance !== 1) {
                frontierNode.isWall = false;
                frontierNode.parent = adjNode;
                wallList.push(frontierNode);
              }
            }
          }
        }
      }
    }
  }
  console.log(newGrid);
  setGrid(newGrid);
}
