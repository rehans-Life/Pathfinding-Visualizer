function bidirectional(grid, src, target) {
  let forwardQueue = [];
  let backwardQueue = [];

  src.distance = 0;
  forwardQueue.append(src);

  target.distance = 0;
  backwardQueue.append(target);
}
