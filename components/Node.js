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
  isInstantInPath,
  isInstantVisited,
  isBombInstantVisited,
  isAlgoDone,
  isWeighted,
}) {
  return (
    <div
      className={`${styles.node} ${
        !isWall && !isInPath && !isInstantInPath ? styles.border : {}
      }`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => handleMouseEnter(row, col)}
    >
      <div
        className={`${styles.animation} ${
          isStart
            ? `${styles.startNode} ${isAlgoDone ? styles.isSpecialPath : ""}`
            : isEnd
            ? `${styles.endNode} ${isAlgoDone ? styles.isSpecialPath : ""}`
            : isBomb
            ? `${styles.bombNode} ${isAlgoDone ? styles.isSpecialPath : ""}`
            : isWall
            ? styles.wall
            : isInPath
            ? styles.inPath
            : isVisited
            ? `${styles.visited} ${isWeighted ? styles.visitedWeighted : ""}`
            : isBombVisited
            ? `${styles.bombVisited}  ${
                isWeighted ? styles.visitedWeighted : ""
              }`
            : isInstantInPath
            ? styles.instantInPath
            : isInstantVisited
            ? `${styles.instantVisited}  ${
                isWeighted ? styles.visitedWeighted : ""
              }`
            : isBombInstantVisited
            ? `${styles.bombInstantVisited}  ${
                isWeighted ? styles.visitedWeighted : ""
              }`
            : isWeighted
            ? styles.weighted
            : {}
        }`}
      >
        {/* {isEnd && <GrTarget />} */}
      </div>
    </div>
  );
}
