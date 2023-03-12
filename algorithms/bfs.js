import { COLS, END_COL, END_ROW, ROWS, START_COL, START_ROW } from "../pages";

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

export function bfs(grid, src, target) {
  let queue = [];
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  let visitedNodes = [];

  queue.push(src);
  src.distance = 0;
  visitedNodes.push(src);

  while (queue.length) {
    let node = queue.shift();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newDistance = node.distance + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (adjNode.row === target.row && adjNode.col === target.col) {
          adjNode.parent = node;
          return visitedNodes;
        }
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.parent = node;
          visitedNodes.push(adjNode);
          queue.push(adjNode);
        }
      }
    }
  }
  return visitedNodes;
}

const animateBfs = (visitedNodes, path, grid, setGrid, setDisable) => {
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
      }, 25 * i);
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
    }, 50 * i);
  }
};

export const visualizeBfs = (grid, setGrid, setDisable, startNode, endNode) => {
  let visitedNodes = bfs(grid, startNode, endNode);
  let node = grid[endNode.row][endNode.col];
  let path = [];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animateBfs(visitedNodes, path, grid, setGrid, setDisable);
};
