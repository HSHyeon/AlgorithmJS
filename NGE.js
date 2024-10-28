let input = require("fs").readFileSync("/dev/stdin", "utf-8").trim().split("\n");
let N = +input.shift();
let arr = input.shift().split(" ").map(Number);
let answer = new Array(arr.length).fill(-1);

let stack = [];

const findNGE = (index) => {
  // 스택의 인덱스 값을 이용해 오큰수를 구합니다.
  while (stack.length && arr[index] > arr[stack[stack.length - 1]]) {
    answer[stack.pop()] = arr[index];
  }
  stack.push(index);
};

for (let i = 0; i < N; i++) {
  findNGE(i);
}

console.log(answer.join(" "));
