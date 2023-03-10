class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.append(node);
    let i = this.heap.length - 1;
    this.siftup(i);
  }

  delete() {
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.shiftdown(0);
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

function dijkstras(grid, src, end) {
  let priorityQueue = PriorityQueue();
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];
}
