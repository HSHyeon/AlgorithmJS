let input = require("fs").readFileSync("file.txt", "utf-8").trim().split("\n");
N = +input.shift();
arr = input.shift().split(" ").map(Number);
let stack = [];
let answer = new Array(N).fill(-1);
const freq = new Array(1000001).fill(0); // 특정 문제 조건에 따라 충분히 큰 배열을 미리 생성
for (let i = 0; i < N; i++) {
  freq[arr[i]]++;
}
for (let i = 0; i < N; i++) {
  while (stack.length && freq[arr[i]] > freq[arr[stack[stack.length - 1]]]) {
    answer[stack.pop()] = arr[i];
  }
  stack.push(i);
}
console.log(answer.join(" "));
