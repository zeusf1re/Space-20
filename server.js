const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'programs.json');

// Создаём папку data, если её нет
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Если файла с данными нет – создаём с дефолтными программами
if (!fs.existsSync(DATA_FILE)) {
  const defaults = [
    { id: 1001, mode: 'photometry', target: 'Бетельгейзе', priority: 1, exposureTime: 45 },
    { id: 1002, mode: 'spectroscopy', target: 'Галактика Андромеды', priority: 2, exposureTime: 120 },
    { id: 1003, mode: 'coronography', target: 'TRAPPIST-1', priority: 3, exposureTime: 30 }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaults, null, 2), 'utf8');
}

app.use(express.json());
app.use(express.static(__dirname)); // отдаём все файлы из корня как статику

// Вспомогательные функции
function readPrograms() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

function writePrograms(programs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(programs, null, 2), 'utf8');
}

// 1. GET /api/programs — список с фильтрацией
app.get('/api/programs', (req, res) => {
  let programs = readPrograms();
  const { mode, priority, target } = req.query;
  if (mode) programs = programs.filter(p => p.mode === mode);
  if (priority) programs = programs.filter(p => p.priority === parseInt(priority));
  if (target) programs = programs.filter(p => p.target.toLowerCase().includes(target.toLowerCase()));
  res.json(programs);
});

// 2. GET /api/programs/:id — одна программа
app.get('/api/programs/:id', (req, res) => {
  const programs = readPrograms();
  const program = programs.find(p => p.id === parseInt(req.params.id));
  if (!program) return res.status(404).json({ error: 'Программа не найдена' });
  res.json(program);
});

// 3. POST /api/programs
app.post('/api/programs', (req, res) => {
  const programs = readPrograms();
  const { mode, target, priority, exposureTime } = req.body;
  if (!mode || !target || priority == null || exposureTime == null) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }
  const newProgram = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    mode,
    target,
    priority: parseInt(priority),
    exposureTime: parseInt(exposureTime)
  };
  programs.push(newProgram);
  writePrograms(programs);
  res.status(201).json(newProgram);
});

// 4. PUT /api/programs/:id
app.put('/api/programs/:id', (req, res) => {
  const programs = readPrograms();
  const index = programs.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Программа не найдена' });
  const updated = { ...programs[index], ...req.body };
  updated.id = programs[index].id; // ID не меняем
  programs[index] = updated;
  writePrograms(programs);
  res.json(updated);
});

// ?exposureTime_lte=50
app.delete('/api/programs', (req, res) => {
  const maxTime = parseInt(req.query.maxExposureTime);
  if (!maxTime) {
    return res.status(400).json({ error: 'Укажите параметр maxExposureTime (число)' });
  }
  let programs = readPrograms();
  const beforeCount = programs.length;
  programs = programs.filter(p => p.exposureTime > maxTime);
  const deletedCount = beforeCount - programs.length;
  writePrograms(programs);
  res.json({ deleted: deletedCount, remaining: programs.length });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});