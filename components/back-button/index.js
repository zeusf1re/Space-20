export default class BackButton {
  render() {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.marginBottom = '20px';
    btn.innerHTML = '← НАЗАД К СПИСКУ';
    
    btn.addEventListener('click', () => {
      window.location.hash = '';
    });
    
    return btn;
  }
}
