import React from "react";
import styles from "../styles/Home.module.css";

export default function Node({
  row,
  col,
  isStart,
  isEnd,
  distance,
  isWall,
  isVisited,
}) {
  return (
    <div
      className={
        isStart
          ? styles.startNode
          : isEnd
          ? styles.endNode
          : isVisited
          ? styles.visited
          : styles.node
      }
    >
      {" "}
    </div>
  );
}
