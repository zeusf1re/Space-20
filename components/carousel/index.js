export class CarouselComponent {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    getHTML() {
        const indicators = this.data.images.map((_, index) => `
            <button type="button" data-bs-target="#telescopeCarousel" data-bs-slide-to="${index}" 
                    ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                    aria-label="Slide ${index + 1}"></button>
        `).join('');

        const slides = this.data.images.map((img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${this.data.name}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${this.data.modes[index] || 'Режим наблюдения'}</h5>
                </div>
            </div>
        `).join('');

        return `
            <div id="telescopeCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    ${indicators}
                </div>
                <div class="carousel-inner">
                    ${slides}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#telescopeCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#telescopeCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
                </button>
            </div>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}
