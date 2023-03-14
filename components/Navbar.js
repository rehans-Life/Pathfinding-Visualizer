import styles from "../styles/Navbar.module.css";
import React, { useState } from "react";
import { visualize, visualizeII, visualizeMazes } from "../visualize";
import { IoMdArrowDropdown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const algorithms = [
  {
    title: "Dijkstras Algorithm",
    name: "Dijkstras",
  },
  {
    title: "A* Search",
    name: "A*",
  },
  {
    title: "Bidirectional Search",
    name: "Bidirectional",
  },
  {
    title: "Best First Search",
    name: "Best First Search",
  },
  {
    title: "British Museum Search",
    name: "British Museum",
  },
  {
    title: "BFS",
    name: "BFS",
  },
  {
    title: "DFS",
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
  { name: "Weighted Maze" },
];

const times = [
  {
    name: "Fast",
    time: 10,
  },
  {
    name: "Average",
    time: 20,
  },
  {
    name: "Slow",
    time: 35,
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
  selectedTime,
  setSelectedTime,
}) {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [notSelected, setNotSelected] = useState(false);
  const [showMazes, setShowMazes] = useState(false);
  const [selectTime, setSelectTime] = useState(false);
  const [selectedTimeName, setSelectedTimeName] = useState("Average");

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
            setSelectTime(false);
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
                {algorithms.map(({ name, title }, index) => (
                  <button
                    disabled={disable}
                    key={index}
                    onClick={() => {
                      setSelectedAlgorithm(name);
                      notSelected && setNotSelected(false);
                    }}
                  >
                    {title}
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
            setSelectTime(false);
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
                        endNode,
                        selectedTime
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
                    setAlgoDone,
                    selectedTime
                  )
                : visualize(
                    selectedAlgorithm,
                    grid,
                    setGrid,
                    setDisable,
                    startNode,
                    endNode,
                    clearPath,
                    setAlgoDone,
                    selectedTime
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
        <div
          className={`${styles.options} ${
            selectTime ? styles.selected : styles.unselected
          }`}
          onClick={() => {
            setSelectTime(!selectTime);
            setShowAlgorithms(false);
            setShowMazes(false);
          }}
        >
          <p>Speed: {selectedTimeName}</p>
          <IoMdArrowDropdown
            className={selectTime ? styles.chevronUp : styles.chevronDown}
          />
          <AnimatePresence>
            {selectTime && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: -25 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 70,
                  animationDuration: 400,
                }}
                exit={{ opacity: 0, scale: 0, y: -25, animationDuration: 400 }}
                className={styles.timeDropdown}
              >
                {times.map(({ name, time }, index) => (
                  <button
                    disabled={disable}
                    key={index}
                    onClick={() => {
                      setSelectedTime(time);
                      setSelectedTimeName(name);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
