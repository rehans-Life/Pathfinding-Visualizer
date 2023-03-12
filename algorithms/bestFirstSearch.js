import { COLS, END_COL, END_ROW, ROWS, START_COL, START_ROW } from "../pages";
import { getPath } from "./dijkstras";

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
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

export function bestfs(grid, src, target) {
  huristics(grid, target);
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  let priorityQueue = new PriorityQueue();
  let visitedNodes = [];
  priorityQueue.insert(src);
  src.distance = 1;

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();
    visitedNodes.push(node);

    if (node.row === target.row && node.col === target.col) {
      return [visitedNodes, getPath(grid, target)];
    }

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (
          (!adjNode.isWall && adjNode.distance === Infinity) ||
          (adjNode.row === target.row && adjNode.col === target.col)
        ) {
          adjNode.distance = 1;
          adjNode.parent = node;
          priorityQueue.insert(adjNode);
        }
      }
    }
  }
  return [visitedNodes, []];
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
