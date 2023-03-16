import Head from "next/head";
import styles from "../styles/Home.module.css";
import Node from "../components/Node";
import { useEffect, useRef, useState } from "react";
import Navbar, { algorithms } from "../components/Navbar";
import { dijkstras } from "../algorithms/dijkstras";
import { aStar } from "../algorithms/aStar";
import { bidirectional } from "../algorithms/bidirectional";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { bestfs } from "../algorithms/bestFirstSearch";
import { britishMuseum } from "../algorithms/britishMuseum";
import { clearWay } from "../visualize";
import Header from "../components/Header";
import { MiddlewareNotFoundError } from "next/dist/shared/lib/utils";

export const START_ROW = 10;
export const START_COL = 5;
export const END_ROW = 10;
export const END_COL = 40;
export const rows = 21;
export const COLS = 50;

function instantAlgorithm(
  selectedAlgorithm,
  grid,
  setGrid,
  startNode,
  row,
  col,
  clearPath,
  setEndNode
) {
  clearPath(false);
  var endNode = grid[row][col];
  var visitedNodes;
  var path;
  if (selectedAlgorithm === "Dijkstras") {
    [visitedNodes, path] = dijkstras(grid, startNode, endNode);
  } else if (selectedAlgorithm === "A*") {
    [visitedNodes, path] = aStar(grid, startNode, endNode);
  } else if (selectedAlgorithm === "Bidirectional") {
    [visitedNodes, path] = bidirectional(grid, startNode, endNode);
  } else if (selectedAlgorithm === "BFS") {
    [visitedNodes, path] = bfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "DFS") {
    [visitedNodes, path] = dfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "Best First Search") {
    [visitedNodes, path] = bestfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "British Museum") {
    [visitedNodes, path] = britishMuseum(grid, startNode, endNode);
  }
  var newGrid = grid.slice();

  for (let i = 0; i < visitedNodes.length; i++) {
    let node = visitedNodes[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantVisited: true,
    };
  }

  for (let i = 0; i < path.length; i++) {
    let node = path[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      newGrid[node.row][node.col] = {
        ...node,
        isEnd: node.row === row && node.col === col,
      };
    }
  }

  setEndNode(newGrid[row][col]);
  setGrid(newGrid);
}

function instantAlgorithmII(
  selectedAlgorithm,
  grid,
  setGrid,
  row,
  col,
  endNode,
  clearPath,
  setStartNode
) {
  clearPath(false);
  var startNode = grid[row][col];
  var visitedNodes;
  var path;
  if (selectedAlgorithm === "Dijkstras") {
    [visitedNodes, path] = dijkstras(grid, startNode, endNode);
  } else if (selectedAlgorithm === "A*") {
    [visitedNodes, path] = aStar(grid, startNode, endNode);
  } else if (selectedAlgorithm === "Bidirectional") {
    [visitedNodes, path] = bidirectional(grid, startNode, endNode);
  } else if (selectedAlgorithm === "BFS") {
    [visitedNodes, path] = bfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "DFS") {
    [visitedNodes, path] = dfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "Best First Search") {
    [visitedNodes, path] = bestfs(grid, startNode, endNode);
  } else if (selectedAlgorithm === "British Museum") {
    [visitedNodes, path] = britishMuseum(grid, startNode, endNode);
  }
  var newGrid = grid.slice();

  for (let i = 0; i < visitedNodes.length; i++) {
    let node = visitedNodes[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantVisited: true,
    };
  }

  for (let i = 0; i < path.length; i++) {
    let node = path[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      newGrid[node.row][node.col] = {
        ...node,
        isStart: node.row === row && node.col === col,
      };
    }
  }

  setStartNode(newGrid[row][col]);
  setGrid(newGrid);
}

