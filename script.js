
// calc logic
const resultField = document.getElementById('result');

if (resultField) {
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
}

// telemetry
const statusIds = ['status-optics', 'status-miri', 'status-guidance', 'mainStatus'];

function updateTelemetry() {
    statusIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        // 0.85- ok; 0.1 - warning; 0.05 - err
        const rand = Math.random();
        
        el.className = 'status-light small'; // reset
        if (id === 'mainStatus') el.className = 'status-light main-indicator';

        if (rand > 0.95) {
            el.classList.add('err'); 
        } else if (rand > 0.85) {
            el.classList.add('warn');
        } else {
            el.classList.add('ok');
        }
    });
}

// reset every 2 sec
if (document.getElementById('status-optics')) {
    statusIds.forEach(id => document.getElementById(id)?.classList.add('ok'));
    setInterval(updateTelemetry, 2000);
}
