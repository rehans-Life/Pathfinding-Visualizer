import { END_COL, END_ROW, START_COL, START_ROW } from "../pages";

export function visualizeDfs(grid, setGrid) {
  let startNode = grid[START_ROW][START_COL];
  let endNode = grid[END_ROW][END_COL];
  let visitedNodes = dfs(grid, startNode, endNode);
  let path = [];
  let node = endNode;
  while (node) {
    path.push(node);
    node = node.parent;
  }
  animateDfs(visitedNodes, path, grid, setGrid);
}

function animateDfs(visitedNodes, path, grid, setGrid) {
  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      if (i === visitedNodes.length - 1) {
        setTimeout(() => {
          animatePath(path, grid, setGrid);
        }, 10 * i);
      }
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
}

function animatePath(path, grid, setGrid) {
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = path[i];
      let newNode = {
        ...node,
        isVisited: true,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, 10 * i);
  }
}

function isValid(row, col) {
  return row < 20 && row >= 0 && col < 50 && col >= 0;
}

function dfs(grid, src, target) {
  let visitedNodes = [];
  let delRow = [-1, 0, 0, +1];
  let delCol = [0, +1, -1, 0];

  function helper(node, parent) {
    node.distance = 1;
    node.parent = parent;
    visitedNodes.push(node);

    if (node.row === target.row && node.col === target.col) {
      return true;
    }

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (!adjNode.isWall && adjNode.distance === Infinity) {
          if (helper(adjNode, node)) {
            return true;
          }
        }
      }
    }
  }

  helper(src, null);
  return visitedNodes;
}
