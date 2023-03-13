import { COLS, ROWS } from "../pages";
import { getPath } from "./dijkstras";

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
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

export function aStar(grid, src, target) {
  let priorityQueue = new PriorityQueue();

  let delRow = [-1, 0, +1, 0];
  let delCol = [0, +1, 0, -1];

  let visitedNodes = [];

  priorityQueue.insert(src);
  src.distance = 0;
  src.huristic = Math.floor(
    Math.pow(src.row - target.row, 2) + Math.pow(src.col - target.col, 2)
  );
  src.totalDistance = src.distance + src.huristic;
  visitedNodes.push(src);

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();
    visitedNodes.push(node);

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        let newDistance = node.distance + 1;

        if (adjNode.row === target.row && adjNode.col === target.col) {
          adjNode.parent = node;

          return [visitedNodes, getPath(grid, target, src)];
        }

        if (
          (!adjNode.isWall && newDistance < adjNode.distance) ||
          (adjNode.row === target.row && adjNode.col === target.col)
        ) {
          adjNode.distance = newDistance;
          adjNode.huristic = Math.sqrt(
            (target.row - adjNode.row) ** 2 + (target.col - adjNode.col) ** 2
          );

          adjNode.totalDistance = adjNode.distance + adjNode.huristic;
          adjNode.parent = node;

          priorityQueue.insert(adjNode);
        }
      }
    }
  }
  return [visitedNodes, getPath(grid, target, src)];
}
