
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



//-------------------------DASHBOARD-------------------------*//
// === DASHBOARD ANIMATIONS ===
document.addEventListener("DOMContentLoaded", function() {
    
    // Ищем лампочки на странице (если есть — мы на dashboard)
    const statusLights = document.querySelectorAll(".status-light");
    
    if (statusLights.length > 0) {
        
        // Состояния лампочек: зеленый, желтый, красный
        const statuses = ['ok', 'warn', 'err'];
        
        function animateStatusLights() {
            statusLights.forEach(light => {
                // Случайный статус (90% зеленый, 8% желтый, 2% красный)
                const randomStatus = Math.random() < 0.9 ? 'ok' : 
                                   Math.random() < 0.94 ? 'warn' : 'err';
                
                // Убираем все статусы и ставим новый
                light.classList.remove('ok', 'warn', 'err');
                light.classList.add(randomStatus);
            });
        }
        
        // Первая инициализация (все зеленые)
        statusLights.forEach(light => light.classList.add('ok'));
        
        // Меняем статус каждые 3 секунды
        setInterval(animateStatusLights, 3000);
    }
    
    // Hover эффект для карточек программ (дополнительная анимация)
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Клик по тегам режимов (простая смена active)
    const modeTags = document.querySelectorAll('.mode-tag');
    modeTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Убираем active у всех
            modeTags.forEach(t => t.classList.remove('active'));
            // Добавляем только текущему
            this.classList.add('active');
        });
    });
});
