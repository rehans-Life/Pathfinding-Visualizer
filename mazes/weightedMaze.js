export function weightedMaze(grid, setGrid, clearBoard, setDisable) {
  clearBoard();
  let newGrid = grid.slice();

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let random = Math.random();
      if (random < 0.35) {
        let node = newGrid[i][j];
        newGrid[i][j] = {
          ...node,
          isWeighted: true,
          weight: 15,
        };
      }
    }
  }
  setGrid(newGrid);
  setDisable(false);
}
