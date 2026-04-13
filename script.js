
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

    //PERSONAL FROM MAРИЯ ВАЛЕНТИНОВНА
//    function calculate() {
//        try {
//            let result = eval(currentInput);
//            if (typeof result === 'number' && isFinite(result)) {
//
//                let formatted = result.toFixed(12);
//
//                formatted = formatted.replace(/\.?0+$/, '');
//
//                if (formatted === '') formatted = '0';
//                currentInput = formatted;
//            } else {
//                currentInput = String(result);
//            }
//        } catch (e) {
//            currentInput = 'Error';
//        }
//        updateScreen();
//    }
function calculate() {
    try {
        let result = eval(currentInput);
        if (typeof result !== 'number' || !isFinite(result)) {
            currentInput = String(result);
            updateScreen();
            return;
        }


        let fullStr = result.toFixed(15);
        let [intPart, decPart] = fullStr.split('.');
        console.log(decPart);

        let cleanDec = decPart.substring(0, 14);
        let period = findPeriod(cleanDec);
        
        if (period) {

            let sign = result < 0 ? '-' : '';
            let absInt = Math.abs(parseInt(intPart, 10)).toString();
            currentInput = `${sign}${absInt}.(${period})`;
        } else {

            let truncated = decPart.length > 12 ? decPart.substring(0, 12) : decPart;
            if (truncated === '') {
                currentInput = intPart;
            } else {
                currentInput = `${intPart}.${truncated}`;
            }

            currentInput = currentInput.replace(/\.?0+$/, '');
            if (currentInput === '') currentInput = '0';
        }
        updateScreen();
    } catch (e) {
        currentInput = 'Error';
        updateScreen();
    }
}


function findPeriod(str) {
    let len = str.length;

//    let maxPeriodLen = Math.min(Math.floor(len / 2), 6);
    let maxPeriodLen = Math.floor(len / 2);
    
    for (let periodLen = 1; periodLen <= maxPeriodLen; periodLen++) {
        let candidate = str.substring(0, periodLen);

//        if (/^0+$/.test(candidate)) continue;


        let repeatCount = Math.floor(len / periodLen);
        let built = candidate.repeat(repeatCount);
        

        if (str.startsWith(built)) {
            let tail = str.slice(built.length);

            if (tail.length === 0 || candidate.startsWith(tail)) {
                return candidate;
            }
        }
    }
    return null;
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
