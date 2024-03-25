let input = require("fs").readFileSync("file.txt").toString().split(" ");
let result = Infinity;

let a = Number(input[0]);
let b = Number(input[1]);

const dfs = (depth, num) => {
  if (num == b) {
    result = Math.min(result, depth);
    return;
  }

  if (num > b) return;
  dfs(depth + 1, num * 2);
  dfs(depth + 1, Number(num.toString() + 1));
};

dfs(1, a);
console.log(result == Infinity ? -1 : result);
