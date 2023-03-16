import React, { useEffect, useRef } from "react";
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
  setKeyedDown,
}) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    node.addEventListener("keydown", handleKeydown, true);
    node.addEventListener("keyup", handleKeyup, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeydown = (e) => e.key === "w" && setKeyedDown(true);
  const handleKeyup = (e) => e.key === "w" && setKeyedDown(false);

  return (
    <div
      ref={nodeRef}
      className={`${styles.node} ${
        !isWall && !isInPath && !isInstantInPath ? styles.border : {}
      }`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => handleMouseEnter(row, col)}
      tabIndex={-1}
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
      ></div>
    </div>
  );
}
