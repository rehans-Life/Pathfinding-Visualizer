class DisjointSet {
  constructor(size) {
    this.size = [];
    this.par = [];
    for (let i = 0; i < size; i++) {
      this.size.push(0);
      this.par.push(i);
    }
  }

  getParent(node) {
    if (this.par[node] === node) {
      return node;
    }
    let ultParent = this.getParent(this.par[node]);
    this.par[node] = ultParent;
    return ultParent;
  }

  union(u, v) {
    let pu = this.getParent(u);
    let pv = this.getParent(v);

    if (pu === pv) return;

    if (this.size[pv] > this.size[pu]) {
      this.par[pu] = pv;
      this.size[pv] += this.size[pu];
    } else {
      this.par[pu] = pv;
      this.size[pu] += this.size[pv];
    }
  }
}

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

var ROWS;
var COLS;

export function kruskalsAlgorithm(
  grid,
  setGrid,
  clearBoard,
  setDisable,
  startNode,
  endNode,
  selectedTime
) {
  COLS = grid[0].length;
  ROWS = grid.length;
  clearBoard();

  let disjointSet = new DisjointSet(COLS * ROWS);
  let passageNodes = [];
  let newGrid = [];

  for (let i = 0; i < grid.length; i++) {
    let row = [];
    for (let j = 0; j < grid[i].length; j++) {
      let copyNode = JSON.parse(JSON.stringify(grid[i][j]));
      copyNode.isWall = true;
      row.push(copyNode);
    }
    newGrid.push(row);
  }

  let delRow = [-2, +2, 0, 0];
  let delCol = [0, 0, -2, +2];

  let frontierCells = [];
  let node = newGrid[ROWS - 1][0];

  node.isWall = false;
  getFrontierCells(newGrid, ROWS - 1, 0, delRow, delCol, frontierCells);

  while (frontierCells.length) {
    let [frontierCell] = frontierCells.splice(
      Math.floor(Math.random() * frontierCells.length),
      1
    );
    if (!frontierCell.isWall) continue;
    let frontierNeighbours = getFrontierNeighbours(
      newGrid,
      frontierCell,
      delRow,
      delCol,
      disjointSet
    );
    if (frontierNeighbours.length) {
      let frontierNeighbour =
        frontierNeighbours[
          Math.floor(Math.random() * frontierNeighbours.length)
        ];
      connect(
        newGrid,
        frontierCell,
        frontierNeighbour,
        passageNodes,
        disjointSet
      );
    }
    getFrontierCells(
      newGrid,
      frontierCell.row,
      frontierCell.col,
      delRow,
      delCol,
      frontierCells
    );
  }
  passageNodes.push(startNode);
  fillWalls(
    grid,
    setGrid,
    passageNodes,
    setDisable,
    startNode,
    endNode,
    selectedTime
  );
}
function getFrontierNeighbours(
  grid,
  frontierCell,
  delRow,
  delCol,
  disjointSet
) {
  let neighbours = [];
  for (let i = 0; i < 4; i++) {
    let adjRow = frontierCell.row + delRow[i];
    let adjCol = frontierCell.col + delCol[i];
    let ajdVal = adjRow * grid[0].length + adjCol;
    let frontierVal = frontierCell.row * grid[0].length + frontierCell.col;

    if (
      isValid(adjRow, adjCol) &&
      !grid[adjRow][adjCol].isWall &&
      disjointSet.getParent(ajdVal) != disjointSet.getParent(frontierVal)
    ) {
      let adjNode = grid[adjRow][adjCol];
      neighbours.push(adjNode);
    }
  }
  return neighbours;
}

function getFrontierCells(grid, row, col, delRow, delCol, frontierCells) {
  for (let i = 0; i < 4; i++) {
    let adjRow = row + delRow[i];
    let adjCol = col + delCol[i];

    if (isValid(adjRow, adjCol)) {
      let adjNode = grid[adjRow][adjCol];
      if (grid[adjRow][adjCol].isWall) {
        frontierCells.push(adjNode);
      }
    }
  }
}

function connect(
  grid,
  frontierCell,
  frontierNeighbour,
  passageNodes,
  disjointSet
) {
  let inBetweenRow = (frontierCell.row + frontierNeighbour.row) / 2;
  let inBetweenCol = (frontierCell.col + frontierNeighbour.col) / 2;
  let frontierNeighbourVal =
    frontierNeighbour.row * grid[0].length + frontierNeighbour.col;
  let frontierVal = frontierCell.row * grid[0].length + frontierCell.col;
  frontierCell.isWall = false;
  let nodeInBetween = grid[inBetweenRow][inBetweenCol];
  nodeInBetween.isWall = false;
  passageNodes.push(nodeInBetween);
  passageNodes.push(frontierCell);
  disjointSet.union(frontierNeighbourVal, frontierVal);
}

function fillWalls(
  grid,
  setGrid,
  passageNodes,
  setDisable,
  startNode,
  endNode,
  selectedTime
) {
  for (let i = 0; i < grid?.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i === ROWS - 1 && j === COLS - 1) {
        setTimeout(() => {
          fillPassage(passageNodes, grid, setGrid, setDisable, selectedTime);
        }, selectedTime * (i + j));
      }
      setTimeout(() => {
        let newGrid = grid.slice();
        let node = grid[i][j];
        let newNode = {
          ...node,
          isWall: node.row !== endNode?.row || node.col !== endNode?.col,
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, selectedTime * (i + j));
    }
  }
}

function fillPassage(passageNodes, grid, setGrid, setDisable, selectedTime) {
  for (let i = 0; i < passageNodes.length; i++) {
    if (i === passageNodes?.length - 1) {
      setTimeout(() => {
        setDisable(false);
      }, (selectedTime + 2) * i);
    }
    setTimeout(() => {
      let newGrid = grid.slice();
      let node = passageNodes[i];
      let newNode = {
        ...node,
        isWall: false,
        distance: Infinity,
        huristic: Infinity,
        totalDistance: Infinity,
        parent: null,
      };
      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, selectedTime * i);
  }
}
