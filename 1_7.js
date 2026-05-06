// task1_7.js
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function isEqualObj(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) return false;
  }
  return true;
}

async function main() {
  try {
    const input1 = await rl.question('Введите первый объект (JSON): ');
    const input2 = await rl.question('Введите второй объект (JSON): ');
    const obj1 = JSON.parse(input1);
    const obj2 = JSON.parse(input2);
    console.log('Результат сравнения:', isEqualObj(obj1, obj2));
  } catch (err) {
    console.error('Ошибка: введите корректные JSON-объекты, например {"a":1,"b":2}');
  } finally {
    rl.close();
  }
}

main();
