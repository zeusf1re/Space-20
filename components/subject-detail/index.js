import { CarouselComponent } from '../carousel/index.js';
import { BackButtonComponent } from '../back-button/index.js';

export class SubjectDetailComponent {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    getHTML() {
        return `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="mb-4">${this.data.name}</h2>
                        <p class="lead mb-4">${this.data.description}</p>
                        
                        <div class="row mb-5">
                            <div class="col-md-6">
                                <h5>Режимы наблюдения:</h5>
                                <div>${this.data.modes.map(mode => `<span class="mode-tag">${mode}</span>`).join('')}</div>
                            </div>
                            <div class="col-md-6">
                                <h5>Параметры:</h5>
                                <ul class="list-unstyled">
                                    <li><strong>Приоритет:</strong> ${this.data.priority === 1 ? 'Критический' : this.data.priority === 2 ? 'Высокий' : 'Стандартный'}</li>
                                    <li><strong>Диаметр зеркала:</strong> ${this.data.mirrorSize} м</li>
                                    <li><strong>Запуск:</strong> ${this.data.launchYear}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Карусель изображений
        const carousel = new CarouselComponent(this.parent, this.data);
        carousel.render();
        
        // Кнопка назад
        const backButton = new BackButtonComponent(document.body);
        backButton.render(listener);
    }
}
