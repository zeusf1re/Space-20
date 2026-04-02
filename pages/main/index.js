import { SubjectCardComponent } from '../../components/subject-card/index.js';
import { SubjectPage } from '../subject/index.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page-root');
    }

    getData() {
        return [
            {
                id: 1,
                name: 'James Webb',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/JWST_artist%27s_rendering_%28wide_shot%29_2021.jpg/800px-JWST_artist%27s_rendering_%28wide_shot%29_2021.jpg',
                modes: ['Спектроскопия', 'Фотометрия', 'Коронография'],
                priority: 1,
                description: 'Инфракрасный телескоп следующего поколения для изучения ранней Вселенной',
                mirrorSize: 6.5,
                launchYear: 2021,
                images: [
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/JWST_artist%27s_rendering_%28wide_shot%29_2021.jpg/800px-JWST_artist%27s_rendering_%28wide_shot%29_2021.jpg',
                    'https://www.nasa.gov/wp-content/uploads/2021/11/jwst-mirrors.jpg',
                    'https://www.jwst.nasa.gov/assets/images/content/1-full_assembly_sm.jpg'
                ]
            },
            {
                id: 2,
                name: 'Hubble',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hubble_Space_Telescope_HST_SM4_1_new_small.jpg/800px-Hubble_Space_Telescope_HST_SM4_1_new_small.jpg',
                modes: ['Фотометрия', 'Спектроскопия'],
                priority: 2,
                description: 'Легендарный телескоп, работающий более 30 лет',
                mirrorSize: 2.4,
                launchYear: 1990,
                images: [
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hubble_Space_Telescope_HST_SM4_1_new_small.jpg/800px-Hubble_Space_Telescope_HST_SM4_1_new_small.jpg',
                    'https://hubblesite.org/files/live/sites/hubble/files/home/_images/about-hubble/hubble-space-telescope/header.jpg',
                    'https://www.nasa.gov/wp-content/uploads/2021/05/hubble-servicing-missions.jpg'
                ]
            },
            {
                id: 3,
                name: 'Euclid',
                image: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2022/07/euclid_space_telescope_artist_s_impression/24353991-1-eng-GB/Euclid_space_telescope_artist_s_impression_pillars.jpg',
                modes: ['Фотометрия', 'Спектроскопия'],
                priority: 3,
                description: 'Телескоп для изучения темной энергии и темной материи',
                mirrorSize: 1.2,
                launchYear: 2023,
                images: [
                    'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2022/07/euclid_space_telescope_artist_s_impression/24353991-1-eng-GB/Euclid_space_telescope_artist_s_impression_pillars.jpg',
                    'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2021/11/euclid/23289141-1-eng-GB/Euclid_pillars.jpg',
                    'https://euclidcalibration.org/wp-content/uploads/2023/07/Euclid-spacecraft.jpg'
                ]
            }
        ];
    }

    getHTML() {
        return `<div id="main-page-root" class="container-fluid p-5"></div>`;
    }

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        const subjectPage = new SubjectPage(this.parent, cardId);
        subjectPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        data.forEach((item) => {
            const card = new SubjectCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this));
        });
    }
}
