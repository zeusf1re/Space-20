import MainPage from './pages/main/index.js';
import ProductDetail from './pages/product/index.js';
import { getProgramById } from './services/storage.js';

class App {
  constructor() {
    this.routes = {
      '': MainPage,
      'product': ProductDetail
    };
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  async handleRoute() {
    const hash = window.location.hash.slice(1) || ''; // например, "" или "product/1001"
    const [route, param] = hash.split('/');

    const appEl = document.getElementById('app');
    appEl.innerHTML = '';

    try {
      if (route === '' || route === 'main') {
        // Главная страница
        const page = new MainPage();
        await page.init();          // асинхронная загрузка данных
        appEl.appendChild(page.render());
      } else if (route === 'product' && param) {
        // Страница товара
        const id = parseInt(param);
        const program = await getProgramById(id);
        if (!program) {
          appEl.innerHTML = '<div class="frame-style"><p>Программа не найдена</p></div>';
          return;
        }
        const page = new ProductDetail(program);
        appEl.appendChild(page.render());
        if (typeof page.initThreeJS === 'function') {
          page.initThreeJS();
        }
      } else {
        // Неизвестный маршрут – покажем главную
        const page = new MainPage();
        await page.init();
        appEl.appendChild(page.render());
      }
    } catch (error) {
      console.error('Ошибка маршрутизации:', error);
      appEl.innerHTML = '<div class="frame-style"><p>Ошибка загрузки</p></div>';
    }
  }
}

new App();
