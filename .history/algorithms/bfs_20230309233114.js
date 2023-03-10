import { END_COL, END_ROW, START_COL, START_ROW } from "../pages";

export function bfs(grid, src, target) {
  let queue = [];
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  let visitedNodes = [];

  queue.push(src);
  src.distance = 0;
  visitedNodes.push(src);

  while (!priorityQueue.isEmpty()) {
    let node = queue.shift();

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];
      let newDistance = node.distance + 1;

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && newDistance < adjNode.distance) {
          adjNode.distance = newDistance;
          adjNode.parent = node;
          if (adjNode.row === target.row && adjNode.col === target.col) {
            return visitedNodes;
          }
          visitedNodes.push(adjNode);
          queue.insert(adjNode);
        }
      }
    }
  }
  return visitedNodes;
}

const animateBfs = (visitedNodes, path, grid, setGrid) => {
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

export const visualizeBfs = (grid, setGrid) => {
  let startNode = grid[START_ROW][START_COL];
  let endNode = grid[END_ROW][END_COL];
  let visitedNodes = bfs(grid, startNode, endNode);
  let node = grid[END_ROW][END_COL];
  let path = [];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animateBfs(visitedNodes, path, grid, setGrid);
};
