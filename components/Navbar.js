import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { visualize, visualizeMazes } from "../visualize";

const algorithms = [
  {
    name: "Dijkstras",
  },
  {
    name: "A*",
  },
  {
    name: "Bidirectional",
  },
  {
    name: "Best First Search",
  },
  {
    name: "British Museum",
  },
  {
    name: "BFS",
  },
  {
    name: "DFS",
  },
];

const mazes = [
  {
    name: "Recursive Division",
  },
  {
    name: "Prims Algorithm",
  },
  {
    name: "Horizontal Skew",
  },
  {
    name: "Vertical Skew",
  },
];

export default function Navbar({
  selectedAlgorithm,
  setSelectedAlgorithm,
  grid,
  setGrid,
  setDisable,
  startNode,
  endNode,
  clearPath,
  disable,
  clearBoard,
  setAlgoDone,
}) {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [notSelected, setNotSelected] = useState(false);
  const [showMazes, setShowMazes] = useState(false);

  return (
    <nav className={styles.navbar}>
      <h3>Pathfinding Visualizer</h3>
      <div
        className={
          showAlgorithms
            ? `${styles.options} ${styles.selected}`
            : styles.options
        }
        onClick={() => setShowAlgorithms(!showAlgorithms)}
      >
        <p>Algorithms</p>
        <BiChevronDown />
        {showAlgorithms && (
          <div className={styles.algorithmsDropDown}>
            {algorithms.map(({ name }, index) => (
              <button
                disabled={disable}
                key={index}
                onClick={() => {
                  setSelectedAlgorithm(name);
                  notSelected && setNotSelected(false);
                }}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div
        className={
          showMazes ? `${styles.options} ${styles.selected}` : styles.options
        }
        onClick={() => setShowMazes(!showMazes)}
      >
        <p>Mazes And Patterns</p>
        <BiChevronDown />
        {showMazes && (
          <div className={styles.algorithmsDropDown}>
            {mazes.map(({ name }, index) => (
              <button
                disabled={disable}
                key={index}
                onClick={() =>
                  visualizeMazes(
                    name,
                    grid,
                    setGrid,
                    clearBoard,
                    setDisable,
                    startNode,
                    endNode
                  )
                }
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        disabled={disable}
        className={styles.visualizeBtn}
        onClick={() => {
          selectedAlgorithm
            ? visualize(
                selectedAlgorithm,
                grid,
                setGrid,
                setDisable,
                startNode,
                endNode,
                clearPath,
                setAlgoDone
              )
            : setNotSelected(true);
        }}
      >
        {!notSelected ? "Visualize" : "Pick an Algorithm"}
        {selectedAlgorithm ? ` ${selectedAlgorithm}!` : "!"}
      </button>
      <button disabled={disable} onClick={clearPath} className={styles.btn}>
        Clear Path
      </button>
      <button disabled={disable} onClick={clearBoard} className={styles.btn}>
        Clear Board
      </button>
    </nav>
  );
}
