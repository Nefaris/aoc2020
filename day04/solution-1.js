const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n\n').filter(Boolean);

class Passport {
  passportFields = new Map();

  requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  optionalFields = ['cid'];

  constructor(passportRawData) {
    passportRawData.split('\n').join(' ').split(' ').forEach(part => {
      const [key, val] = part.split(':');
      this.passportFields.set(key, val);
    });
  }

  isValid() {
    for (let requiredField of this.requiredFields) {
      if (!Array.from(this.passportFields.keys()).includes(requiredField)) {
        return false;
      }
    }

    return true;
  }
}

const validPassports = data.reduce((count, passportData) => {
  return count += new Passport(passportData).isValid() ? 1 : 0;
}, 0);

console.log(`solution: ${validPassports}`);
