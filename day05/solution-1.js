const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n').filter(Boolean);

const getPartitionEdge = (a, b, edge) => {
  const diff = Math.abs(a - b);
  if (edge === 'upper') {
    return b - Math.ceil(diff / 2);
  } else if (edge === 'lower') {
    return a + Math.ceil(diff / 2);
  }
}

const calculateId = (code) => {
  let result = 8;
  let lower = 0;
  let upper = 127;

  for (let i = 0; i < 7; i++) {
    if (code[i] === 'F') {
      upper = getPartitionEdge(lower, upper, 'upper');
    } else if (code[i] === 'B') {
      lower = getPartitionEdge(lower, upper, 'lower');
    }
  }

  result *= lower;
  lower = 0;
  upper = 7;

  for (let i = 7; i < 10; i++) {
    if (code[i] === 'L') {
      upper = getPartitionEdge(lower, upper, 'upper');
    } else if (code[i] === 'R') {
      lower = getPartitionEdge(lower, upper, 'lower');
    }
  }

  return result + lower;
}

const highest = data.sort((a, b) => calculateId(b) - calculateId(a))[0];
console.log(`solution: ${highest}`);
