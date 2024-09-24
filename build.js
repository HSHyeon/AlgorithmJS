function solution(n, arr) {
  let answer = Array(n).fill(1); // 모든 사람의 기본 순위를 1로 설정

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 자신과 비교하지 않도록 j = i + 1
      // i번째 사람의 몸무게와 키가 모두 j번째 사람보다 클 경우
      if (arr[i][0] > arr[j][0] && arr[i][1] > arr[j][1]) {
        answer[j]++; // j번째 사람의 순위를 증가
      }
      // j번째 사람이 i번째 사람보다 몸무게와 키 모두 클 경우
      else if (arr[i][0] < arr[j][0] && arr[i][1] < arr[j][1]) {
        answer[i]++; // i번째 사람의 순위를 증가
      }
    }
  }
  return answer;
}

let input = require("fs")
  .readFileSync("file.txt") // "/dev/stdin"
  .toString()
  .split("\n")
  .map((val) => val.trim());

let N = +input.shift(); // N을 숫자로 변환
let arr = input.map((line) => line.split(" ").map(Number)); // 몸무게와 키 배열로 변환

console.log(solution(N, arr).join(" ")); // 해결 함수 호출 및 출력
