import { END_COL, END_ROW, START_COL, START_ROW } from "../pages";

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length == 0;
  }

  insert(node) {
    this.heap.push(node);
    let i = this.heap.length - 1;
    this.siftup(i);
  }

  delete() {
    let temp = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.shiftdown(0);
    return temp;
  }

  siftup(i) {
    let parent = Math.floor((i - 1) / 2);
    while (parent >= 0 && this.heap[parent].huristic > this.heap[i].huristic) {
      let temp = this.heap[parent];
      this.heap[parent] = this.heap[i];
      this.heap[i] = temp;
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }
  shiftdown(i) {
    let leftChild = i * 2 + 1;
    let rightChild = i * 2 + 2;
    let n = this.heap.length;

    while (
      (leftChild < n &&
        this.heap[leftChild].huristic < this.heap[i].huristic) ||
      (rightChild < n && this.heap[rightChild].huristic < this.heap[i].huristic)
    ) {
      let smaller =
        rightChild >= n ||
        this.heap[leftChild].huristic <= this.heap[rightChild].huristic
          ? leftChild
          : rightChild;

      let temp = this.heap[i];
      this.heap[i] = this.heap[smaller];
      this.heap[smaller] = temp;

      i = smaller;
      leftChild = i * 2 + 1;
      rightChild = i * 2 + 2;
    }
  }
}

function isValid(row, col) {
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

function bestfs(grid, src, target) {
  huristics(grid, target);

  let priorityQueue = new PriorityQueue();
  let visitedNodes = [];
  priorityQueue.insert(src);

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();
    visitedNodes.push(node);

    if (node.row === target.row && node.col === target.col) {
      return visitedNodes;
    }

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newDistance = 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.parent = node;
          priorityQueue.insert(adjNode);
        }
      }
    }
  }
}

function huristics(grid, src) {
  let queue = [];
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  queue.push(src);
  src.huristic = 0;

  while (queue.length) {
    let node = queue.shift();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        let huristic = Math.sqrt(
          Math.pow(adjRow - src.row, 2) + Math.pow(adjCol - src.col, 2)
        );
        if (!adjNode.isWall && adjNode.huristic === Infinity) {
          adjNode.huristic = huristic;
          queue.push(adjNode);
        }
      }
    }
  }
}

const animateBestfs = (visitedNodes, path, grid, setGrid) => {
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

export const visualizeBestfs = (grid, setGrid) => {
  let startNode = grid[START_ROW][START_COL];
  let endNode = grid[END_ROW][END_COL];
  let visitedNodes = bestfs(grid, startNode, endNode);
  let node = grid[END_ROW][END_COL];
  let path = [];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animateBestfs(visitedNodes, path, grid, setGrid);
};
