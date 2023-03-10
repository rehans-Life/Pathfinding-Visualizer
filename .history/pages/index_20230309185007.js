import Head from "next/head";
import styles from "../styles/Home.module.css";
import Node from "../components/Node";
import { dijkstras } from "../algorithms/dijkstras";
import { useMemo, useState } from "react";

const START_ROW = 10;
const START_COL = 5;
const END_ROW = 10;
const END_COL = 40;

export default function Home() {
  const [grid, setGrid] = useState([]);

  useMemo(() => {
    for (let i = 0; i < 20; i++) {
      let row = [];
      for (let j = 0; j < 50; j++) {
        const node = {
          row: i,
          col: j,
          isStart: i == START_ROW && j == START_COL,
          isEnd: i == END_ROW && j == END_COL,
          distance: Infinity,
          parent: null,
          isVisited: false,
          isWall: false,
        };
        row.push(node);
      }
      grid.push(row);
    }
  }, []);

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
              isWall={node.isWall}
            ></Node>
          ))}
        </div>
      ))}
    </div>
  );
}

const animteDijkstras = (visitedNodes, visualGrid, setVisualGrid) => {
  for (let i = 0; i < visitedNodes.length; i++) {
    let newGrid = visualGrid.slice();
    let node = visitedNodes[i];
    let newNode = {
      ...node,
      isVisited: true,
    };
    newGrid[node.row][node.col] = newNode;
    setVisualGrid(newGrid);
  }
};

const visualizeDijistras = (visualGrid, setVisualGrid) => {
  let startNode = visualGrid[START_ROW][START_ROW];
  let endNode = visualGrid[END_ROW][END_COL];
  let visitedNodes = dijkstras(visualGrid, startNode, endNode);
  animteDijkstras(visitedNodes, visualGrid, setVisualGrid);
};
