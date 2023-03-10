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

function dijkstras(grid, src) {
  const priorityQueue = new PriorityQueue();

  priorityQueue.insert(src);
  src.huristic = 0;

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newHuristic = node.huristic + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && newHuristic < adjNode.huristic) {
          adjNode.huristic = newHuristic;
          adjNode.parent = node;
          visitedNodes.push(adjNode);
          priorityQueue.insert(adjNode);
        }
      }
    }
  }
}

function aStar(grid, src, target) {
    dijkstras(grid,target)
}
