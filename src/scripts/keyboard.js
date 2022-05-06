import Button from './button';

export default class Keyboard {
  constructor(keys) {
    const buttons = [];

    keys.forEach((key) => {
      const button = new Button(key);
      button.initButtonEffect();
      buttons.push(button);
    });

    this.element = document.querySelector('.keyboard-wrapper');
    this.textarea = document.querySelector('.text');
    this.buttons = buttons;
    this.case = 'low';
    this.language = 'en';
    this.shiftIsOn = false;
    this.capsIsOn = false;
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
    this.buttons.forEach((button) => {
      const elem = button;
      const content = button[this.language][this.case];
      elem.content.textContent = content;
    });
  }

  toggleShift() {
    this.shiftIsOn = !this.shiftIsOn;
  }

  toggleCaps() {
    this.capsIsOn = !this.capsIsOn;
  }

  removeActiveAll() {
    this.buttons.forEach((button) => {
      button.element.classList.remove('active');
    });
  }
}
