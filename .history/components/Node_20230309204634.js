import React from "react";
import styles from "../styles/Home.module.css";

export default function Node({
  row,
  col,
  isStart,
  isEnd,
  distance,
  isWall,
  isInPath,
  isVisited,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}) {
  return (
    <div
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => handleMouseEnter(row, col)}
      className={
        isStart
          ? styles.startNode
          : isEnd
          ? styles.endNode
          : isInPath
          ? styles.inPath
          : isVisited
          ? styles.visited
          : styles.node
      }
    >
      {" "}
    </div>
  );
}
