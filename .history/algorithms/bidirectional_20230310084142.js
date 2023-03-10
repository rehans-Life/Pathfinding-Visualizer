function isValid(row, col) {
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

function bidirectional(grid, src, target) {
  let forwardQueue = [];
  let backwardQueue = [];

  let visitedNodes = [];

  src.distance = 0;
  forwardQueue.append(src);
  visitedNodes.append(src);

  target.distance = 0;
  backwardQueue.append(target);
  visitedNodes.append(target);

  while (forwardQueue.length && backwardQueue.length) {
    let forwardNode = forwardQueue.shift();
    if (addNeighbours(forwardNode, forwardQueue)) {
      return visitedNodes;
    }

    let backwardQueue = backwardQueue.shift();
    if (addNeighbours(backwardQueue, backwardQueue)) {
      return visitedNodes;
    }
  }
  return visitedNodes;
}

function addNeighbours(node, queue, visitedNodes) {
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  for (let i = 0; i < 4; i++) {
    let adjRow = node.row + delRow[i];
    let adjCol = node.col + delCol[i];
    let newDistance = node.distance + 1;

    if (isValid(adjRow, adjCol)) {
      let adjNode = grid[adjRow][adjCol];
      if (adjNode.isIntersecting) {
        return true;
      }
      if (!adjNode.isWall && newDistance < adjNode.distance) {
        adjNode.distance = newDistance;
        adjNode.parent = node;
        adjNode.isIntersecting = true;
        visitedNodes.push(adjNode);
        queue.push(adjNode);
      }
    }
  }
}
