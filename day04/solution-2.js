const fs = require('fs');

const fileData = fs.readFileSync('input.txt', 'utf-8');
const data = fileData.split('\n\n').filter(Boolean);

class Passport {
  passportFields = new Map();

  requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  optionalFields = ['cid'];

  validators = {
    birthYear: {min: 1920, max: 2002},
    issueYear: {min: 2010, max: 2020},
    expireYear: {min: 2020, max: 2030},
    eyeColor: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
    height: {
      cm: {min: 150, max: 193},
      in: {min: 59, max: 76}
    }
  }

  constructor(passportRawData) {
    passportRawData.split('\n').join(' ').split(' ').forEach(part => {
      const [key, val] = part.split(':');
      this.passportFields.set(key, val);
    });
  }

  isHairColorValid() {
    return new RegExp(/^#([a-f]*[0-9]*){6}$/).test(this.passportFields.get('hcl'));
  }

  isHeightValid() {
    const height = this.passportFields.get('hgt');
    const regexp = /([0-9]+)(cm|in)/;
    if (!(new RegExp(regexp).test(height))) {
      return false;
    }

    const matchGroups = height.match(regexp);
    const value = Number(matchGroups[1]);

    if (matchGroups[2] === 'cm') {
      return value >= this.validators.height.cm.min && value <= this.validators.height.cm.max;
    } else if (matchGroups[2] === 'in') {
      return value >= this.validators.height.in.min && value <= this.validators.height.in.max;
    } else {
      return false;
    }
  }

  isPidValid() {
    return new RegExp(/^[\d]{9}$/).test(this.passportFields.get('pid'));
  }

  isEyeColorValid() {
    return this.validators.eyeColor.includes(this.passportFields.get('ecl'));
  }

  isValid() {
    for (let requiredField of this.requiredFields) {
      if (!Array.from(this.passportFields.keys()).includes(requiredField)) {
        return false;
      }
    }

    const birthYear = Number(this.passportFields.get('byr'));
    if (birthYear < this.validators.birthYear.min || birthYear > this.validators.birthYear.max) {
      return false;
    }

    const issueYear = Number(this.passportFields.get('iyr'));
    if (issueYear < this.validators.issueYear.min || issueYear > this.validators.issueYear.max) {
      return false;
    }

    const expireYear = Number(this.passportFields.get('eyr'));
    if (expireYear < this.validators.expireYear.min || expireYear > this.validators.expireYear.max) {
      return false;
    }

    return this.isHeightValid() && this.isHairColorValid() && this.isPidValid() && this.isEyeColorValid();
  }
}

const validPassports = data.reduce((count, passportData) => {
  return count += new Passport(passportData).isValid() ? 1 : 0;
}, 0);

console.log(`solution: ${validPassports}`);
