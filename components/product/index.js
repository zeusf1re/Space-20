export default class ProductDetail {
  constructor(program) {
    this.program = program;
  }

render() {
  const container = document.createElement('div');
  container.className = 'frame-style';
  
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
    
    <div style="margin: 20px 0; text-align: center;">
      <img src="${this.program.image || './imgs/img1.jpeg'}" 
           alt="Телескоп" 
           style="max-width: 100%; max-height: 250px; border-radius: 4px; 
                  border: 1px solid var(--border); object-fit: cover;">
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
            <button type="button" class="btn delete-btn">УДАЛИТЬ</button>
        </div>
        </form>
  `;
  
  return container;
}
}
