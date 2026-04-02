import { SubjectDetailComponent } from '../../components/subject-detail/index.js';
import { MainPage } from '../main/index.js';

export class SubjectPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const telescopes = {
            1: {
                name: 'James Webb Space Telescope',
                description: 'Наиболее мощный космический телескоп на текущий момент. Изучает формирование первых галактик, экзопланеты и черные дыры в инфракрасном диапазоне.',
                modes: ['Спектроскопия', 'Фотометрия', 'Коронография'],
                priority: 1,
                mirrorSize: 6.5,
                launchYear: 2021,
                images: [
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/JWST_artist%27s_rendering_%28wide_shot%29_2021.jpg/800px-JWST_artist%27s_rendering_%28wide_shot%29_2021.jpg',
                    'https://www.nasa.gov/wp-content/uploads/2021/11/jwst-mirrors.jpg',
                    'https://www.jwst.nasa.gov/assets/images/content/1-full_assembly_sm.jpg'
                ]
            },
            2: {
                name: 'Hubble Space Telescope',
                description: 'Первый крупный оптический телескоп в космосе. Сделал революцию в астрономии, открыв тысячи новых объектов.',
                modes: ['Фотометрия', 'Спектроскопия'],
                priority: 2,
                mirrorSize: 2.4,
                launchYear: 1990,
                images: [
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hubble_Space_Telescope_HST_SM4_1_new_small.jpg/800px-Hubble_Space_Telescope_HST_SM4_1_new_small.jpg',
                    'https://hubblesite.org/files/live/sites/hubble/files/home/_images/about-hubble/hubble-space-telescope/header.jpg',
                    'https://www.nasa.gov/wp-content/uploads/2021/05/hubble-servicing-missions.jpg'
                ]
            },
            3: {
                name: 'Euclid Space Telescope',
                description: 'Европейский телескоп для картирования миллиарда галактик и изучения темной энергии.',
                modes: ['Фотометрия', 'Спектроскопия'],
                priority: 3,
                mirrorSize: 1.2,
                launchYear: 2023,
                images: [
                    'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2022/07/euclid_space_telescope_artist_s_impression/24353991-1-eng-GB/Euclid_space_telescope_artist_s_impression_pillars.jpg',
                    'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2021/11/euclid/23289141-1-eng-GB/Euclid_pillars.jpg',
                    'https://euclidcalibration.org/wp-content/uploads/2023/07/Euclid-spacecraft.jpg'
                ]
            }
        };
        return telescopes[this.id] || telescopes[1];
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    get pageRoot() {
        return document.getElementById('subject-detail-root');
    }

    getHTML() {
        return `<div id="subject-detail-root" class="min-vh-100"></div>`;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        const detail = new SubjectDetailComponent(this.pageRoot, data);
        detail.render(this.clickBack.bind(this));
    }
}
