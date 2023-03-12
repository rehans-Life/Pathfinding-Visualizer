import Head from "next/head";
import styles from "../styles/Home.module.css";
import Node from "../components/Node";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { dijkstras } from "../algorithms/dijkstras";
import { aStar } from "../algorithms/aStar";
import { bidirectional } from "../algorithms/bidirectional";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { bestfs } from "../algorithms/bestFirstSearch";
import { britishMuseum } from "../algorithms/britishMuseum";

export const START_ROW = 10;
export const START_COL = 5;
export const END_ROW = 10;
export const END_COL = 40;
export const ROWS = 21;
export const COLS = 63;

function getInitialGrid() {
  let grid = [];
  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let j = 0; j < COLS; j++) {
      const node = {
        row: i,
        col: j,
        isStart: i === START_ROW && j === START_COL,
        isEnd: i === END_ROW && j === END_COL,
        distance: Infinity,
        parent: null,
        isVisited: false,
        isInPath: false,
        isWall: false,
        huristic: Infinity,
        totalDistance: Infinity,
      };
      row.push(node);
    }
    grid.push(row);
  }
  return grid;
}

function instantAlgorithm(
  selectedAlgorithm,
  grid,
  setGrid,
  startNode,
  row,
  col,
  clearPath,
  setEndNode
) {
  clearPath();
  var endNode = grid[row][col];
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
  var newGrid = grid.slice();

  for (let i = 0; i < visitedNodes.length; i++) {
    let node = visitedNodes[i];
    newGrid[node.row][node.col] = {
      ...node,
      isVisited: true,
    };
  }

  for (let i = 0; i < path.length; i++) {
    let node = path[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInPath: true,
    };
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      newGrid[node.row][node.col] = {
        ...node,
        isEnd: node.row === row && node.col === col,
      };
    }
  }

  setEndNode(newGrid[row][col]);
  setGrid(newGrid);
}

function instantAlgorithmII(
  selectedAlgorithm,
  grid,
  setGrid,
  row,
  col,
  endNode,
  clearPath,
  setStartNode
) {
  clearPath();
  var startNode = grid[row][col];
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
  var newGrid = grid.slice();

  for (let i = 0; i < visitedNodes.length; i++) {
    let node = visitedNodes[i];
    newGrid[node.row][node.col] = {
      ...node,
      isVisited: true,
    };
  }

  for (let i = 0; i < path.length; i++) {
    let node = path[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInPath: true,
    };
  }
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      newGrid[node.row][node.col] = {
        ...node,
        isStart: node.row === row && node.col === col,
      };
    }
  }

  setStartNode(newGrid[row][col]);
  setGrid(newGrid);
}

export default function Home() {
  const [grid, setGrid] = useState(getInitialGrid());
  const [disable, setDisable] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [startNode, setStartNode] = useState(grid[START_ROW][START_COL]);
  const [endNode, setEndNode] = useState(grid[END_ROW][END_COL]);
  const [bombNode, setBombNode] = useState(null);
  const [changeStart, setChangeStart] = useState(false);
  const [changeEnd, setChangeEnd] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [algoDone, setAlgoDone] = useState(false);

  const handleMouseDown = (row, col) => {
    if (disable) return;
    if (row === startNode.row && col === startNode.col) {
      setChangeStart(true);
      if (algoDone) {
        instantAlgorithmII(
          selectedAlgorithm,
          grid,
          setGrid,
          row,
          col,
          endNode,
          clearPath,
          setStartNode
        );
      } else {
        changeStartNode(row, col);
      }
    } else if (row === endNode.row && col === endNode.col) {
      setChangeEnd(true);
      if (algoDone) {
        instantAlgorithm(
          selectedAlgorithm,
          grid,
          setGrid,
          startNode,
          row,
          col,
          clearPath,
          setEndNode
        );
      } else {
        changeEndNode(row, col);
      }
    } else {
      setMouseDown(true);
      setCellAsWall(row, col);
    }
  };

  const clearPath = () => {
    let newGrid = grid.slice();
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isVisited: false,
          distance: Infinity,
          huristic: Infinity,
          totalDistance: Infinity,
          isInPath: false,
          parent: null,
        };
        newGrid[i][j] = newNode;
      }
    }
    setGrid(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (changeStart) {
      if (algoDone) {
        instantAlgorithmII(
          selectedAlgorithm,
          grid,
          setGrid,
          row,
          col,
          endNode,
          clearPath,
          setStartNode
        );
      } else {
        changeStartNode(row, col);
      }
    } else if (changeEnd) {
      if (algoDone) {
        instantAlgorithm(
          selectedAlgorithm,
          grid,
          setGrid,
          startNode,
          row,
          col,
          clearPath,
          setEndNode
        );
      } else {
        changeEndNode(row, col);
      }
    } else if (mouseDown) {
      setCellAsWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setChangeEnd(false);
    setChangeStart(false);
  };

  const setCellAsWall = (row, col) => {
    let newGrid = grid.slice();
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
  };

  const changeStartNode = (row, col) => {
    let newGrid = grid.slice();
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isStart: i === row && j === col,
        };
        newGrid[i][j] = newNode;
      }
    }
    setStartNode(newGrid[row][col]);
    setGrid(newGrid);
  };

  const changeEndNode = (row, col) => {
    let newGrid = grid.slice();
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isEnd: i === row && j === col,
        };
        newGrid[i][j] = newNode;
      }
    }

    setEndNode(newGrid[row][col]);
    setGrid(newGrid);
  };

  const clearBoard = () => {
    let newGrid = grid.slice();
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isVisited: false,
          distance: Infinity,
          huristic: Infinity,
          totalDistance: Infinity,
          isInPath: false,
          isWall: false,
          parent: null,
        };
        newGrid[i][j] = newNode;
      }
    }
    setAlgoDone(false);
    setGrid(newGrid);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pathfinding Visualizer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        startNode={startNode}
        endNode={endNode}
        setDisable={setDisable}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        grid={grid}
        setGrid={setGrid}
        clearPath={clearPath}
        disable={disable}
        clearBoard={clearBoard}
        setAlgoDone={setAlgoDone}
      />
      {grid.map((row, index) => (
        <div key={index} className={styles.row}>
          {row.map((node, index) => (
            <Node
              key={index}
              row={node.row}
              col={node.col}
              isStart={node.isStart}
              isEnd={node.isEnd}
              distance={node.distance}
              isVisited={node.isVisited}
              isInPath={node.isInPath}
              isWall={node.isWall}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              handleMouseEnter={handleMouseEnter}
            ></Node>
          ))}
        </div>
      ))}
    </div>
  );
}
