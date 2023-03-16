import Image from "next/image";
import React from "react";
import styles from "../styles/Header.module.css";

const items = [
  {
    title: "Start Node",
    icon: new String("/styling/triangletwo-right.svg"),
  },
  {
    title: "Target Node",
    icon: new String("/styling/circle.svg"),
  },
  {
    title: "Bomb Node",
    icon: new String("/styling/diamond.svg"),
  },
  {
    title: "Weight Node",
    icon: new String("/styling/weight.svg"),
  },
  {
    title: "Unvisited Node",
    icon: () => <div className={`${styles.box} ${styles.unvisited}`}></div>,
  },
  {
    title: "Visited Nodes",
    icon: () => <div className={`${styles.box} ${styles.blue}`}></div>,
    icon2: () => <div className={`${styles.box} ${styles.purple}`}></div>,
  },
  {
    title: "Shortest-Path Node",
    icon: () => <div className={`${styles.box} ${styles.path}`}></div>,
  },
  {
    title: "Wall Node",
    icon: () => <div className={`${styles.box} ${styles.wall}`}></div>,
  },
];

function Option({ title, Icon, Icon2, selectedAlgorithm }) {
  return (
    <div className={styles.option}>
      {Icon instanceof String ? (
        <Image
          height={1080}
          width={1080}
          className={styles.icon}
          src={Icon.valueOf()}
          alt=""
        />
      ) : (
        <Icon />
      )}
      {Icon2 && <Icon2 />}
      <p
        className={`${
          title === "Weight Node" &&
          [
            "Bidirectional",
            "Best First Search",
            "British Museum",
            "BFS",
            "DFS",
          ].includes(selectedAlgorithm)
            ? styles.cancel
            : ""
        }  ${styles.title}`}
      >
        {title}
      </p>
    </div>
  );
}

export default function Header({ headerRef, selectedAlgorithm }) {
  return (
    <header className={styles.container} ref={headerRef}>
      <div className={styles.header}>
        {items.map(({ title, icon, icon2 }, index) => (
          <Option
            key={index}
            title={title}
            Icon={icon}
            Icon2={icon2}
            selectedAlgorithm={selectedAlgorithm}
          />
        ))}
      </div>
    </header>
  );
}
