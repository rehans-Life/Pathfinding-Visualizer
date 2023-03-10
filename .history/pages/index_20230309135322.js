import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMemo } from "react";

class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isVisited = false;
    this.isStart = false;
    this.isEnd = false;
  }
}
export default function Home() {
  let grid = [];
  for (let i = 0; i < 20; i++) {
    let row = [];
    for (let j = 0; j < 50; j++) {
      const node = new Node(i, j);
      row.push(node);
    }
    grid.push(row);
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {grid.map((row, index) =>
          row.map((node, index) => (
            <div className={styles.node} key={index}></div>
          ))
        )}
      </div>
    </div>
  );
}
