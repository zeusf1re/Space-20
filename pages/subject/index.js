import { BackButtonComponent } from '../../components/back-button/index.js';
import { SubjectDetailComponent } from '../../components/subject-detail/index.js';
import { CarouselComponent } from '../../components/carousel/index.js';
import { MainPage } from '../main/index.js';

export class SubjectPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('subject-page');
    }

    getHTML() {
        return `<div id="subject-page"></div>`;
    }

    getData() {
    
        const allSubjects = [
            { id: 1, title: 'Математика', fullDescription: '...', teacher: 'Иванов И.И.', hoursPerWeek: 4, mainImage: '...', gallery: [...] },
            // ...
        ];
        const subjects = [
            {
                id: 1,
                title: 'Математика',
                shortDescription: 'Алгебра, геометрия, математический анализ.',
                fullDescription: 'Изучение математических структур, решение уравнений, работа с функциями, интегралы и производные.',
                image: 'https://picsum.photos/id/20/300/200',
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
        return subjects.find(subject => subject.id == this.id);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        if (!data) {
            this.parent.insertAdjacentHTML('beforeend', '<p>Предмет не найден</p>');
            return;
        }

        // back button
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        // detailde inf
        const detail = new SubjectDetailComponent(this.pageRoot);
        detail.render(data);

        // carousel
        const carousel = new CarouselComponent(this.pageRoot);
        carousel.render(data.gallery);
    }
}
