// task1_6.js
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function isEqualArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

async function main() {
  try {
    const inputA = await rl.question('Введите первый массив (JSON): ');
    const inputB = await rl.question('Введите второй массив (JSON): ');
    const arr1 = JSON.parse(inputA);
    const arr2 = JSON.parse(inputB);
    console.log('Результат сравнения:', isEqualArrays(arr1, arr2));
  } catch (err) {
    console.error('Ошибка: введите корректные JSON-массивы, например [1,2,3]');
  } finally {
    rl.close();
  }
}

main();
