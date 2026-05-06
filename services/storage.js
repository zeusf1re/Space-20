const STORAGE_KEY = 'observation_programs';


const TELESCOPE_IMAGES = [
  './imgs/img1.jpeg',
  './imgs/img2.jpeg',
  './imgs/img3.jpeg'
];

function getRandomImage() {
  return TELESCOPE_IMAGES[Math.floor(Math.random() * TELESCOPE_IMAGES.length)];
}

function initializeDefaultPrograms() {
  const defaultPrograms = [
    {
      id: 1001,
      mode: 'photometry',
      target: 'Бетельгейзе',
      priority: 1,
      exposureTime: 45,
      image: getRandomImage()
    },
    {
      id: 1002,
      mode: 'spectroscopy',
      target: 'Галактика Андромеды',
      priority: 2,
      exposureTime: 120,
      image: getRandomImage()
    },
    {
      id: 1003,
      mode: 'coronography',
      target: 'TRAPPIST-1',
      priority: 3,
      exposureTime: 30,
      image: getRandomImage()
    }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrograms));
}

export function getPrograms() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    initializeDefaultPrograms();
    data = localStorage.getItem(STORAGE_KEY);
  }
  return data ? JSON.parse(data) : [];
}

export function getProgramById(id) {
  const programs = getPrograms();
  return programs.find(p => p.id === id);
}

export function addProgram(program) {
  const programs = getPrograms();
  if (!program.image) {
    program.image = getRandomImage();
  }
  programs.push(program);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
}

export function updateProgram(updatedProgram) {
  const programs = getPrograms();
  const index = programs.findIndex(p => p.id === updatedProgram.id);
  if (index !== -1) {
    // !
    if (!updatedProgram.image && programs[index].image) {
      updatedProgram.image = programs[index].image;
    }
    programs[index] = updatedProgram;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
  }
}

export function deleteProgram(id) {
  const programs = getPrograms();
  const filtered = programs.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
