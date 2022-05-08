export default class Button {
  constructor(key, language) {
    const element = document.createElement('div');
    element.classList.add('button');

    const content = document.createElement('span');
    content.textContent = key[(language === 'en') ? 'enKey' : 'ruKey'];
    element.append(content);

    if (key.type === 'functional') {
      element.classList.add(key.position);
      const keyClass = key.enKey.split('').map((i) => ((i === ' ') ? '-' : i)).join('');
      element.classList.add(keyClass);
    }

    if (key.code === 'Space') element.classList.add('space');
    if (key.code.includes('Arrow')) element.classList.add('arrow');

    this.element = element;
    this.content = content;
    this.code = key.code;
    this.type = key.type;
    this.en = {
      low: key.enKey,
      up: key.enShiftKey,
    };
    this.ru = {
      low: key.ruKey,
      up: key.ruShiftKey,
    };
  }

  initButtonEffect() {
    this.element.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.element.classList.add('pressed');
    });
    window.addEventListener('mouseup', (event) => {
      if (event.target === this.element) return;
      this.element.classList.remove('pressed');
    });
    this.element.addEventListener('click', () => {
      this.element.classList.add('pressed');
      setTimeout(() => { this.element.classList.remove('pressed'); }, 200);
    });
  }
}
