import { END_COL, END_ROW, START_COL, START_ROW } from "../pages";

function isValid(row, col) {
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

function bidirectional(grid, src, target) {
  let forwardQueue = [];
  let backwardQueue = [];

  let forwardVisitedNodes = [];
  let backwardVisitedNodes = [];

  src.distance = 0;
  forwardQueue.push(src);
  forwardVisitedNodes.push(src);

  target.distance = 0;
  backwardQueue.push(target);
  backwardVisitedNodes.push(target);

  while (forwardQueue.length && backwardQueue.length) {
    bfs(grid, forwardQueue, forwardVisitedNodes, backwardVisitedNodes);
    bfs(grid, backwardQueue, backwardVisitedNodes, forwardVisitedNodes);
  }
  return visitedNodes;
}

function bfs(grid, queue, directionVisitedNodes, VisitedNodes, direction) {
  let node = queue.shift();
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
