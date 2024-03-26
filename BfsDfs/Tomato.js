//그냥 배열을 이용해 풀면 시간 초과가 나는 문제
//직접 큐를 구현해 풀어야한다..
//백준으로 js문제 풀기 빡세네..

let fs = require("fs");
let input = fs.readFileSync("file.txt").toString().trim().split("\n");

// [x, y, z]
const dir = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const [m, n, h] = input.shift().split(" ").map(Number);
let zero = 0;

class Node {
  constructor(x, y, z, count) {
    this.prev = null;
    this.next = null;
    this.x = x;
    this.y = y;
    this.z = z;
    this.count = count;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(x, y, z, count) {
    const node = new Node(x, y, z, count);
    if (!this.size) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      node.prev = this.rear;
      this.rear = node;
    }
    this.size++;
  }

  dequeue() {
    const node = this.front;
    if (this.size === 1) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = node.next;
      this.front.prev = null;
    }
    this.size--;
    return node;
  }
}

const queue = new Queue();
let visit = [...Array(h)].map((h) =>
  [...Array(n)].map((n) => Array(m).fill(0))
);
let maximum = m * n * h;
let z = 0;
let answer = 0;

for (let i = 0; i < input.length; i++) {
  let box = input[i].split(" ").map(Number);
  box.forEach((tomato, pos) => {
    visit[z][i % n][pos] = tomato;
    if (tomato === 1) {
      queue.enqueue(z, i % n, pos, 0);
    }
    if (tomato === 0) zero++;
    maximum--;
  });
  if ((i + 1) % n === 0) ++z;
}

while (queue.size > 0) {
  let { x, y, z, count } = queue.dequeue();

  for (let i = 0; i < dir.length; i++) {
    let dx = x + dir[i][0];
    let dy = y + dir[i][1];
    let dz = z + dir[i][2];

    if (dx < 0 || dy < 0 || dx >= h || dy >= n || dz < 0 || dz >= m) continue;

    if (visit[dx][dy][dz] == 0) {
      visit[dx][dy][dz] = 1;
      zero--;
      queue.enqueue(dx, dy, dz, count + 1);
      answer = Math.max(answer, count + 1);
    }
  }
}

console.log(zero > 0 ? -1 : answer);
