const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n').filter(Boolean);

const isValid = (entry) => {
  const regexp = /(\d+)-(\d+) ([a-z]): ([a-z]+)/;
  const groups = entry.match(regexp);

  const minLetters = Number(groups[1]);
  const maxLetters = Number(groups[2]);
  const allowedLetter = groups[3];
  const password = groups[4];

  let count = 0;
  for (let letter of password.split('')) {
    if (letter === allowedLetter) {
      count++;
    }

    if (count > maxLetters) {
      return false;
    }
  }

  return count >= minLetters;
};

(() => {
  const validPasswords = data.reduce((count, entry) => count += isValid(entry) ? 1 : 0, 0);
  console.log(`solution: ${validPasswords}`);
})();
