import React from "react";
import styles from "../styles/Node.module.css";

export default function Node({
  row,
  col,
  isStart,
  isEnd,
  isBomb,
  isWall,
  isBombVisited,
  isInPath,
  isVisited,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}) {
  return (
    <div
      className={styles.node}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => handleMouseEnter(row, col)}
    >
      <div
        className={`${styles.animation} ${
          isStart
            ? styles.startNode
            : isEnd
            ? styles.endNode
            : isBomb
            ? styles.bombNode
            : isWall
            ? styles.wall
            : isInPath
            ? styles.inPath
            : isVisited
            ? styles.visited
            : isBombVisited
            ? styles.bombVisited
            : {}
        }`}
      >
        {/* {isEnd && <GrTarget />} */}
      </div>
    </div>
  );
}
