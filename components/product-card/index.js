import { deleteProgram } from '../../services/storage.js';

export default class ProductCard {
  constructor(program) {
    this.program = program;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const modeDisplay = {
      photometry: 'Фотометрия',
      spectroscopy: 'Спектроскопия',
      coronography: 'Коронография'
    };
    
    card.innerHTML = `
      <div class="card-header">
        <span class="mode-badge">${modeDisplay[this.program.mode]}</span>
        <span class="priority-badge">PRI ${this.program.priority}</span>
      </div>
      <div style="display: flex; gap: 12px; align-items: center; margin: 12px 0;">
        <img src="${this.program.image || './imgs/img1.jpeg'}" 
             alt="telescope" 
             style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; 
                    border: 1px solid var(--border);">
        <div style="flex:1;">
          <div class="target-name">${this.program.target}</div>
          <div class="exposure-time">${this.program.exposureTime} мин</div>
        </div>
      </div>
      <div class="card-actions">
        <button type="button" class="btn view-btn">ПОДРОБНЕЕ</button>
        <button type="button" class="btn delete-btn">УДАЛИТЬ</button>
      </div>
    `;
    
    const viewBtn = card.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => {
      window.location.hash = `product/${this.program.id}`;
    });
    
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm('Удалить программу?')) {
        try {
          await deleteProgram(this.program.id);
          window.location.reload();
        } catch (err) {
          console.error('Ошибка удаления:', err);
        }
      }
    });
    
    return card;
  }
}
