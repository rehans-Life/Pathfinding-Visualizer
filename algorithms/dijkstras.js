var ROWS;
var COLS;

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
    while (parent >= 0 && this.heap[parent].distance > this.heap[i].distance) {
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
        this.heap[leftChild].distance < this.heap[i].distance) ||
      (rightChild < n && this.heap[rightChild].distance < this.heap[i].distance)
    ) {
      let smaller =
        rightChild >= n ||
        this.heap[leftChild].distance <= this.heap[rightChild].distance
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

export function dijkstras(grid, src, target) {
  let priorityQueue = new PriorityQueue();
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];
  ROWS = grid.length;
  COLS = grid[0].length;

  let visitedNodes = [];

  priorityQueue.insert(src);
  src.distance = 0;
  visitedNodes.push(src);

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();
    visitedNodes.push(node);

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        let newDistance = node.distance + adjNode.weight;
        if (adjNode.row === target.row && adjNode.col === target.col) {
          adjNode.parent = node;
          return [visitedNodes, getPath(grid, target, src)];
        }
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.parent = node;
          priorityQueue.insert(adjNode);
        }
      }
    }
  }

  return [visitedNodes, getPath(grid, target, src)];
}

export const getPath = (grid, endNode, startNode) => {
  let node = grid[endNode.row][endNode.col];
  let path = [];
  while (node) {
    path.push(node);
    if (node.row === startNode.row && node.col === startNode.col) break;
    node = node.parent;
  }
  path.reverse();
  return path;
};
