import { COLS, END_COL, END_ROW, ROWS, START_COL, START_ROW } from "../pages";

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
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

function britishMuseum(grid, src, target) {
  huristics(grid, target);
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];
  let visitedNodes = [];

  function dfs(node, parent) {
    visitedNodes.push(node);
    node.parent = parent;
    node.distance = 1;
    let adjNodes = [];

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (adjNode.row === target.row && adjNode.col === target.col) {
          visitedNodes.push(node);
          adjNode.parent = node;
          return true;
        }

        if (!adjNode.isWall) {
          adjNodes.push(adjNode);
        }
      }
    }
    adjNodes.sort((a, b) => a.huristic - b.huristic);

    for (let i = 0; i < adjNodes.length; i++) {
      if (adjNodes[i].distance === Infinity) {
        if (dfs(adjNodes[i], node)) return true;
      }
    }
  }
  dfs(src, null);
  console.log(visitedNodes);
  return visitedNodes;
}

const animateBritishMuseum = (
  visitedNodes,
  path,
  grid,
  setGrid,
  setDisable
) => {
  for (let i = 0; i < visitedNodes?.length; i++) {
    if (i === visitedNodes.length - 1) {
      setTimeout(() => {
        animatePath(path, grid, setGrid, setDisable);
      }, 10 * i);
    }
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = visitedNodes[i];
      let newNode = {
        ...node,
        isVisited: true,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, 10 * i);
  }
};

const animatePath = (path, grid, setGrid, setDisable) => {
  for (let i = 0; i < path?.length; i++) {
    if (i === path?.length - 1) {
      setTimeout(() => {
        setDisable(false);
      }, 20 * i);
    }
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = path[i];
      let newNode = {
        ...node,
        isInPath: true,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, 20 * i);
  }
};

export const visualizeBritishMuseum = (
  grid,
  setGrid,
  setDisable,
  startNode,
  endNode
) => {
  let visitedNodes = britishMuseum(grid, startNode, endNode);
  let node = grid[endNode.row][endNode.col];
  let path = [];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animateBritishMuseum(visitedNodes, path, grid, setGrid, setDisable);
};
