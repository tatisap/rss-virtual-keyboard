import Button from './button';

export default class Keyboard {
  constructor(keys) {
    const language = (localStorage.getItem('lng')) ? localStorage.getItem('lng') : 'en';
    const buttons = [];

    keys.forEach((key) => {
      const button = new Button(key, language);
      button.initButtonEffect();
      buttons.push(button);
    });

    this.element = document.querySelector('.keyboard-wrapper');
    this.textarea = document.querySelector('.text');
    this.buttons = buttons;
    this.case = 'low';
    this.language = language;
    this.isShiftOn = false;
    this.isCapsOn = false;
    this.trigger = '';
  }

  add(button) {
    this.element.append(button.element);
  }

  addArrowWrapper() {
    const arrowWrapper = document.createElement('div');
    arrowWrapper.classList.add('arrow-wrapper');
    this.element.append(arrowWrapper);
    this.element.querySelectorAll('.arrow').forEach((arrow) => arrowWrapper.append(arrow));
  }

  changeCase() {
    this.case = (this.case === 'low') ? 'up' : 'low';
  }

  changeLanguage() {
    this.language = (this.language === 'en') ? 'ru' : 'en';
  }

  changeKeysCase() {
    this.changeCase();
    this.changeButtonsContent();
  }

  toggleShift() {
    this.isShiftOn = !this.isShiftOn;
  }

  toggleCaps() {
    this.isCapsOn = !this.isCapsOn;
  }

  removeActiveShift() {
    this.buttons.forEach((button) => {
      if (button.element.classList.contains('shift')) button.element.classList.remove('active');
    });
  }

  switchLanguage() {
    this.changeLanguage();
    this.changeButtonsContent();
  }

  switchTheme() {
    this.element.classList.toggle('dark-theme');
    this.buttons.forEach((button) => { button.element.classList.toggle('dark-theme'); });
  }

  swap() {
    let basket;
    this.buttons.forEach((button) => {
      const btn = button;
      if (button.en.upCaps) {
        basket = btn.en.low;
        btn.en.low = btn.en.up;
        btn.en.up = basket;
      }
      if (button.ru.upCaps) {
        basket = btn.ru.low;
        btn.ru.low = btn.ru.up;
        btn.ru.up = basket;
      }
    });
  }

  changeButtonsContent() {
    this.buttons.forEach((button) => {
      const elem = button;
      const content = button[this.language][this.case];
      elem.content.textContent = content;
    });
  }

  setPointer(position) {
    this.textarea.selectionStart = position;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  getLines() {
    return this.textarea.value.split(/\n/);
  }

  getPointerCoords() {
    const lines = this.getLines();
    let s = 0;
    const y = lines.findIndex((str) => {
      s += str.length + 1;
      return s > this.textarea.selectionStart;
    });
    const x = lines[y].length + 1 - (s - this.textarea.selectionStart);
    return { posX: x, posY: y };
  }

  setPointerCoords(x, y) {
    const lengthsOfLines = this.getLines().map((line) => line.length);
    const indent = ((x <= lengthsOfLines[y]) ? x : lengthsOfLines[y]);
    if (y === 0) {
      this.setPointer(indent);
      return;
    }
    const pos = lengthsOfLines.slice(0, y).reduce((sum, length) => sum + length + 1) + indent + 1;
    this.setPointer(pos);
  }

  press(button) {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const text = this.textarea.value;
    this.textarea.focus();

    switch (button.code) {
      case 'Enter': this.textarea.setRangeText('\n', start, end, 'end');
        break;
      case 'Tab': this.textarea.setRangeText('\t', start, end, 'end');
        break;
      case 'Backspace':
        if (start === 0 && start === end) return;
        this.textarea.setRangeText('', (start === end) ? start - 1 : start, end, 'end');
        break;
      case 'Delete': this.textarea.setRangeText('', start, (start === end) ? end + 1 : end, 'end');
        break;
      case 'ArrowUp': {
        const coords = this.getPointerCoords();
        if (coords.posY === 0) return;
        this.setPointerCoords(coords.posX, coords.posY - 1);
      }
        break;
      case 'ArrowDown': {
        const coords = this.getPointerCoords();
        if (coords.posY === this.getLines().length - 1) return;
        this.setPointerCoords(coords.posX, coords.posY + 1);
      }
        break;
      case 'ArrowLeft': this.setPointer((start === 0) ? 0 : start - 1);
        break;
      case 'ArrowRight': this.setPointer((start === text.length) ? text.length : start + 1);
        break;
      case 'CapsLock':
        this.textarea.blur();
        button.element.classList.toggle('active');
        this.toggleCaps();
        this.trigger = 'CapsLock';
        this.swap();
        this.changeButtonsContent();
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.textarea.blur();
        button.element.classList.toggle('active');
        this.toggleShift();
        this.trigger = 'Shift';
        this.changeKeysCase();
        break;
      default:
        if (button.type === 'alphanumeric') {
          this.textarea.setRangeText(button.content.textContent, start, end, 'end');
        }
        break;
    }
  }
}
