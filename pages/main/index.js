import ProductCard from '../../components/product-card/index.js';
import { getPrograms, addProgram } from '../../services/storage.js';

export default class MainPage {
  constructor() {
    this.programs = getPrograms();
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
    
    

    const form = this.createAddForm();
    wrapper.appendChild(form);
    


    const grid = document.createElement('div');
    grid.className = 'cards-grid';
    
    if (this.programs.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">
        [ НЕТ АКТИВНЫХ ПРОГРАММ ]
      </div>`;
    } else {
      this.programs.forEach(program => {
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
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newProgram = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        mode: formData.get('mode'),
        target: formData.get('target'),
        priority: parseInt(formData.get('priority')),
        exposureTime: parseInt(formData.get('exposure'))
      };
      
      addProgram(newProgram);
      window.location.reload();
    });

    
    return form;
  }
}
