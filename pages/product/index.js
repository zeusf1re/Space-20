import ProductDetail from '../../components/product/index.js';
import BackButton from '../../components/back-button/index.js';
import { getProgramById, updateProgram, deleteProgram } from '../../services/storage.js';

export default class ProductPage {
  constructor(id) {
    this.id = id ? parseInt(id) : null;
    this.program = this.id ? getProgramById(this.id) : null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'mission-control';
    
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '800px';
    wrapper.style.width = '100%';
    

    const backBtn = new BackButton();
    wrapper.appendChild(backBtn.render());
    
    if (!this.program) {
      wrapper.innerHTML += `<div class="frame-style" style="text-align:center; padding:40px;">
        <p>Программа не найдена</p>
      </div>`;
      container.appendChild(wrapper);
      return container;
    }
    

    const detail = new ProductDetail(this.program);
    const detailEl = detail.render();
    

    const form = detailEl.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const updated = {
        ...this.program,
        mode: formData.get('mode'),
        target: formData.get('target'),
        priority: parseInt(formData.get('priority')),
        exposureTime: parseInt(formData.get('exposure'))
      };
      updateProgram(updated);
      window.location.hash = '';
    });
    
    const deleteBtn = detailEl.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      if (confirm('Удалить программу?')) {
        deleteProgram(this.program.id);
        window.location.hash = '';
      }
    });
    
    wrapper.appendChild(detailEl);
    container.appendChild(wrapper);
    
    return container;
  }
}
