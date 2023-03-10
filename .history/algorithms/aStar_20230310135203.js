import { END_COL, END_ROW, START_COL, START_ROW } from "../pages";

function isValid(row, col) {
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

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
    while (
      parent >= 0 &&
      this.heap[parent].totalDistance > this.heap[i].totalDistance
    ) {
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
        this.heap[leftChild].totalDistance < this.heap[i].totalDistance) ||
      (rightChild < n &&
        this.heap[rightChild].totalDistance < this.heap[i].totalDistance)
    ) {
      let smaller =
        rightChild >= n ||
        this.heap[leftChild].totalDistance <=
          this.heap[rightChild].totalDistance
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

function aStar(grid, src, target) {
  const priorityQueue = new PriorityQueue();
  let delRow = [-1, 0, 0, +1];
  let delCol = [0, +1, -1, 0];
  let visitedNodes = [];

  src.distance = 0;
  src.huristic = Math.sqrt(
    Math.pow(src.row - target.row, 2) + Math.pow(src.col - target.col, 2)
  );
  src.totalDistance = src.distance + src.huristic;
  priorityQueue.insert(src);

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();
    visitedNodes.push(node);

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newDistance = node.distance + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.huristic = Math.sqrt(
            Math.pow(adjRow - src.row, 2) + Math.pow(adjCol - src.col, 2)
          );
          adjNode.totalDistance = adjNode.distance + adjNode.huristic;
          adjNode.parent = node;
          if (node.row === target.row && node.col === target.col) {
            return visitedNodes;
          }
          priorityQueue.insert(adjNode);
        }
      }
    }
  }
  return visitedNodes;
}

const animateAstar = (visitedNodes, path, grid, setGrid) => {
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

export const visualizeAstar = (grid, setGrid) => {
  let startNode = grid[START_ROW][START_COL];
  let endNode = grid[END_ROW][END_COL];
  let visitedNodes = aStar(grid, startNode, endNode);
  let node = grid[END_ROW][END_COL];
  let path = [];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animateAstar(visitedNodes, path, grid, setGrid);
};
