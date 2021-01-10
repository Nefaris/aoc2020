const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n').filter(Boolean);

const slope = data.map(row => row.split(''));

const stepRight = 3;
const stepDown = 1;

const width = slope[0].length;
const height = slope.length;

const tree = '#';

let x = 0;
let y = 0;

let trees = 0;

for (let i = 0; i < (height / stepDown) - 1; i++) {
  x = (x + stepRight) % width;
  y = (y + stepDown) % height;

  if (slope[y][x] === tree) {
    trees++;
  }
}

console.log(`solution: ${trees}`);
