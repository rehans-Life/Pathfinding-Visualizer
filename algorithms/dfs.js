import { COLS, END_COL, END_ROW, ROWS, START_COL, START_ROW } from "../pages";

export function visualizeDfs(grid, setGrid, setDisable, startNode, endNode) {
  let visitedNodes = dfs(grid, startNode, endNode);
  let path = [];
  let node = grid[endNode.row][endNode.col];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animateDfs(visitedNodes, path, grid, setGrid, setDisable);
}

function animateDfs(visitedNodes, path, grid, setGrid, setDisable) {
  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      if (i === visitedNodes.length - 1) {
        animatePath(path, grid, setGrid, setDisable);
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

function animatePath(path, grid, setGrid, setDisable) {
  for (let i = 0; i < path.length; i++) {
    if (i === path?.length - 1) {
      setTimeout(() => {
        setDisable(false);
      }, 10 * i);
    }
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = path[i];
      let newNode = {
        ...node,
        isInPath: true,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, 10 * i);
  }
}

function isValid(row, col) {
  return row < ROWS && row >= 0 && col < COLS && col >= 0;
}

function dfs(grid, src, target) {
  let visitedNodes = [];
  let delRow = [-1, 0, 0, +1];
  let delCol = [0, +1, -1, 0];

  function helper(node, parent) {
    node.distance = 1;
    node.parent = parent;
    visitedNodes.push(node);

    for (let i = 0; i < 4; i++) {
      let adjRow = node.row + delRow[i];
      let adjCol = node.col + delCol[i];

      if (isValid(adjRow, adjCol)) {
        let adjNode = grid[adjRow][adjCol];
        if (adjNode.row === target.row && adjNode.col === target.col) {
          adjNode.parent = node;
          visitedNodes.push(adjNode);
          return true;
        }
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
