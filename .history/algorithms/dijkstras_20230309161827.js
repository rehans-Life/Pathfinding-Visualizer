class PriorityQueue {
  constructor() {
    self.heap = [];
  }
  siftup(i) {
    parent = Math.floor((i - 1) / 2);
    while (i > 0 && this.heap[parent] > this.heap[i]) {
      temp = this.heap[parent];
      this.heap[parent] = this.heap[i];
      this.heap[i] = temp;
    }
  }
}
