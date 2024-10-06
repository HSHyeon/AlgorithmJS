let input = require("fs").readFileSync("file.txt", "utf-8").trim().split("\n");
let N = +input.shift();
let cards = input.shift().split(" ").map(Number);
let M = +input.shift();
let check = input.shift().split(" ").map(Number);

let cardset = new Set(cards);
let answer = [];

for (let i = 0; i < M; i++) {
  if (cardset.has(check[i])) answer.push(1);
  else answer.push(0);
}

console.log(answer.join(" "));
