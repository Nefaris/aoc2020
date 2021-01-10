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

const sorted = data.sort((a, b) => calculateId(a) - calculateId(b));
for (let i = 0; i < sorted.length - 1; i++) {
  const a = calculateId(sorted[i]) + 1;
  const b = calculateId(sorted[i + 1]);
  if (a - b !== 0) {
    console.log(`solution: ${a}`);
    return;
  }
}
