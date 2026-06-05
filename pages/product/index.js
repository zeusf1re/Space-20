//import * as THREE from 'three';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { updateProgram, deleteProgram } from '../../services/storage.js';

export default class ProductDetail {
  constructor(program) {
    this.program = program; // program уже содержит id и все поля
//    this.threeInitialized = false;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'frame-style';
    container.style.width = '55%';
    container.style.margin = '0 auto';

    container.innerHTML = `
      <div class="calc-header">
        <span>✦ РЕДАКТИРОВАНИЕ ПРОГРАММЫ</span>
        <span class="status-light ok"></span>
      </div>
      <form style="margin-top:20px;">
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
          <button type="button" class="btn delete-btn" id="deleteBtn">УДАЛИТЬ</button>
        </div>
      </form>
    `;

    // Обработчики событий
    const form = container.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const updated = {
        id: this.program.id,
        mode: formData.get('mode'),
        target: formData.get('target'),
        priority: parseInt(formData.get('priority')),
        exposureTime: parseInt(formData.get('exposure'))
      };
      try {
        await updateProgram(updated);
        window.location.hash = ''; // возвращаемся на главную
      } catch (err) {
        console.error('Ошибка обновления:', err);
      }
    });

    const deleteBtn = container.querySelector('#deleteBtn');
    deleteBtn.addEventListener('click', async () => {
      if (confirm('Удалить программу?')) {
        try {
          await deleteProgram(this.program.id);
          window.location.hash = '';
        } catch (err) {
          console.error('Ошибка удаления:', err);
        }
      }
    });

    return container;
  }


}
