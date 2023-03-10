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

class PriorityQueueII {
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

function dijkstras(grid, src) {
  const priorityQueueII = new PriorityQueue();

  priorityQueueII.insert(src);
  src.huristic = 0;

  while (!priorityQueueII.isEmpty()) {
    let node = priorityQueueII.delete();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newHuristic = node.huristic + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && newHuristic < adjNode.huristic) {
          adjNode.huristic = newHuristic;
          visitedNodes.push(adjNode);
          priorityQueueII.insert(adjNode);
        }
      }
    }
  }
}

function aStar(grid, src, target) {

  dijkstras(grid, target);
  const visitedNodes = [];
  const priorityQueue = PriorityQueue();

  priorityQueue.insert(src);
  src.distance = 0;
  src.totalDistance = src.distance + src.huristic;

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.delete();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newDistance = node.distance + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.totalDistance = adjNode.distance + adjNode.huristic;
          adjNode.parent = node;
          visitedNodes.push(adjNode);
          priorityQueue.insert(adjNode);
        }
      }
    }
  }
}


const animateAstar = (visitedNodes, path, grid, setGrid) => {
    for (let i = 0; i < visitedNodes?.length; i++) {
      if (i === visitedNodes.length - 1) {
        setTimeout(() => {
          animatePath(path, grid, setGrid);
        }, 10 * i);
      }
      setTimeout(() => {
        let newGrid = grid.slice();
  
        let node = visitedNodes[i];
        let newNode = {
          ...node,
          isVisited: true,
        };
  
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 10 * i);
    }
  };
  
  const animatePath = (path, grid, setGrid) => {
    for (let i = 0; i < path?.length; i++) {
      setTimeout(() => {
        let newGrid = grid.slice();
  
        let node = path[i];
        let newNode = {
          ...node,
          isInPath: true,
        };
  
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 50 * i);
    }
  };
  
  export const visualizeAstar = (grid, setGrid) => {
    let startNode = grid[START_ROW][START_COL];
    let endNode = grid[END_ROW][END_COL];
    let visitedNodes = aStar(grid, startNode, endNode);
    let node = grid[END_ROW][END_COL];
    let path = [];
    while (node) {
      path.push(node);
      node = node.parent;
    }
    path.reverse();
    animateDijkstras(visitedNodes, path, grid, setGrid);
  };
  