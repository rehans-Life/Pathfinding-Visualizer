import { aStar } from "./algorithms/aStar";
import { bestfs } from "./algorithms/bestFirstSearch";
import { bfs } from "./algorithms/bfs";
import { bidirectional } from "./algorithms/bidirectional";
import { britishMuseum } from "./algorithms/britishMuseum";
import { dfs } from "./algorithms/dfs";
import { dijkstras } from "./algorithms/dijkstras";
import { horizontalSkew } from "./mazes/horizontalSkew";
import { kruskalsAlgorithm } from "./mazes/kruskalsAlgorithm";
import { prims } from "./mazes/primsAlgorithm";
import { recursiveDivision } from "./mazes/recursiveDivision";
import { verticalSkew } from "./mazes/verticalSkew";
import { weightedMaze } from "./mazes/weightedMaze";

function check(path2, node) {
  for (let i = 0; i < path2.length; i++) {
    let pathNode = path2[i];
    if (pathNode.row === node.row && pathNode.col === node.col) {
      return true;
    }
  }
}

function animateAlgorithm(
  visitedNodes,
  path,
  grid,
  setGrid,
  setDisable,
  setAlgoDone,
  selectedTime,
  path2 = []
) {
  for (let i = 0; i < visitedNodes?.length; i++) {
    if (i === visitedNodes.length - 1) {
      setTimeout(() => {
        animatePath(path, grid, setGrid, setDisable, setAlgoDone, selectedTime);
      }, selectedTime * i);
    }
    setTimeout(() => {
      let newGrid = grid.slice();
      var node = visitedNodes[i];
      if (check(path2, node)) {
        var newNode = {
          ...node,
          isInPath: true,
        };
      } else {
        var newNode = {
          ...node,
          isVisited: true,
        };
      }
      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, selectedTime * i);
  }
}

const animatePath = (
  path,
  grid,
  setGrid,
  setDisable,
  setAlgoDone,
  selectedTime
) => {
  if (!path?.length) {
    setDisable(false);
    setAlgoDone(true);
  }
  for (let i = 0; i < path?.length; i++) {
    if (i === path?.length - 1) {
      setTimeout(() => {
        setDisable(false);
        setAlgoDone(true);
      }, selectedTime * (i + 1));
    }
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = path[i];

      let newNode = {
        ...node,
        isInPath: true,
        isVisited: false,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, selectedTime * (i + 1));
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
  setAlgoDone,
  selectedTime
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

  animateAlgorithm(
    visitedNodes,
    path,
    grid,
    setGrid,
    setDisable,
    setAlgoDone,
    selectedTime
  );
}

export function animateAlgorithmII(
  visitedNodes,
  path,
  visitedNodes2,
  path2,
  grid,
  setGrid,
  setDisable,
  setAlgoDone,
  selectedTime
) {
  for (let i = 0; i < visitedNodes?.length; i++) {
    if (i === visitedNodes.length - 1) {
      setTimeout(() => {
        animatePathII(
          path,
          visitedNodes2,
          path2,
          grid,
          setGrid,
          setDisable,
          setAlgoDone,
          selectedTime
        );
      }, selectedTime * i);
    }
    setTimeout(() => {
      let newGrid = grid.slice();

      let node = visitedNodes[i];
      let newNode = {
        ...node,
        isBombVisited: true,
      };

      newGrid[node.row][node.col] = newNode;
      setGrid(newGrid);
    }, selectedTime * i);
  }
}

export function visualizeII(
  selectedAlgorithm,
  grid,
  setGrid,
  setDisable,
  startNode,
  endNode,
  bombNode,
  clearPath,
  setAlgoDone,
  selectedTime
) {
  setDisable(true);
  clearPath();

  var visitedNodes = [];
  var path = [];
  var visitedNodes2 = [];
  var path2 = [];

  if (selectedAlgorithm === "Dijkstras") {
    [visitedNodes, path] = dijkstras(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dijkstras(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "A*") {
    [visitedNodes, path] = aStar(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = aStar(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Bidirectional") {
    [visitedNodes, path] = bidirectional(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bidirectional(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "BFS") {
    [visitedNodes, path] = bfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "DFS") {
    [visitedNodes, path] = dfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Best First Search") {
    [visitedNodes, path] = bestfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bestfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "British Museum") {
    [visitedNodes, path] = britishMuseum(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = britishMuseum(grid, bombNode, endNode);
  }

  animateAlgorithmII(
    visitedNodes,
    path,
    visitedNodes2,
    path2,
    grid,
    setGrid,
    setDisable,
    setAlgoDone,
    selectedTime
  );
}

function animatePathII(
  path,
  visitedNodes2,
  path2,
  grid,
  setGrid,
  setDisable,
  setAlgoDone,
  selectedTime
) {
  if (path.length < 2) {
    setDisable(false);
    setAlgoDone(true);
    return;
  }
  for (let i = 0; i < path?.length; i++) {
    if (i === path?.length - 1) {
      setTimeout(() => {
        animateAlgorithm(
          visitedNodes2,
          path2,
          grid,
          setGrid,
          setDisable,
          setAlgoDone,
          selectedTime,
          path
        );
      }, (selectedTime + 1) * i);
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
    }, selectedTime * i);
  }
}

export function clearWay(grid, setGrid) {
  var newGrid = grid.slice();
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      let newNode = {
        ...node,
        distance: Infinity,
        huristic: Infinity,
        totalDistance: Infinity,
        parent: null,
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  setGrid(newGrid);
}

export const visualizeMazes = (
  name,
  grid,
  setGrid,
  clearBoard,
  setDisable,
  startNode,
  endNode,
  selectedTime
) => {
  setDisable(true);
  if (name === "Recursive Division") {
    recursiveDivision(
      grid,
      setGrid,
      clearBoard,
      setDisable,
      startNode,
      endNode,
      selectedTime
    );
  } else if (name === "Prims Algorithm") {
    prims(
      grid,
      setGrid,
      clearBoard,
      setDisable,
      startNode,
      endNode,
      selectedTime
    );
  } else if (name === "Kruskals Algorithm") {
    kruskalsAlgorithm(
      grid,
      setGrid,
      clearBoard,
      setDisable,
      startNode,
      endNode,
      selectedTime
    );
  } else if (name === "Horizontal Skew") {
    horizontalSkew(
      grid,
      setGrid,
      clearBoard,
      setDisable,
      startNode,
      endNode,
      selectedTime
    );
  } else if (name === "Vertical Skew") {
    verticalSkew(
      grid,
      setGrid,
      clearBoard,
      setDisable,
      startNode,
      endNode,
      selectedTime
    );
  } else if (name === "Weighted Maze") {
    weightedMaze(grid, setGrid, clearBoard, setDisable);
  }
};
