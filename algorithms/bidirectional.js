import { COLS, END_COL, END_ROW, ROWS, START_COL, START_ROW } from "../pages";

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
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

    let backwardIntersectingNodes = bfs(
      grid,
      backwardQueue,
      backwardVisitedNodes,
      forwardVisitedNodes
    );
    if (backwardIntersectingNodes) {
      return [
        answer(forwardVisitedNodes, backwardVisitedNodes),
        genertatePath(backwardIntersectingNodes),
      ];
    }
  }
  return [answer(forwardVisitedNodes, backwardVisitedNodes), []];
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

function genertatePath(intersectingingNodes) {
  let forwardPath = [];
  let forwardNode = intersectingingNodes[0];
  while (forwardNode) {
    forwardPath.push(forwardNode);
    forwardNode = forwardNode.parent;
  }
  forwardPath.reverse();
  let backwardPath = [];
  let backwardNode = intersectingingNodes[1];
  while (backwardNode) {
    backwardPath.push(backwardNode);
    backwardNode = backwardNode.parent;
  }
  let path = [...forwardPath, ...backwardPath];
  return path;
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
        return [adjNode, node];
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

const animateBidirectional = (
  visitedNodes,
  path,
  grid,
  setGrid,
  setDisable
) => {
  for (let i = 0; i < visitedNodes?.length; i++) {
    if (i === visitedNodes?.length - 1) {
      setTimeout(() => {
        if (path.length) animatePath(path, grid, setGrid, setDisable);
        else setDisable(false);
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
      }, 55 * i);
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

export const visualizeBidirectional = (
  grid,
  setGrid,
  setDisable,
  startNode,
  endNode
) => {
  let [visitedNodes, path] = bidirectional(grid, startNode, endNode);
  animateBidirectional(visitedNodes, path, grid, setGrid, setDisable);
};
