var ROWS;
var COLS;

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

export function bidirectional(grid, src, target) {
  ROWS = grid.length;
  COLS = grid[0].length;

  let forwardQueue = [];
  let backwardQueue = [];

  let forwardVisitedNodes = [];
  let backwardVisitedNodes = [];

  src.distance = 1;
  forwardQueue.push(src);
  forwardVisitedNodes.push(src);

  target.distance = 1;
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
        genertatePath(backwardIntersectingNodes, target, src),
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

function genertatePath(intersectingingNodes, target, src) {
  let forwardPath = [];
  let forwardNode = intersectingingNodes[0];
  while (
    forwardNode &&
    (forwardNode.row !== src.row || forwardNode.col !== src.col)
  ) {
    forwardPath.push(forwardNode);
    forwardNode = forwardNode.parent;
  }
  forwardPath.reverse();
  let backwardPath = [];
  let backwardNode = intersectingingNodes[1];

  while (
    backwardNode &&
    (backwardNode.row !== target.row || backwardNode.col !== target.col)
  ) {
    backwardPath.push(backwardNode);
    backwardNode = backwardNode.parent;
  }
  let path = [...forwardPath, ...backwardPath];
  return path;
}

export function bfs(grid, queue, directionVisitedNodes, visitedNodes) {
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
