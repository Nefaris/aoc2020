const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n\n').filter(Boolean);

const solution = data.reduce((count, group) => count + new Set(group.split('\n').join('').split('')).size, 0);
console.log(`solution: ${solution}`);
