import Head from "next/head";
import styles from "../styles/Home.module.css";

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

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const node = new Node(i, j);
      grid.append(node);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}