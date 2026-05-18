import ProductCard from '../../components/product-card/index.js';
import { getPrograms, addProgram, getRandomImage } from '../../services/storage.js';

export default class MainPage {
  constructor() {
    this.programs = [];
    this.loaded = false;
  }

  // Асинхронная инициализация — загрузка данных с сервера
  async init() {
    await this.loadPrograms();
    this.loaded = true;
  }

  async loadPrograms(filters = {}) {
    try {
      this.programs = await getPrograms(filters);
    } catch (error) {
      console.error('Ошибка загрузки программ:', error);
      this.programs = [];
    }
  }

  render() {
    const container = document.createElement('div');
    container.className = 'mission-control';
    
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '1200px';
    wrapper.style.width = '100%';

    const header = document.createElement('div');
    header.className = 'calc-header';
    header.style.marginBottom = '20px';
    header.innerHTML = `
      <span>✦ ПРОГРАММЫ НАБЛЮДЕНИЙ</span>
      <span class="status-light ok"></span>
    `;
    wrapper.appendChild(header);

    // Форма добавления
    const form = this.createAddForm();
    wrapper.appendChild(form);

    // Панель фильтров (необязательно, но добавим для демонстрации)
    const filterBar = this.createFilterBar();
    wrapper.appendChild(filterBar);

    // Сетка карточек
    const grid = document.createElement('div');
    grid.className = 'cards-grid';
    
    if (this.programs.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">
        [ НЕТ АКТИВНЫХ ПРОГРАММ ]
      </div>`;
    } else {
      this.programs.forEach(program => {
        if (!program.image) {
          program.image = getRandomImage();
        }
        const card = new ProductCard(program);
        grid.appendChild(card.render());
      });
    }
    
    wrapper.appendChild(grid);
    container.appendChild(wrapper);
    
    return container;
  }

  createAddForm() {
    const form = document.createElement('form');
    form.className = 'frame-style';
    form.style.marginBottom = '30px';
    
    form.innerHTML = `
      <div style="display:flex; gap:15px; align-items:flex-end; flex-wrap:wrap;">
        <div class="form-group" style="flex:2; min-width:200px;">
          <label>Режим</label>
          <select name="mode" required>
            <option value="photometry">Фотометрия</option>
            <option value="spectroscopy">Спектроскопия</option>
            <option value="coronography">Коронография</option>
          </select>
        </div>
        <div class="form-group" style="flex:3; min-width:200px;">
          <label>Целевой объект</label>
          <input type="text" name="target" placeholder="Например, Бетельгейзе" required>
        </div>
        <div class="form-group" style="flex:1; min-width:100px;">
          <label>Приоритет (1-3)</label>
          <input type="number" name="priority" min="1" max="3" value="2" required>
        </div>
        <div class="form-group" style="flex:1; min-width:120px;">
          <label>Экспозиция (мин)</label>
          <input type="number" name="exposure" min="1" value="30" required>
        </div>
        <button type="submit" class="btn execute" style="margin-bottom:20px;margin-top:20px;">Добавить</button>
      </div>
    `;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newProgram = {
        mode: formData.get('mode'),
        target: formData.get('target'),
        priority: parseInt(formData.get('priority')),
        exposureTime: parseInt(formData.get('exposure'))
      };
      
      try {
        await addProgram(newProgram);
        await this.loadPrograms(); // перезагружаем список с сервера
        this.rerender();
      } catch (error) {
        console.error('Ошибка добавления:', error);
      }
    });

    return form;
  }

  createFilterBar() {
    const div = document.createElement('div');
    div.className = 'frame-style';
    div.style.marginBottom = '20px';
div.innerHTML = `
  <div style="display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap;">
    <div class="form-group" style="min-width:150px;">
      <label>Режим</label>
      <select id="filterMode">
        <option value="">Все</option>
        <option value="photometry">Фотометрия</option>
        <option value="spectroscopy">Спектроскопия</option>
        <option value="coronography">Коронография</option>
      </select>
    </div>
    <div class="form-group" style="min-width:100px;">
      <label>Приоритет</label>
      <input type="number" id="filterPriority" min="1" max="3" placeholder="1-3">
    </div>
    <div class="form-group" style="min-width:300px;">
      <label>Объект (поиск)</label>
      <input type="text" id="filterTarget" placeholder="Часть названия">
    </div>
    <div style="margin-left: auto; display: flex; gap: 10px; align-items: flex-end;">
      <button type="button" id="applyFilterBtn" class="btn execute">Применить</button>
      <button type="button" id="resetFilterBtn" class="btn">Сброс</button>
    </div>
  </div>
`;

    // Навешиваем обработчики после добавления в DOM
    setTimeout(() => {
      const applyBtn = document.getElementById('applyFilterBtn');
      const resetBtn = document.getElementById('resetFilterBtn');
      if (applyBtn) {
        applyBtn.addEventListener('click', async () => {
          const filters = {
            mode: document.getElementById('filterMode').value,
            priority: document.getElementById('filterPriority').value,
            target: document.getElementById('filterTarget').value
          };
          await this.loadPrograms(filters);
          this.rerender();
        });
      }
      if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
          document.getElementById('filterMode').value = '';
          document.getElementById('filterPriority').value = '';
          document.getElementById('filterTarget').value = '';
          await this.loadPrograms();
          this.rerender();
        });
      }
    }, 0);

    return div;
  }

  rerender() {
    const appEl = document.getElementById('app');
    appEl.innerHTML = '';
    appEl.appendChild(this.render());
  }
}
