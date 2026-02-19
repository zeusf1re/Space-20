const resultField = document.getElementById('result');
let currentInput = '0';

function updateScreen() {
    resultField.value = currentInput;
}

function appendDigit(digit) {
    if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    updateScreen();
}

function appendOp(op) {
    const lastChar = currentInput.slice(-1);
    if ('+-*/%'.includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateScreen();
}

function clearResult() {
    currentInput = '0';
    updateScreen();
}

function toggleSign() {
    if (currentInput === '0') return;
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateScreen();
}

function calculate() {
    try {
        currentInput = String(eval(currentInput)); // ну я оставлю пока что
    } catch (e) {
        currentInput = 'Error';
    }
    updateScreen();
}
