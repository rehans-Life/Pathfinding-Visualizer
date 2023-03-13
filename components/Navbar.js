import styles from "../styles/Navbar.module.css";
import React, { useState } from "react";
import { visualize, visualizeII, visualizeMazes } from "../visualize";
import { IoMdArrowDropdown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

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
  addBomb,
  bombNode,
  removeBomb,
  getInitialGrid,
  getInitialNodes,
}) {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [notSelected, setNotSelected] = useState(false);
  const [showMazes, setShowMazes] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link href={"/"}>
        <h3 className={styles.heading}>Pathfinding Visualizer</h3>
      </Link>
      <div className={styles.navOptions}>
        <div
          className={`${styles.options} ${
            showAlgorithms ? styles.selected : styles.unselected
          }`}
          onClick={() => {
            setShowAlgorithms(!showAlgorithms);
            setShowMazes(false);
          }}
        >
          <p>Algorithms</p>
          <IoMdArrowDropdown
            className={showAlgorithms ? styles.chevronUp : styles.chevronDown}
          />
          <AnimatePresence>
            {showAlgorithms && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: -25 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 120,
                  animationDuration: 400,
                }}
                exit={{ opacity: 0, scale: 0, y: -25, animationDuration: 400 }}
                className={styles.dropdown}
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className={`${styles.options} ${
            showMazes ? styles.selected : styles.unselected
          }`}
          onClick={() => {
            setShowMazes(!showMazes);
            setShowAlgorithms(false);
          }}
        >
          <p>Mazes And Patterns</p>
          <IoMdArrowDropdown />
          <AnimatePresence>
            {showMazes && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: -25 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 80,
                  animationDuration: 400,
                }}
                exit={{ opacity: 0, scale: 0, y: -25, animationDuration: 400 }}
                className={styles.dropdown}
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          disabled={disable}
          onClick={() => (bombNode ? removeBomb() : addBomb())}
          className={styles.btn}
        >
          {!bombNode ? "Add Bomb" : "Remove Bomb"}
        </button>
        <button
          disabled={disable}
          className={styles.visualizeBtn}
          onClick={() => {
            selectedAlgorithm
              ? bombNode
                ? visualizeII(
                    selectedAlgorithm,
                    grid,
                    setGrid,
                    setDisable,
                    startNode,
                    endNode,
                    bombNode,
                    clearPath,
                    setAlgoDone
                  )
                : visualize(
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
        <button
          disabled={disable}
          onClick={() => {
            setGrid(getInitialGrid);
            getInitialNodes(grid);
          }}
          className={styles.btn}
        >
          Clear Board
        </button>
        <button disabled={disable} onClick={clearPath} className={styles.btn}>
          Clear Path
        </button>
        <button disabled={disable} onClick={clearBoard} className={styles.btn}>
          Clear Walls And Paths
        </button>
      </div>
    </nav>
  );
}
