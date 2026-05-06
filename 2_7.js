// task2_7.js
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function diagonalSum(matrix) {
  const n = matrix.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += matrix[i][i];
    sum += matrix[i][n - 1 - i];
  }
  if (n % 2 === 1) {
    const mid = Math.floor(n / 2);
    sum -= matrix[mid][mid];
  }
  return sum;
}

async function main() {
  try {
    const input = await rl.question('Введите квадратную матрицу (JSON массив массивов): ');
    const matrix = JSON.parse(input);
    if (!Array.isArray(matrix) || !matrix.every(row => Array.isArray(row))) {
      throw new Error('Неверный формат матрицы');
    }
    console.log('Сумма диагоналей:', diagonalSum(matrix));
  } catch (err) {
    console.error('Ошибка:', err.message);
  } finally {
    rl.close();
  }
}

console.log("[[1, 2, 3],[4, 5, 6],[7, 8, 9]]");
console.log("[[0, 2, 12],[4, 66666, 123],[1308, 8, 1]]");
console.log("Просто примерчики для копирования\n");
main();