function instantAlgorithmIII(
  selectedAlgorithm,
  grid,
  setGrid,
  startNode,
  row,
  col,
  endNode,
  clearPath,
  setBombNode
) {
  clearPath(false);
  var bombNode = grid[row][col];

  var visitedNodes;
  var path;
  var visitedNodes2;
  var path2;

  if (selectedAlgorithm === "Dijkstras") {
    [visitedNodes, path] = dijkstras(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dijkstras(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "A*") {
    [visitedNodes, path] = aStar(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = aStar(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Bidirectional") {
    [visitedNodes, path] = bidirectional(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bidirectional(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "BFS") {
    [visitedNodes, path] = bfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "DFS") {
    [visitedNodes, path] = dfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Best First Search") {
    [visitedNodes, path] = bestfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bestfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "British Museum") {
    [visitedNodes, path] = britishMuseum(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = britishMuseum(grid, bombNode, endNode);
  }
  var newGrid = grid.slice();

  for (let i = 0; i < visitedNodes.length; i++) {
    let node = visitedNodes[i];
    newGrid[node.row][node.col] = {
      ...node,
      isBombInstantVisited: true,
    };
  }

  for (let i = 0; i < visitedNodes2.length; i++) {
    let node = visitedNodes2[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantVisited: true,
    };
  }

  for (let i = 0; i < path.length; i++) {
    let node = path[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }

  for (let i = 0; i < path2.length; i++) {
    let node = path2[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      newGrid[node.row][node.col] = {
        ...node,
        isBomb: node.row === row && node.col === col,
      };
    }
  }

  setBombNode(newGrid[row][col]);
  setGrid(newGrid);
}

function instantAlgorithmIV(
  selectedAlgorithm,
  grid,
  setGrid,
  startNode,
  bombNode,
  row,
  col,
  clearPath,
  setEndNode
) {
  clearPath(false);
  var endNode = grid[row][col];

  var visitedNodes;
  var path;
  var visitedNodes2;
  var path2;

  if (selectedAlgorithm === "Dijkstras") {
    [visitedNodes, path] = dijkstras(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dijkstras(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "A*") {
    [visitedNodes, path] = aStar(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = aStar(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Bidirectional") {
    [visitedNodes, path] = bidirectional(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bidirectional(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "BFS") {
    [visitedNodes, path] = bfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "DFS") {
    [visitedNodes, path] = dfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Best First Search") {
    [visitedNodes, path] = bestfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bestfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "British Museum") {
    [visitedNodes, path] = britishMuseum(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = britishMuseum(grid, bombNode, endNode);
  }
  var newGrid = grid.slice();

  for (let i = 0; i < visitedNodes.length; i++) {
    let node = visitedNodes[i];
    newGrid[node.row][node.col] = {
      ...node,
      isBombInstantVisited: true,
    };
  }

  for (let i = 0; i < visitedNodes2.length; i++) {
    let node = visitedNodes2[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantVisited: true,
    };
  }

  for (let i = 0; i < path.length; i++) {
    let node = path[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }

  for (let i = 0; i < path2.length; i++) {
    let node = path2[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      newGrid[node.row][node.col] = {
        ...node,
        isEnd: node.row === row && node.col === col,
        isStart: node.row === startNode.row && node.col === startNode.col,
      };
    }
  }

  setEndNode(newGrid[row][col]);
  setGrid(newGrid);
}

function instantAlgorithmV(
  selectedAlgorithm,
  grid,
  setGrid,
  row,
  col,
  bombNode,
  endNode,
  clearPath,
  setStartNode
) {
  clearPath(false);
  var startNode = grid[row][col];

  var visitedNodes;
  var path;
  var visitedNodes2;
  var path2;

  if (selectedAlgorithm === "Dijkstras") {
    [visitedNodes, path] = dijkstras(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dijkstras(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "A*") {
    [visitedNodes, path] = aStar(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = aStar(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Bidirectional") {
    [visitedNodes, path] = bidirectional(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bidirectional(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "BFS") {
    [visitedNodes, path] = bfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "DFS") {
    [visitedNodes, path] = dfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = dfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "Best First Search") {
    [visitedNodes, path] = bestfs(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = bestfs(grid, bombNode, endNode);
  } else if (selectedAlgorithm === "British Museum") {
    [visitedNodes, path] = britishMuseum(grid, startNode, bombNode);
    clearWay(grid, setGrid);
    [visitedNodes2, path2] = britishMuseum(grid, bombNode, endNode);
  }

  var newGrid = grid.slice();

  for (let i = 0; i < visitedNodes2.length; i++) {
    let node = visitedNodes2[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantVisited: true,
    };
  }

  for (let i = 0; i < visitedNodes.length; i++) {
    let node = visitedNodes[i];
    newGrid[node.row][node.col] = {
      ...node,
      isBombInstantVisited: true,
    };
  }

  for (let i = 0; i < path.length; i++) {
    let node = path[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }

  for (let i = 0; i < path2.length; i++) {
    let node = path2[i];
    newGrid[node.row][node.col] = {
      ...node,
      isInstantInPath: true,
    };
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let node = newGrid[i][j];
      newGrid[node.row][node.col] = {
        ...node,
        isStart: node.row === row && node.col === col,
      };
    }
  }
  setStartNode(newGrid[row][col]);
  setGrid(newGrid);
}

export default function Home() {
  const [cols, setCols] = useState(0);
  const [rows, setrows] = useState(0);
  const [grid, setGrid] = useState();
  const [disable, setDisable] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [bombNode, setBombNode] = useState(null);
  const [changeBomb, setChangeBomb] = useState(false);
  const [changeStart, setChangeStart] = useState(false);
  const [changeEnd, setChangeEnd] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [algoDone, setAlgoDone] = useState(false);
  const [selectedTime, setSelectedTime] = useState(20);
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    let screen = () => {
      let width = window.innerWidth - 1;

      let navHeight = navRef.current.clientHeight;
      let headerHeight = headerRef.current.clientHeight;
      let descriptionHeight = descriptionRef.current.clientHeight;

      let remaningHeight =
        window.outerHeight - navHeight - headerHeight - descriptionHeight - 100;

      if (width > 768) {
        setrows(Math.floor(remaningHeight / 20));
        setCols(Math.floor(window.innerWidth / 20));
      } else {
        setrows(Math.floor(remaningHeight / 10));
        setCols(Math.floor(window.innerWidth / 10));
      }
      setStartNode(null);
      setEndNode(null);
      setBombNode(null);
      setAlgoDone(false);
    };
    window.onresize = screen;
    screen();
  }, []);

  console.log(rows);

  useEffect(() => {
    if (cols) setGrid(getInitialGrid());
    if (cols < 40) {
      setSelectedTime(35);
    } else if (cols > 55) {
      setSelectedTime(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  useEffect(() => {
    if (!startNode && !endNode && grid) {
      let start_col = cols < 45 ? 6 : 10;
      let end_col = cols < 45 ? cols - 6 : cols - 10;
      let midde_row = Math.floor(rows / 2);
      changeStartNode(midde_row, start_col);
      changeEndNode(midde_row, end_col);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  function getInitialGrid() {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let node = {
          row: i,
          col: j,
          isBomb: false,
          distance: Infinity,
          weight: 1,
          isStart: false,
          isEnd: false,
          parent: null,
          isBombVisited: false,
          isVisited: false,
          isInPath: false,
          isWall: false,
          huristic: Infinity,
          totalDistance: Infinity,
          isInstantInPath: false,
          isBombInstantVisited: false,
          isInstantVisited: false,
          isWeighted: false,
        };
        row.push(node);
      }
      grid.push(row);
    }
    return grid;
  }

  function getInitialNodes() {
    setStartNode(null);
    setEndNode(null);
    setBombNode(null);
    setAlgoDone(false);
  }

  const addBomb = () => {
    let row = 10;
    let col = Math.floor(cols / 2);
    let newGrid = grid.slice();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isStart: i === startNode.row && j === startNode.col,
          isEnd: i === endNode.row && j === endNode.col,
          isBomb: i === row && j === col,
          isVisited: false,
          isBombVisited: false,
          isBombInstantVisited: false,
          isInstantInPath: false,
          isInstantVisited: false,
          distance: Infinity,
          huristic: Infinity,
          totalDistance: Infinity,
          isInPath: false,
          parent: null,
        };
        newGrid[i][j] = newNode;
      }
    }
    setBombNode(newGrid[row][col]);
    setAlgoDone(false);
    setGrid(newGrid);
  };

  const handleMouseDown = (row, col) => {
    if (disable) return;
    if (row === startNode?.row && col === startNode?.col) {
      setChangeStart(true);
      if (algoDone) {
        if (bombNode) {
          instantAlgorithmV(
            selectedAlgorithm,
            grid,
            setGrid,
            row,
            col,
            bombNode,
            endNode,
            clearPath,
            setStartNode
          );
        } else {
          instantAlgorithmII(
            selectedAlgorithm,
            grid,
            setGrid,
            row,
            col,
            endNode,
            clearPath,
            setStartNode
          );
        }
      } else {
        changeStartNode(row, col);
      }
    } else if (row === endNode?.row && col === endNode?.col) {
      setChangeEnd(true);
      if (algoDone) {
        if (bombNode) {
          instantAlgorithmIV(
            selectedAlgorithm,
            grid,
            setGrid,
            startNode,
            bombNode,
            row,
            col,
            clearPath,
            setEndNode
          );
        } else {
          instantAlgorithm(
            selectedAlgorithm,
            grid,
            setGrid,
            startNode,
            row,
            col,
            clearPath,
            setEndNode
          );
        }
      } else {
        changeEndNode(row, col);
      }
    } else if (row === bombNode?.row && col === bombNode?.col) {
      setChangeBomb(true);
      if (algoDone) {
        instantAlgorithmIII(
          selectedAlgorithm,
          grid,
          setGrid,
          startNode,
          row,
          col,
          endNode,
          clearPath,
          setBombNode
        );
      } else {
        changeBombNode(row, col);
      }
    } else {
      setMouseDown(true);
      setCellAsWall(row, col);
    }
  };

  const clearPath = (algoClear = true) => {
    let newGrid = grid.slice();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isStart: i === startNode.row && j === startNode.col,
          isEnd: i === endNode.row && j === endNode.col,
          isBomb: i === bombNode?.row && j === bombNode?.col,
          isVisited: false,
          isBombVisited: false,
          isBombInstantVisited: false,
          isInstantInPath: false,
          isInstantVisited: false,
          distance: Infinity,
          huristic: Infinity,
          totalDistance: Infinity,
          isInPath: false,
          parent: null,
        };
        newGrid[i][j] = newNode;
      }
    }
    if (algoClear) setAlgoDone(false);
    setGrid(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (changeStart) {
      if (algoDone) {
        if (bombNode) {
          instantAlgorithmV(
            selectedAlgorithm,
            grid,
            setGrid,
            row,
            col,
            bombNode,
            endNode,
            clearPath,
            setStartNode
          );
        } else {
          instantAlgorithmII(
            selectedAlgorithm,
            grid,
            setGrid,
            row,
            col,
            endNode,
            clearPath,
            setStartNode
          );
        }
      } else {
        changeStartNode(row, col);
      }
    } else if (changeEnd) {
      if (algoDone) {
        if (bombNode) {
          instantAlgorithmIV(
            selectedAlgorithm,
            grid,
            setGrid,
            startNode,
            bombNode,
            row,
            col,
            clearPath,
            setEndNode
          );
        } else {
          instantAlgorithm(
            selectedAlgorithm,
            grid,
            setGrid,
            startNode,
            row,
            col,
            clearPath,
            setEndNode
          );
        }
      } else {
        changeEndNode(row, col);
      }
    } else if (changeBomb) {
      if (algoDone) {
        instantAlgorithmIII(
          selectedAlgorithm,
          grid,
          setGrid,
          startNode,
          row,
          col,
          endNode,
          clearPath,
          setBombNode
        );
      } else {
        changeBombNode(row, col);
      }
    } else if (mouseDown) {
      setCellAsWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setChangeEnd(false);
    setChangeBomb(false);
    setChangeStart(false);
  };

  const setCellAsWall = (row, col) => {
    let newGrid = grid.slice();
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
  };

  const changeStartNode = (row, col) => {
    let newGrid = grid.slice();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isStart: i === row && j === col,
        };
        newGrid[i][j] = newNode;
      }
    }
    setStartNode(newGrid[row][col]);
    setGrid(newGrid);
  };

  const changeEndNode = (row, col) => {
    let newGrid = grid.slice();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isEnd: i === row && j === col,
        };
        newGrid[i][j] = newNode;
      }
    }

    setEndNode(newGrid[row][col]);
    setGrid(newGrid);
  };

  const changeBombNode = (row, col) => {
    let newGrid = grid.slice();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isBomb: i === row && j === col,
        };
        newGrid[i][j] = newNode;
      }
    }
    setBombNode(newGrid[row][col]);
    setGrid(newGrid);
  };

  const clearBoard = () => {
    let newGrid = grid.slice();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let node = grid[i][j];
        let newNode = {
          ...node,
          isVisited: false,
          isBombVisited: false,
          isBombInstantVisited: false,
          isInstantInPath: false,
          isInstantVisited: false,
          distance: Infinity,
          huristic: Infinity,
          totalDistance: Infinity,
          isInPath: false,
          weight: 1,
          isWall: false,
          isWeighted: false,
          parent: null,
        };
        newGrid[i][j] = newNode;
      }
    }
    setAlgoDone(false);
    setGrid(newGrid);
  };

  const removeBomb = () => {
    let newGrid = grid.slice();
    newGrid[bombNode.row][bombNode.col] = {
      ...bombNode,
      isBomb: false,
    };
    setBombNode(null);
    setGrid(newGrid);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pathfinding Visualizer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        setDisable={setDisable}
        selectedAlgorithm={selectedAlgorithm}
        navRef={navRef}
        setSelectedAlgorithm={setSelectedAlgorithm}
        grid={grid}
        setGrid={setGrid}
        clearPath={clearPath}
        disable={disable}
        clearBoard={clearBoard}
        setAlgoDone={setAlgoDone}
        addBomb={addBomb}
        startNode={startNode}
        endNode={endNode}
        bombNode={bombNode}
        removeBomb={removeBomb}
        getInitialGrid={getInitialGrid}
        getInitialNodes={getInitialNodes}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        cols={cols}
      />
      <Header headerRef={headerRef} />
      <p className={styles.description} ref={descriptionRef}>
        {!selectedAlgorithm ? (
          "Pick an Algorithm and visualize it!"
        ) : selectedAlgorithm === "A*" || selectedAlgorithm === "Dijkstras" ? (
          <>
            {algorithms[selectedAlgorithm]} is{" "}
            <i>
              <b>weighted</b>
            </i>{" "}
            and{" "}
            <i>
              <b>guarantees</b>
            </i>{" "}
            the shortest path!
          </>
        ) : selectedAlgorithm === "BFS" &&
          selectedAlgorithm === "Best First Search" ? (
          <>
            {algorithms[selectedAlgorithm]} is{" "}
            <i>
              <b>unweighted</b>
            </i>{" "}
            and{" "}
            <i>
              <b>guarantees</b>
            </i>{" "}
            the shortest path!
          </>
        ) : (
          <>
            {algorithms[selectedAlgorithm]} is{" "}
            <i>
              <b>unweighted</b>
            </i>{" "}
            and{" "}
            <i>
              <b>does not guarantees</b>
            </i>{" "}
            the shortest path!
          </>
        )}
      </p>
      <div className={styles.grid}>
        {grid?.map((row, index) => (
          <div key={index} className={styles.row}>
            {row?.map((node, index) => (
              <Node
                key={index}
                row={node.row}
                col={node.col}
                isStart={node.isStart}
                isEnd={node.isEnd}
                distance={node.distance}
                isVisited={node.isVisited}
                isInPath={node.isInPath}
                isWall={node.isWall}
                isBomb={node.isBomb}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseEnter={handleMouseEnter}
                isBombVisited={node.isBombVisited}
                isInstantVisited={node.isInstantVisited}
                isBombInstantVisited={node.isBombInstantVisited}
                isInstantInPath={node.isInstantInPath}
                isAlgoDone={algoDone}
                isWeighted={node.isWeighted}
              ></Node>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
