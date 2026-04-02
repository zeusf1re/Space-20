import { SubjectCardComponent } from '../../components/subject-card/index.js';
import { SubjectPage } from '../subject/index.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap justify-content-center">
                <h1 class="w-100 text-center mb-4">Учебные предметы</h1>
            </div>
        `;
    }

    getData() {
        // Здесь можно загружать данные с сервера, но для примера используем статический массив
        return [
            {
                id: 1,
                title: 'Математика',
                shortDescription: 'Алгебра, геометрия, математический анализ.',
                fullDescription: 'Изучение математических структур, решение уравнений, работа с функциями, интегралы и производные.',
                image: 'https://picsum.photos/id/20/300/200',   // картинка для карточки
                mainImage: 'https://picsum.photos/id/20/400/300',
                teacher: 'Иванов И.И.',
                hoursPerWeek: 4,
                gallery: [
                    'https://picsum.photos/id/20/800/400',
                    'https://picsum.photos/id/21/800/400',
                    'https://picsum.photos/id/22/800/400'
                ]
            },
            {
                id: 2,
                title: 'Физика',
                shortDescription: 'Механика, термодинамика, оптика.',
                fullDescription: 'Изучение законов природы, решение задач по кинематике, динамике, электричеству и магнетизму.',
                image: 'https://picsum.photos/id/24/300/200',
                mainImage: 'https://picsum.photos/id/24/400/300',
                teacher: 'Петров П.П.',
                hoursPerWeek: 3,
                gallery: [
                    'https://picsum.photos/id/24/800/400',
                    'https://picsum.photos/id/25/800/400',
                    'https://picsum.photos/id/26/800/400'
                ]
            },
            {
                id: 3,
                title: 'Информатика',
                shortDescription: 'Программирование, алгоритмы, базы данных.',
                fullDescription: 'Основы программирования на Python, структуры данных, работа с базами данных, веб-технологии.',
                image: 'https://picsum.photos/id/0/300/200',
                mainImage: 'https://picsum.photos/id/0/400/300',
                teacher: 'Сидоров С.С.',
                hoursPerWeek: 5,
                gallery: [
                    'https://picsum.photos/id/0/800/400',
                    'https://picsum.photos/id/1/800/400',
                    'https://picsum.photos/id/2/800/400'
                ]
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const subjectPage = new SubjectPage(this.parent, cardId);
        subjectPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach(item => {
            const card = new SubjectCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this));
        });
    }
}
