function solution(n, arr) {
  let visited = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  let rgvisited = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  let answer = 0;
  let rganswer = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j] == 0) {
        dfs(arr, visited, i, j, arr[i][j]);
        answer++;
      }
      if (rgvisited[i][j] == 0) {
        rgdfs(arr, rgvisited, i, j, arr[i][j]);
        rganswer++;
      }
    }
  }
  console.log(answer + " " + rganswer);
}

function dfs(arr, visited, i, j, color) {
  if (i < 0 || j < 0 || i >= arr.length || j >= arr.length) return;
  if (visited[i][j] != 0) return;
  if (arr[i][j] !== color) return;

  visited[i][j] = 1;
  dfs(arr, visited, i + 1, j, color);
  dfs(arr, visited, i, j + 1, color);
  dfs(arr, visited, i - 1, j, color);
  dfs(arr, visited, i, j - 1, color);
}

function rgdfs(arr, rgvisited, i, j, color) {
  if (i < 0 || j < 0 || i >= arr.length || j >= arr.length) return;
  if (rgvisited[i][j] != 0) return;

  if (arr[i][j] !== color) {
    if (arr[i][j] === "B" || color === "B") return;
  }
  rgvisited[i][j] = 1;
  rgdfs(arr, rgvisited, i + 1, j, color);
  rgdfs(arr, rgvisited, i, j + 1, color);
  rgdfs(arr, rgvisited, i - 1, j, color);
  rgdfs(arr, rgvisited, i, j - 1, color);
}

let input = require("fs")
  .readFileSync("file.txt", "utf-8") //"/dev/stdin"
  .trim()
  .split("\n")
  .map((val) => val.trim());

let N = +input.shift();
let arr = input.map((line) => line.split(""));

solution(N, arr);

// 5;
// RRRBB;
// GGBBB;
// BBBRR;
// BBRRR;
// RRRRR;
