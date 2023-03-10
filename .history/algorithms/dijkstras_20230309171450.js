class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length == 0;
  }

  insert(node) {
    this.heap.append(node);
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
    while (parent >= 0 && this.heap[parent] > this.heap[i]) {
      temp = this.heap[parent];
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
      (leftChild < n && this.heap[leftChild] < this.heap[i]) ||
      (rightChild < n && this.heap[rightChild] < this.heap[i])
    ) {
      let smaller =
        rightChild >= n || this.heap[leftChild] <= this.heap[rightChild]
          ? leftChild
          : rightChild;

      temp = this.heap[i];
      this.heap[i] = this.heap[smaller];
      this.heap[smaller] = temp;

      i = smaller;
      leftChild = i * 2 + 1;
      rightChild = i * 2 + 2;
    }
  }
}

function dijkstras(grid, src, target) {
  let priorityQueue = PriorityQueue();
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  let visitedNodes = [];

  for (let i = 0; i < 20; i++) {
    let row = [];
    for (let j = 0; j < 50; j++) {
      row.push(Infinity);
    }
    distance.push(row);
  }

  priorityQueue([0, src]);
  visitedNodes.push(src);

  while (!priorityQueue.isEmpty()) {
    [srcDistance, node] = priorityQueue.delete();
  }
}
