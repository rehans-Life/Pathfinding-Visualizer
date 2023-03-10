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
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

export function dijkstras(grid, src, target) {
  let priorityQueue = new PriorityQueue();
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  let visitedNodes = [];

  priorityQueue.insert(src);
  src.distance = 0;
  visitedNodes.push(src);

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newDistance = node.distance + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.parent = node;
          if (adjNode.row === target.row && adjNode.col === target.col) {
            return visitedNodes;
          }
          visitedNodes.push(adjNode);
          priorityQueue.insert(adjNode);
        }
      }
    }
  }
}
