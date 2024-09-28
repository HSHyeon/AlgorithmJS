let input = require("fs")
  .readFileSync("file.txt") //"/dev/stdin"
  .toString()
  .split("\n")
  .map((val) => val.trim());
let [n, m] = input.shift().split(" ").map(Number);
let arr = input.map((line) => line.split("").map(Number));
let visited = Array(n)
  .fill(0)
  .map(() =>
    Array(m)
      .fill(0)
      .map(() => Array(2).fill(0))
  );
let queue = [[0, 0, 0]];  
let dx = [1, -1, 0, 0];
let dy = [0, 0, 1, -1];
visited[0][0][0] = 1;

const dfs = () => {
  while (queue.length) {
    let [a, b, crashed] = queue.shift();
    if (a == n - 1 && b == m - 1) return visited[a][b][crashed];

    for (let i = 0; i < 4; i++) {
      let nx = a + dx[i];
      let ny = b + dy[i];

      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (arr[nx][ny] == 0 && visited[nx][ny][crashed] == 0) {
        visited[nx][ny][crashed] = visited[a][b][crashed] + 1;
        queue.push([nx, ny, crashed]);
      }
      if (arr[nx][ny] == 1 && crashed == 0 && visited[nx][ny][1] == 0) {
        visited[nx][ny][1] = visited[a][b][crashed] + 1;
        queue.push([nx, ny, 1]);
      }
    }
  }
  return -1;
};

console.log(dfs());
// 6 4
// 0100
// 1110
// 1000
// 0000
// 0111
// 0000
