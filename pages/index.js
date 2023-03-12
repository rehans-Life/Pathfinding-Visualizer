import Head from "next/head";
import styles from "../styles/Home.module.css";
import Node from "../components/Node";
import { visualizeDijistras } from "../algorithms/dijkstras";
import { use, useState } from "react";
import { visualizeDfs } from "../algorithms/dfs";
import { visualizeBfs } from "../algorithms/bfs";
import { visualizeAstar } from "../algorithms/aStar";
import { visualizeBidirectional } from "../algorithms/bidirectional";
import { visualizeBestfs } from "../algorithms/bestFirstSearch";
import { visualizeBritishMuseum } from "../algorithms/britishMuseum";
import { recursiveDivision } from "../mazes/recursiveDivision";
import { horizontalSkew } from "../mazes/horizontalSkew";
import { verticalSkew } from "../mazes/verticalSkew";
import { prims } from "../mazes/primsAlgorithm";

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

const canBecomeWall = (row, col) => {
  return row != END_ROW || col != END_COL;
};

export default function Home() {
  const [grid, setGrid] = useState(getInitialGrid());
  const [disbale, setDisable] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [startNode, setStartNode] = useState(grid[START_ROW][START_COL]);
  const [endNode, setEndNode] = useState(grid[END_ROW][END_COL]);
  const [changeStart, setChangeStart] = useState(false);
  const [changeEnd, setChangeEnd] = useState(false);

  const handleMouseDown = (row, col) => {
    if (disbale) return;
    if (row === startNode.row && col === startNode.col) {
      setChangeStart(true);
      changeStartNode(row, col);
    } else if (row === endNode.row && col === endNode.col) {
      setChangeEnd(true);
      changeEndNode(row, col);
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
      changeStartNode(row, col);
    } else if (changeEnd) {
      changeEndNode(row, col);
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
          // isWall: i === row && j === col ? false : node.isWall,
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
          // isWall: i === row && j === col ? false : node.isWall,
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
    setGrid(newGrid);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pathfinding Visualizer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.buttons}>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            clearPath();
            visualizeDijistras(grid, setGrid, setDisable, startNode, endNode);
          }}
        >
          Visualize Dijkstras
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            clearPath();
            visualizeDfs(grid, setGrid, setDisable, startNode, endNode);
          }}
        >
          Visualize Dfs
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            clearPath();
            visualizeBfs(grid, setGrid, setDisable, startNode, endNode);
          }}
        >
          Visualize Bfs
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            clearPath();
            visualizeAstar(grid, setGrid, setDisable, startNode, endNode);
          }}
        >
          Visualize Astar
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            clearPath();
            visualizeBidirectional(
              grid,
              setGrid,
              setDisable,
              startNode,
              endNode
            );
          }}
        >
          Visualize Bidirectional
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            clearPath();
            visualizeBestfs(grid, setGrid, setDisable, startNode, endNode);
          }}
        >
          Visualize Best First Search
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            clearPath();
            visualizeBritishMuseum(
              grid,
              setGrid,
              setDisable,
              startNode,
              endNode
            );
          }}
        >
          Visualize British Museum
        </button>
        <button disabled={disbale} onClick={clearBoard}>
          Clear Board
        </button>
      </div>
      <div className={styles.buttons}>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            recursiveDivision(
              grid,
              setGrid,
              clearBoard,
              setDisable,
              startNode,
              endNode
            );
          }}
        >
          Recursive Division
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            horizontalSkew(
              grid,
              setGrid,
              clearBoard,
              setDisable,
              startNode,
              endNode
            );
          }}
        >
          Horizontal Skew
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            verticalSkew(
              grid,
              setGrid,
              clearBoard,
              setDisable,
              startNode,
              endNode
            );
          }}
        >
          Vertical Skew
        </button>
        <button
          disabled={disbale}
          onClick={() => {
            setDisable(true);
            prims(grid, setGrid, clearBoard, setDisable, startNode, endNode);
          }}
        >
          Prims Algorithm
        </button>
        <button disabled={disbale} onClick={clearPath}>
          Clear Path
        </button>
      </div>
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
