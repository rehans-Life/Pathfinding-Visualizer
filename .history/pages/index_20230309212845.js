import Head from "next/head";
import styles from "../styles/Home.module.css";
import Node from "../components/Node";
import { dijkstras } from "../algorithms/dijkstras";
import { useState } from "react";

const START_ROW = 10;
const START_COL = 5;
const END_ROW = 10;
const END_COL = 40;

function getInitialGrid() {
  let grid = [];
  for (let i = 0; i < 20; i++) {
    let row = [];
    for (let j = 0; j < 50; j++) {
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
      };
      row.push(node);
    }
    grid.push(row);
  }
  return grid;
}

export default function Home() {
  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseDown, setMouseDown] = useState(false);

  const handleMouseDown = (row, col) => {
    setMouseDown(true);
    setCellAsWall(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (mouseDown) {
      setCellAsWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const setCellAsWall = (row, col) => {
    let newGrid = grid.slice();
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pathfinding Visualizer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => visualizeDijistras(grid, setGrid)}>
        Visualize Dijkstras
      </button>
      <button onClick={() => setGrid(getInitialGrid())}>Clear Board</button>
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

const animteDijkstras = (visitedNodes, path, grid, setGrid) => {
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

const visualizeDijistras = (grid, setGrid) => {
  let startNode = grid[START_ROW][START_COL];
  let endNode = grid[END_ROW][END_COL];
  let visitedNodes = dijkstras(grid, startNode, endNode);
  let node = grid[END_ROW][END_COL];
  let path = [];
  while (node) {
    path.push(node);
    node = node.parent;
  }
  path.reverse();
  animteDijkstras(visitedNodes, path, grid, setGrid);
};
