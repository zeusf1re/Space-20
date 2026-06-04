
const API_BASE = '/api/programs';


const TELESCOPE_IMAGES = [
  './imgs/img1.jpeg',
  './imgs/img2.jpeg',
  './imgs/img3.jpeg'
];

export function getRandomImage() {
  return TELESCOPE_IMAGES[Math.floor(Math.random() * TELESCOPE_IMAGES.length)];
}


export async function getPrograms(filters = {}) {
  const params = new URLSearchParams();
  if (filters.mode) params.append('mode', filters.mode);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.target) params.append('target', filters.target);
  const query = params.toString();
  const url = query ? `${API_BASE}?${query}` : API_BASE;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Ошибка загрузки списка');
  return response.json();
}


export async function getProgramById(id) {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error('Программа не найдена');
  return response.json();
}


export async function addProgram(program) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(program)
  });
  if (!response.ok) throw new Error('Ошибка добавления');
  return response.json();
}


export async function updateProgram(program) {
  const response = await fetch(`${API_BASE}/${program.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(program)
  });
  if (!response.ok) throw new Error('Ошибка обновления');
  return response.json();
}


export async function deleteProgram(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Ошибка удаления');
  return response.json();
}
