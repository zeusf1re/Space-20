import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class ProductDetail {
  constructor(program) {
    this.program = program;
    this.threeInitialized = false; // чтобы не запускать сцену дважды
  }

  render() {
    const container = document.createElement('div');
    container.className = 'frame-style';
    container.style.width = '55%';
    container.style.margin = '0 auto';

    const modeDisplay = {
      photometry: 'Фотометрия',
      spectroscopy: 'Спектроскопия',
      coronography: 'Коронография'
    };

    container.innerHTML = `
      <div class="calc-header">
        <span>✦ РЕДАКТИРОВАНИЕ ПРОГРАММЫ</span>
        <span class="status-light ok"></span>
      </div>
      
      <!-- 3D-контейнер вместо картинки -->
 <div id="threejs-container" style="width:60%; height:220px; 
     border-radius:4px; border:1px solid var(--border); 
     overflow:hidden; margin:20px auto;">
</div>     

      <form style="margin-top:20px;">
        <!-- остальная форма без изменений -->
        <div class="form-group">
          <label>Режим наблюдения</label>
          <select name="mode" required>
            <option value="photometry" ${this.program.mode === 'photometry' ? 'selected' : ''}>Фотометрия</option>
            <option value="spectroscopy" ${this.program.mode === 'spectroscopy' ? 'selected' : ''}>Спектроскопия</option>
            <option value="coronography" ${this.program.mode === 'coronography' ? 'selected' : ''}>Коронография</option>
          </select>
        </div>
        <div class="form-group">
          <label>Целевой объект</label>
          <input type="text" name="target" value="${this.program.target}" required>
        </div>
        <div class="form-group">
          <label>Приоритет (1-3)</label>
          <input type="number" name="priority" min="1" max="3" value="${this.program.priority}" required>
        </div>
        <div class="form-group">
          <label>Время экспозиции (мин)</label>
          <input type="number" name="exposure" min="1" value="${this.program.exposureTime}" required>
        </div>
        <div style="display:flex; gap:12px; margin-top:24px;">
          <button type="submit" class="btn execute">СОХРАНИТЬ</button>
          <button type="button" class="btn delete-btn">УДАЛИТЬ</button>
        </div>
      </form>
    `;

    return container;
  }

  // Запуск Three.js – нужно вызвать ПОСЛЕ того, как контейнер добавлен в DOM
initThreeJS() {
  if (this.threeInitialized) return;
  const container = document.getElementById('threejs-container');
  if (!container) {
    console.error('Контейнер для 3D не найден');
    return;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111122);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(4, 2, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // --- OrbitControls ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.enableZoom = true;
  controls.zoomSpeed = 1.2;
  controls.enablePan = false;       // отключаем перемещение, только вращение
  controls.target.set(0, 0, 0);
  controls.update();

  // --- свет ---
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 3, 1);
  scene.add(directionalLight);

  // --- загрузка модели ---
  const loader = new GLTFLoader();
  loader.load(
    './models/telescope.glb',
    (gltf) => {
      const model = gltf.scene;
        model.scale.set(0.2, 0.2, 0.2);   // твой подходящий масштаб
      model.position.set(0, 0, 0);
      scene.add(model);
      console.log('Модель загружена');
    },
    undefined,
    (error) => console.error('Ошибка загрузки модели:', error)
  );

  // --- анимация (только контролы, без автовращения) ---
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // --- ресайз ---
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  this.threeInitialized = true;
}
}
