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
    this.changeButtonsContent();
  }

  toggleShift() {
    this.shiftIsOn = !this.shiftIsOn;
  }

  toggleCaps() {
    this.capsIsOn = !this.capsIsOn;
  }

  removeActiveAll() {
    this.buttons.forEach((button) => {
      if (button.code !== 'CapsLock') button.element.classList.remove('pressed');
    });
  }

  switchLanguage() {
    this.changeLanguage();
    this.changeButtonsContent();
  }

  changeButtonsContent() {
    this.buttons.forEach((button) => {
      const elem = button;
      const content = button[this.language][this.case];
      elem.content.textContent = content;
    });
  }
}
