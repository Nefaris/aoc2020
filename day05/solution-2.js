const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n').filter(Boolean);

const calculateId = (code) => {
  console.log(code);
  // BFFFBBFRRR
}

console.log(`solution: ${calculateId('BFFFBBFRRR')}`);
