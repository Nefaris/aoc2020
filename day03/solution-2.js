const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n').filter(Boolean);

const slope = data.map(row => row.split(''));

const width = slope[0].length;
const height = slope.length;

const tree = '#';

const countTrees = ({stepRight, stepDown}) => {
  let x = 0;
  let y = 0;

  let trees = 0;

  for (let i = 0; i < height / stepDown - 1; i++) {
    x = (x + stepRight) % width;
    y = (y + stepDown) % height;

    if (slope[y][x] === tree) {
      trees++;
    }
  }

  return trees;
}

const steps = [
  {stepRight: 1, stepDown: 1},
  {stepRight: 3, stepDown: 1},
  {stepRight: 5, stepDown: 1},
  {stepRight: 7, stepDown: 1},
  {stepRight: 1, stepDown: 2}
]

const solution = steps.reduce((count, stepsConfig) => countTrees(stepsConfig) * count, 1);

console.log(`solution: ${solution}`);
