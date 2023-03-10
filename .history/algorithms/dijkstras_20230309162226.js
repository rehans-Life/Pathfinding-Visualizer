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
    let rightChild = i * 2 + 1;
    let leftChild = i * 2 + 2;
  }
}
