# Pathfinding Visualizer

Welcome to Pathfinding Visualizer! I built this application because I was fascinated by pathfinding algorithms, and I wanted to visualize them in action. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it. You can access it here [pathfinding-visualizer-livid.vercel.app](https://pathfinding-visualizer-livid.vercel.app/)

## Meet the Algorithms

This application supports the following algorithms:

Dijkstra's Algorithm (weighted): the father of pathfinding algorithms; guarantees the shortest path

A Search* (weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm

Best First Search (unweighted): it can be called as a greedy BFS; similar to A* uses heuristics to guarantee the shortest path

British Musuem Search (unweighted): it can be called as a greedy DFS; which also uses heuristics but still does not garuntee the shortest path.

Bidirectional Search (unweighted): This algorithm boils down to basically performing a BFS traversel from both the sides

Breath-first Search (unweighted): a great algorithm; guarantees the shortest path

Depth-first Search (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path

On top of the pathfinding algorithms listed above, I implemented a Recursive Division, Prims Algorithm and Kruskals Algorithm for Maze Generation.
