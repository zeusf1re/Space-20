// task3_6.js
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function rle(str) {
  if (str.length === 0) return '';
  let result = '';
  let count = 1;
  let prev = str[0];
  for (let i = 1; i < str.length; i++) {
    if (str[i] === prev) {
      count++;
    } else {
      result += "\\" + prev + "\\" + count;
      prev = str[i];
      count = 1;
    }
  }
  result += "\\" + prev + "\\" + count;
  return result;
}

async function main() {
  const inputStr = await rl.question('Введите строку для сжатия: ');
  console.log('Сжатая строка:', rle(inputStr));
  rl.close();
}

main();
