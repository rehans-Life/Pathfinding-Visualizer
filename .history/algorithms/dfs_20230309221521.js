function dfs(grid, src, target) {
  visitedNodes = [];

  function helper(node, parent) {
    node.visited = true;
    node.parent = parent;
    visitedNodes.push(node);
  }

  helper(src, null);
  return visitedNodes;
}
