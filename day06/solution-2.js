const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n\n').filter(Boolean);

const solution = data.reduce((count, part, index) => {
  const group = part.split('\n').filter(Boolean);
  const answers = new Map();

  group.forEach(person => {
    person.split('').forEach(answer => {
      if (answers.has(answer)) {
        answers.set(answer, answers.get(answer) + 1);
      } else {
        answers.set(answer, 1);
      }
    });
  });

  answers.forEach(val => {
    if (val === group.length) {
      count++;
    }
  });

  return count;
}, 0);

console.log(`solution: ${solution}`);
