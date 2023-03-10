function dfs(grid, src, target) {
  visitedNodes = [];
  let delRow = [-1, +1, 0, 0];
  let delCol = [0, 0, -1, +1];

  function helper(node, parent) {
    node.visited = true;
    node.parent = parent;
    visitedNodes.push(node);
  }

  helper(src, null);
  return visitedNodes;
}
