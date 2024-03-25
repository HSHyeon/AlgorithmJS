function solution() {
  let input = require("fs")
    .readFileSync("file.txt") //"/dev/stdin"
    .toString()
    .split("\n")
    .map((val) => val.trim());
  let [n, k] = input
    .shift()
    .split(" ")
    .map((v) => +v);
  let max = 200000;
  // 1초후 x-1 or x+1
  // 1초후 2*x
  let ans = new Array(max + 4).fill(0);
  let vis = new Array(max + 4).fill(0);
  // 모든 경우의 수를 확인? ->2초 가능할듯
  const check = (start, end) => {
    let queue = [];
    vis[start] = 1;
    ans[start] = 1;
    queue.push(start);
    while (queue.length) {
      let cx = queue.shift();
      for (let dir = 0; dir < 3; dir++) {
        let nx;
        if (dir === 0) nx = cx * 2;
        else if (dir === 1) nx = cx + 1;
        else nx = cx - 1;
        if (nx >= 0 && nx < max) {
          if (!vis[nx]) {
            queue.push(nx);
            vis[nx] = vis[cx] + 1;
            ans[nx] += ans[cx];
          } else if (vis[nx] === vis[cx] + 1) {
            ans[nx] += ans[cx];
          }
        }
      }
    }
  };

  check(n, k);

  console.log(vis[k] - 1); // 최단 시간 출력
  console.log(ans[k]); // 경우의 수 출력
}

solution();
/*
기존 코드 - 시간 초과
분석해보기


let input = require("fs").readFileSync("file.txt").toString().split(" ");
let result = [];
let queue = [];
let visited = Array(200001).fill(false);

let a = Number(input[0]);
let b = Number(input[1]);

queue.push([a, 0]);

while (queue.length > 0) {
  let current = queue.shift();
  if (result.length > 0 && current[1] > result[0]) break;
  if (current[0] == b) {
    result.push(current[1]);
  }
  visited[current[0]] = true;
  if (current[0] - 1 >= 0 && !visited[current[0] - 1])
    queue.push([current[0] - 1, current[1] + 1]);

  if (current[0] * 2 <= 100000 && !visited[current[0] * 2])
    queue.push([current[0] * 2, current[1] + 1]);
  if (current[0] + 1 <= 100000 && !visited[current[0] + 1])
    queue.push([current[0] + 1, current[1] + 1]);
}

// 가장 짧은 경로의 길이를 구합니다.
let min = Math.min(...result);
let minDepth = result.filter((depth) => depth === min).length;
console.log(min, minDepth);

*/
