import styles from "../styles/Navbar.module.css";
import React, { useEffect, useState } from "react";
import { visualize, visualizeII, visualizeMazes } from "../visualize";
import { IoIosMenu, IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import Header from "./Header";

export const algorithms = {
  Dijkstras: "Dijkstras Algorithm",
  "A*": "A* Search",
  Bidirectional: "Bidirectional Search",
  "Best First Search": "Best First Search",
  "British Museum": "British Museum Search",
  BFS: "BFS",
  DFS: "DFS",
};

let mazes = [
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
  cols,
}) {
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [notSelected, setNotSelected] = useState(false);
  const [showMazes, setShowMazes] = useState(false);
  const [selectTime, setSelectTime] = useState(false);
  const [selectedTimeName, setSelectedTimeName] = useState(
    cols < 40 ? "Slow" : "Average"
  );
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setSelectedTimeName(cols < 40 ? "Slow" : "Average");
  }, [cols]);

  const Select = ({ title, state, setState }) => {
    return (
      <div
        className={styles.select}
        onClick={() => {
          setState((prev) => !prev);
        }}
      >
        <p>{title}</p>
        <FiChevronDown className={!state && styles.iconActivate} />
      </div>
    );
  };

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
          <IoMdArrowDropdown className={showAlgorithms & styles.iconActivate} />
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
                {Object.entries(algorithms).map(([name, title], index) => (
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
          <IoMdArrowDropdown
            className={showAlgorithms & styles.iconActivate}
          />{" "}
          <AnimatePresence>
            {showMazes && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: -25 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 95,
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
            getInitialNodes(grid);
            setGrid(getInitialGrid());
          }}
          className={styles.btn}
        >
          Clear Board
        </button>
        <button disabled={disable} onClick={clearPath} className={styles.btn}>
          Clear Path
        </button>
        <button disabled={disable} onClick={clearBoard} className={styles.btn}>
          Clear Walls And Weights
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
          <IoMdArrowDropdown className={showAlgorithms & styles.iconActivate} />
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
      <div className={styles.menuBtn} onClick={() => setShowSidebar(true)}>
        <IoIosMenu />
      </div>
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className={styles.sidebar}
          >
            <div
              className={styles.closeBtn}
              onClick={() => setShowSidebar(false)}
            >
              <IoMdClose />
            </div>
            <Select
              title="Algorithms"
              state={showAlgorithms}
              setState={setShowAlgorithms}
            />
            <AnimatePresence>
              {showAlgorithms && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    animationDuration: 400,
                  }}
                  exit={{
                    opacity: 0,
                    animationDuration: 400,
                  }}
                  className={styles.dropdownSidebar}
                >
                  {Object.entries(algorithms).map(([name, title], index) => (
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
            <Select
              title="Mazes And Patterns"
              state={showMazes}
              setState={setShowMazes}
            />
            <AnimatePresence>
              {showMazes && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    animationDuration: 400,
                  }}
                  exit={{
                    opacity: 0,
                    animationDuration: 400,
                  }}
                  className={styles.dropdownSidebar}
                >
                  {mazes.map(({ name }, index) => (
                    <button
                      disabled={disable}
                      key={index}
                      onClick={() => {
                        visualizeMazes(
                          name,
                          grid,
                          setGrid,
                          clearBoard,
                          setDisable,
                          startNode,
                          endNode,
                          selectedTime
                        );
                        setShowSidebar(false);
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              disabled={disable}
              className={`${styles.visualizeBtn} ${styles.sidebarVisualizeBtn}`}
              onClick={() => {
                if (selectedAlgorithm) {
                  if (bombNode) {
                    visualizeII(
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
                    );
                  } else {
                    visualize(
                      selectedAlgorithm,
                      grid,
                      setGrid,
                      setDisable,
                      startNode,
                      endNode,
                      clearPath,
                      setAlgoDone,
                      selectedTime
                    );
                  }
                  setShowSidebar(false);
                } else {
                  setNotSelected(true);
                }
              }}
            >
              {!notSelected ? "Visualize" : "Pick an Algorithm"}
              {selectedAlgorithm ? ` ${selectedAlgorithm}!` : "!"}
            </button>
            <div className={styles.btnBox}>
              <button
                disabled={disable}
                onClick={() => (bombNode ? removeBomb() : addBomb())}
                className={styles.sidebarBtn}
              >
                {!bombNode ? "Add Bomb" : "Remove Bomb"}
              </button>
              <button
                disabled={disable}
                onClick={() => {
                  setGrid(getInitialGrid());
                  getInitialNodes(grid);
                }}
                className={styles.sidebarBtn}
              >
                Clear Board
              </button>
              <button
                disabled={disable}
                onClick={clearPath}
                className={styles.sidebarBtn}
              >
                Clear Path
              </button>
              <button
                disabled={disable}
                onClick={clearBoard}
                className={styles.sidebarBtn}
              >
                Clear Walls And Weights
              </button>
            </div>
            <div
              className={styles.select}
              onClick={() => {
                setSelectTime(!selectTime);
              }}
            >
              <p>Speed: {selectedTimeName}</p>
              <FiChevronDown className={selectTime && styles.iconActivate} />
            </div>
            <AnimatePresence>
              {selectTime && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    animationDuration: 400,
                  }}
                  exit={{
                    opacity: 0,
                    animationDuration: 400,
                  }}
                  className={styles.dropdownSidebar}
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
