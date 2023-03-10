class PriorityQueue {
  constructor() {
    self.heap = [];
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
      this, (heap[smaller] = temp);
      i = smaller;
      leftChild = i * 2 + 1;
      rightChild = i * 2 + 2;
    }
  }
}
