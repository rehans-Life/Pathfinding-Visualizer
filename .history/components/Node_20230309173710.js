import React from "react";
import styles from "../styles/Home.module.css";

export default function Node({ row, col, isStart, isEnd, distance, isWall }) {
  return (
    <div
      className={
        isStart ? styles.startNode : isEnd ? styles.endNode : styles.node
      }
    >
      {" "}
    </div>
  );
}
