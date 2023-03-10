import Head from "next/head";
import styles from "../styles/Home.module.css";
import Node from "../components/Node";

const START_ROW = 10;
const START_COL = 5;
const END_ROW = 10;
const END_COL = 40;

export default function Home() {
  let grid = [];
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
        isWall: False,
      };
      row.push(node);
    }
    grid.push(row);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pathfinding Visualizer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              isWall={node.isWall}
            ></Node>
          ))}
        </div>
      ))}
    </div>
  );
}
