import React from "react";
import styles from "../styles/Home.module.css";

export default function Node({ row, col, isStart, isEnd }) {
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
