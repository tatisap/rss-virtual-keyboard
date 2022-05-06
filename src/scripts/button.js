export default class Button {
  constructor(key) {
    const element = document.createElement('div');
    element.classList.add('button');
    document.querySelector('.keyboard-wrapper').append(element);

    const content = document.createElement('span');
    content.textContent = key.enKey;
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
      key: key.enKey,
      shiftKey: key.enShiftKey,
    };
    this.ru = {
      key: key.ruKey,
      shiftKey: key.ruShiftKey,
    };
  }

  initButtonEffect() {
    this.element.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.element.classList.add('effect');
    });
    window.addEventListener('mouseup', (event) => {
      if (event.target === this.element) return;
      this.element.classList.remove('effect');
    });
    this.element.addEventListener('click', () => {
      this.element.classList.add('effect');
      setTimeout(() => { this.element.classList.remove('effect'); }, 200);
    });
  }
}
