import { aStar } from "./algorithms/aStar";
import { bestfs } from "./algorithms/bestFirstSearch";
import { bfs } from "./algorithms/bfs";
import { bidirectional } from "./algorithms/bidirectional";
import { britishMuseum } from "./algorithms/britishMuseum";
import { dfs } from "./algorithms/dfs";
import { dijkstras } from "./algorithms/dijkstras";
import { horizontalSkew } from "./mazes/horizontalSkew";
import { prims } from "./mazes/primsAlgorithm";
import { recursiveDivision } from "./mazes/recursiveDivision";
import { verticalSkew } from "./mazes/verticalSkew";

function animateAlgorithm(
  visitedNodes,
  path,
  grid,
  setGrid,
  setDisable,
  setAlgoDone
) {
  for (let i = 0; i < visitedNodes?.length; i++) {
    if (i === visitedNodes.length - 1) {
      setTimeout(() => {
        animatePath(path, grid, setGrid, setDisable, setAlgoDone);
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
}

const animatePath = (path, grid, setGrid, setDisable, setAlgoDone) => {
  for (let i = 0; i < path?.length; i++) {
    if (i === path?.length - 1) {
      setTimeout(() => {
        setDisable(false);
        setAlgoDone(true);
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
};

export function visualize(
  selectedAlgorithm,
  grid,
  setGrid,
  setDisable,
  startNode,
  endNode,
  clearPath,
  setAlgoDone
) {
  setDisable(true);
  clearPath();

  var visitedNodes;
  var path;
  if (selectedAlgorithm === "Dijkstras") {
    [visitedNodes, path] = dijkstras(grid, startNode, endNode);
  } else if (selectedAlgorithm === "A*") {
    [visitedNodes, path] = aStar(grid, startNode, endNode);
  } else if (selectedAlgorithm === "Bidirectional") {
    [visitedNodes, path] = bidirectional(grid, startNode, endNode);
  } else if (selectedAlgorithm === "BFS") {
    [visitedNodes, path] = bfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "DFS") {
    [visitedNodes, path] = dfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "Best First Search") {
    [visitedNodes, path] = bestfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "British Museum") {
    [visitedNodes, path] = britishMuseum(grid, startNode, endNode);
  }

  animateAlgorithm(visitedNodes, path, grid, setGrid, setDisable, setAlgoDone);
}

export const visualizeMazes = (
  name,
  grid,
  setGrid,
  clearBoard,
  setDisable,
  startNode,
  endNode
) => {
  setDisable(true);
  if (name === "Recursive Division") {
    recursiveDivision(
      grid,
      setGrid,
      clearBoard,
      setDisable,
      startNode,
      endNode
    );
  } else if (name === "Prims Algorithm") {
    prims(grid, setGrid, clearBoard, setDisable, startNode, endNode);
  } else if (name === "Horizontal Skew") {
    horizontalSkew(grid, setGrid, clearBoard, setDisable, startNode, endNode);
  } else if (name === "Vertical Skew") {
    verticalSkew(grid, setGrid, clearBoard, setDisable, startNode, endNode);
  }
};
