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
}
