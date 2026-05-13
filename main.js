import MainPage from './pages/main/index.js';
import ProductPage from './pages/product/index.js';

class App {
  constructor() {
    this.routes = {
      '': MainPage,
      'product': ProductPage
    };
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '';
    const [route, param] = hash.split('/');
    
    const PageComponent = this.routes[route] || MainPage;
    const page = new PageComponent(param);
    
    const appEl = document.getElementById('app');
    appEl.innerHTML = '';
    appEl.appendChild(page.render());
    
    // <-- добавлено: запуск 3D после рендера
    if (typeof page.initThreeJS === 'function') {
      page.initThreeJS();
    }
  }
}

new App();
