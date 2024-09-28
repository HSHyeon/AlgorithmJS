let input = require("fs")
  .readFileSync("file.txt") //"/dev/stdin"
  .toString()
  .split("\n")
  .map((val) => val.trim());
let N = +input.shift();
let arr = input.shift().split(" ").map(Number);
let node = +input.shift();
const connects = Array.from(Array(N + 1), () => []);
let visited = Array(N).fill(0);
let root = 0;
for (let i = 0; i < N; i++) {
  let parent = arr[i];
  if (parent == -1) {
    root = i;
    continue;
  }
  connects[parent].push(i);
}
let count = 0;

const dfs = (connects, j) => {
  if (root == node) return;
  let nodes = connects[j];
  if (visited[j] == 1) return;
  visited[j] = 1;
  if (nodes.length == 1 && nodes[0] == node) {
    count++;
    return;
  }
  if (j == node) return;
  if (nodes.length == 0) {
    count++;
    return;
  }
  for (let i of nodes) {
    dfs(connects, i);
  }
};

dfs(connects, root);
console.log(count);
