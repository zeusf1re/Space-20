export class CarouselComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(images) {
        // Генерируем индикаторы (точки) и слайды
        // generating dots and slides
        let indicators = '';
        let slides = '';

        images.forEach((img, idx) => {
            const activeClass = idx === 0 ? 'active' : '';
            indicators += `
                <button type="button" data-bs-target="#subjectCarousel" data-bs-slide-to="${idx}" class="${activeClass}" aria-current="${activeClass === 'active' ? 'true' : 'false'}" aria-label="Slide ${idx+1}"></button>
            `;
            slides += `
                <div class="carousel-item ${activeClass}">
                    <img src="${img}" class="d-block w-100" alt="Slide ${idx+1}" style="max-height: 400px; object-fit: contain;">
                </div>
            `;
        });

        return `
            <div id="subjectCarousel" class="carousel slide mt-4" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    ${indicators}
                </div>
                <div class="carousel-inner">
                    ${slides}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#subjectCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#subjectCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
                </button>
            </div>
        `;
    }

    render(images) {
        const html = this.getHTML(images);
        this.parent.insertAdjacentHTML('beforeend', html);
        // После вставки HTML нужно вручную инициализировать карусель Bootstrap
        const carouselElement = document.getElementById('subjectCarousel');
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
                interval: 3000,
                ride: 'carousel'
            });
        }
    }
}
