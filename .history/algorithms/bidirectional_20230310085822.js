import { END_COL, END_ROW, START_COL, START_ROW } from "../pages";

function isValid(row, col) {
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

function bidirectional(grid, src, target) {
  let forwardQueue = [];
  let backwardQueue = [];

  let visitedNodes = [];

  src.distance = 0;
  forwardQueue.push(src);
  visitedNodes.push(src);

  target.distance = 0;
  backwardQueue.push(target);
  visitedNodes.push(target);

  while (forwardQueue.length && backwardQueue.length) {
    bfs(forwardQueue, grid, visitedNodes, "Forward");
    if (bfs(backwardQueue, grid, visitedNodes, "Backward")) {
      return visitedNodes;
    }
  }
  return visitedNodes;
}

function bfs(queue, grid, visitedNodes, direction) {
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  if (direction === "Foward") {
    let forwardNode = queue.shift();

    for (let i = 0; i < 4; i++) {
      let adjRow = forwardNode.row + delRow[i];
      let adjCol = forwardNode.col + delCol[i];
      let newDistance = forwardNode.distance + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.parent = forwardNode;
          adjNode.isIntersecting = true;
          visitedNodes.push(adjNode);
          queue.push(adjNode);
        }
      }
    }
  } else {
    let backwardNode = queue.shift();

    for (let i = 0; i < 4; i++) {
      let adjRow = backwardNode.row + delRow[i];
      let adjCol = backwardNode.col + delCol[i];
      let newDistance = backwardNode.distance + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (adjNode.isIntersecting) {
          return true;
        }
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.parent = backwardNode;
          visitedNodes.push(adjNode);
          queue.push(adjNode);
        }
      }
    }
  }
}

const animateBidirectional = (visitedNodes, path, grid, setGrid) => {
  for (let i = 0; i < visitedNodes?.length; i++) {
    if (i === visitedNodes.length - 1) {
      setTimeout(() => {
        animatePath(path, grid, setGrid);
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

const animatePath = (path, grid, setGrid) => {
  for (let i = 0; i < path?.length; i++) {
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

export const visualizeBidirectional = (grid, setGrid) => {
  let startNode = grid[START_ROW][START_COL];
  let endNode = grid[END_ROW][END_COL];
  let visitedNodes = bidirectional(grid, startNode, endNode);
  let node = grid[END_ROW][END_COL];
  let path = [];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animateBidirectional(visitedNodes, path, grid, setGrid);
};
