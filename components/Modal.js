/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "../styles/Modal.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

const tutorials = [
  {
    heading: "Welcome to Pathfinding Visualizer!",
    subHeading:
      "This short tutorial will walk you through all of the features of this application.",
    description:
      'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
    image: "/styling/c_icon.png",
  },
  {
    heading: "What is a pathfinding algorithm?",
    subHeading:
      "At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!",
    description:
      'All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.',
    image: "/styling/path.png",
  },
  {
    heading: "Meet the algorithms",
    subHeading: "Not all algorithms are created equal.",
    algorithms: {
      "Dijkstra's Algorithm": {
        description:
          "the father of pathfinding algorithms; guarantees the shortest path",
        type: "weighted",
      },
      "A* Search": {
        description:
          "arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm",
        type: "weighted",
      },
      "Bidirectional Search": {
        description:
          "This algorithm boils down to basically performing a BFS traversel from both the sides",
        type: "unweighted",
      },
      "Best First Search": {
        description:
          "it can be called as a greedy BFS; similar to A* uses heuristics to guarantee the shortest path",
        type: "unweighted",
      },
      "British Musuem Search": {
        description:
          "it can be called as a greedy DFS; which also uses heuristics but still does not garuntee the shortest path",
        type: "unweighted",
      },
      "Breadth First Search": {
        description: "a great algorithm; guarantees the shortest path",
        type: "unweighted",
      },
      "Dept First Search": {
        description:
          "a very bad algorithm for pathfinding; does not guarantee the shortest path",
        type: "unweighted",
      },
    },
  },
  {
    heading: "Picking an algorithm",
    subHeading: 'Choose an algorithm from the "Algorithms" drop-down menu.',
    description:
      "Note that some algorithms are unweighted, while others are weighted. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path.",
    image: "/styling/algorithms.png",
  },
  {
    heading: "Adding walls and weights",
    subHeading:
      'Click on the grid to add a wall. Click on the grid while pressing W to add a weight. Generate mazes and patterns from the "Mazes & Patterns" drop-down menu.',
    description:
      'Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. They are simply more "costly" to move through. In this application, moving through a weight node has a "cost" of 15.',
    image: "/styling/walls.gif",
  },
  {
    heading: "Adding a bomb",
    subHeading: 'Click the "Add Bomb" button.',
    description:
      "Adding a bomb will change the course of the chosen algorithm. In other words, the algorithm will first look for the bomb (in an effort to diffuse it) and will then look for the target node. Note that the Bidirectional Swarm Algorithm does not support adding a bomb.",
    image: "/styling/bomb.png",
  },
  {
    heading: "Dragging nodes",
    subHeading:
      "Click and drag the start, bomb, and target nodes to move them.",
    description:
      "Note that you can drag nodes even after an algorithm has finished running. This will allow you to instantly see different paths.",
    image: "/styling/dragging.gif",
  },
  {
    heading: "Visualizing and more",
    subHeading:
      "Use the navbar buttons to visualize algorithms and to do other stuff!",
    description:
      'You can clear the current path, clear walls and weights, clear the entire board, and adjust the visualization speed, all from the navbar. If you want to access this tutorial again, click on "Pathfinding Visualizer" in the top left corner of your screen.',
    image: "/styling/navbar.png",
  },
  {
    heading: "Enjoy!",
    subHeading:
      "I hope you have just as much fun playing around with this visualization tool as I had building it!",
    description:
      "If you want to see the source code for this application, check out my github.",
  },
];

const Tutorial = ({ heading, subHeading, description, image, algorithms }) => {
  return (
    <div className={styles.page}>
      <h1>{heading}</h1>
      <h3>{subHeading}</h3>
      <p>{description}</p>
      {image && (
        <Image
          src={image}
          alt=""
          className={image.includes("bomb") ? styles.bombImg : styles.image}
          width={1920}
          height={1080}
        />
      )}
      {algorithms &&
        Object.entries(algorithms)?.map(
          ([name, { description, type }], index) => (
            <p key={index}>
              <b>
                {name} ({type}):
              </b>{" "}
              {description}
            </p>
          )
        )}
    </div>
  );
};

export default function Modal({ setShowModal, setCounter, counter }) {
  return (
    <div className={styles.background}>
      <motion.div
        initial={{ scale: 0.1 }}
        animate={{
          scale: 1,
          animationDuration: 400,
        }}
        exit={{ scale: 0 }}
        className={styles.modal}
      >
        <div className={styles.counter}>{counter}/9</div>
        <Tutorial
          subHeading={tutorials[counter - 1].subHeading}
          heading={tutorials[counter - 1].heading}
          description={tutorials[counter - 1].description}
          image={tutorials[counter - 1].image}
          algorithms={tutorials[counter - 1].algorithms}
        />
        <div className={styles.btns}>
          <button onClick={() => setShowModal(false)} className={styles.btn}>
            Skip Tutorial
          </button>
          <div className={styles.move}>
            <button
              onClick={() =>
                setCounter((prev) => (prev !== 1 ? prev - 1 : prev))
              }
              className={styles.btn}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (counter !== 9) {
                  setCounter(counter + 1);
                } else {
                  setShowModal(false);
                }
              }}
              className={styles.btn}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
