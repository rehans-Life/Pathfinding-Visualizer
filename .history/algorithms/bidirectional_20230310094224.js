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
    if (bfs(grid, forwardQueue, forwardVisitedNodes, backwardVisitedNodes)) {
      return [
        answer(forwardVisitedNodes, backwardVisitedNodes),
        genertatePath(forwardVisitedNodes, backwardVisitedNodes),
      ];
    }
    if (bfs(grid, backwardQueue, backwardVisitedNodes, forwardVisitedNodes)) {
      return [
        answer(forwardVisitedNodes, backwardVisitedNodes),
        genertatePath(forwardVisitedNodes, backwardVisitedNodes),
      ];
    }
  }
  return answer(forwardVisitedNodes, backwardVisitedNodes);
}

function answer(forwardVisitedNodes, backwardVisitedNodes) {
  let visitedNodes = [];
  let n = forwardVisitedNodes.length;
  let m = backwardVisitedNodes.length;

  let greater = n > m ? n : m;

  for (let i = 0; i < greater; i++) {
    if (i < n) visitedNodes.push(forwardVisitedNodes[i]);
    if (i < m) visitedNodes.push(backwardVisitedNodes[i]);
  }
  return visitedNodes;
}

function genertatePath(forwardVisitedNodes, backwardVisitedNodes) {
  let forwardPath = [];
  let forwardNode = forwardVisitedNodes[forwardVisitedNodes.length - 1];
  while (forwardNode) {
    forwardPath.push(forwardNode);
    forwardNode = forwardNode.parent;
  }
  forwardPath.reverse();
  let backwardPath = [];
  let backwardNode = backwardVisitedNodes[backwardVisitedNodes.length - 1];
  while (backwardNode) {
    backwardPath.push(backwardNode);
    backwardNode = backwardNode.parent;
  }
}

function bfs(grid, queue, directionVisitedNodes, visitedNodes) {
  let node = queue.shift();
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  for (let i = 0; i < 4; i++) {
    let adjRow = node.row + delRow[i];
    let adjCol = node.col + delCol[i];
    let newDistance = node.distance + 1;

    if (isValid(adjRow, adjCol)) {
      let adjNode = grid[adjRow][adjCol];

      if (visitedNodes.includes(adjNode)) {
        return true;
      }

      if (!adjNode.isWall && newDistance < adjNode.distance) {
        adjNode.distance = newDistance;
        adjNode.parent = node;
        directionVisitedNodes.push(adjNode);
        queue.push(adjNode);
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
  let [visitedNodes, path] = bidirectional(grid, startNode, endNode);
  animateBidirectional(visitedNodes, path, grid, setGrid);
};
