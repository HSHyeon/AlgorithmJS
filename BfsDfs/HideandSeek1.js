function solution(n, k) {
  let max = 200000;
  let answer = new Array(max).fill(0);
  let visit = new Array(max).fill(0);

  answer[n] = 1;
  visit[n] = 1;
  let queue = [];
  queue.push(n);
  while (queue.length > 0) {
    let cx = queue.shift();

    for (let i = 0; i < 3; i++) {
      let dx;
      if (i == 0) dx = cx + 1;
      if (i == 1) dx = cx - 1;
      if (i == 2) dx = cx * 2;
      if (dx < 0 || dx > max) continue;
      if (!visit[dx]) {
        visit[dx] = visit[cx] + 1;
        answer[dx] += answer[cx];
        queue.push(dx);
      } else if (visit[dx] == visit[cx] + 1) answer[dx] += answer[cx];
    }
  }
  return visit[k] - 1 + " " + answer[k];
}

let input = require("fs")
  .readFileSync("file.txt") //"/dev/stdin"
  .toString()
  .split("\n")
  .map((val) => val.trim());
let [n, k] = input
  .shift()
  .split(" ")
  .map((v) => +v);
console.log(solution(n, k));
