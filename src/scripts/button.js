export default class Button {
  constructor(key) {
    const element = document.createElement('div');
    element.classList.add('button');

    if (key.type === 'functional') {
      element.classList.add(key.position);
      const keyClass = key.enKey.split('').map((i) => ((i === ' ') ? '-' : i)).join('');
      element.classList.add(keyClass);
    }

    if (key.code === 'Space') element.classList.add('space');
    if (key.code.includes('Arrow')) element.classList.add('arrow');

    const content = document.createElement('span');
    content.textContent = key.enKey;
    element.append(content);

    this.element = element;
    this.content = content;
    this.code = key.code;
    this.type = key.type;
  }

  addToBoard() {
    document.querySelector('.keyboard-wrapper').append(this.element);
  }

  initButtonEffect() {
    this.element.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.element.classList.add('effect');
    });
    window.addEventListener('mouseup', () => {
      this.element.classList.remove('effect');
    });
  }
}
