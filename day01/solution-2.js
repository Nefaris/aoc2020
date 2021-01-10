const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n').filter(Boolean).map(Number);

(() => {
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      for (let k = j; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          console.log(`solution: ${data[i] * data[j] * data[k]}`);
          return;
        }
      }
    }
  }
})();
