function bidirectional(grid, src, target) {
  let forwardQueue = [];
  let backwardQueue = [];
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  let visitedNodes = [];

  src.distance = 0;
  forwardQueue.append(src);

  target.distance = 0;
  backwardQueue.append(target);

  while (forwardQueue.length && backwardQueue.length) {
    let forwardNode = forwardQueue.shift();

    addNeighbours(forwardNode, forwardQueue);

    let backwardQueue = backwardQueue.shift();

    addNeighbours(backwardQueue, backwardQueue);
  }
}
