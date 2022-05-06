import './styles/style.scss';
import initPageLayout from './scripts/page';
import keys from './keys.json';
import Keyboard from './scripts/keyboard';

initPageLayout();

const keyboard = new Keyboard(keys);

keyboard.buttons.forEach((button) => { keyboard.add(button); });
keyboard.addArrowWrapper();

window.addEventListener('keydown', (event) => {
  keyboard.buttons.forEach((button) => {
    if (event.code === button.code) button.element.classList.add('active');
  });
});
window.addEventListener('keyup', (event) => {
  keyboard.buttons.forEach((button) => {
    if (event.code === button.code) button.element.classList.remove('active');
  });
});

document.querySelector('.keyboard-wrapper').addEventListener('click', (event) => {
  const element = event.target.closest('.button');
  if (!element) return;

  keyboard.buttons.forEach((button) => {
    if (element !== button.element) return;
    keyboard.textarea.focus();
    if (button.type === 'alphanumeric') {
      keyboard.textarea.setRangeText(button.content.textContent, keyboard.textarea.selectionStart, keyboard.textarea.selectionEnd, 'end');

      if (keyboard.shiftIsOn) {
        keyboard.changeKeysCase();
        keyboard.toggleShift();
        keyboard.removeActiveAll();
      }
    }
  });
});

document.querySelectorAll('.shift').forEach((shift) => {
  shift.addEventListener('click', (event) => {
    event.target.classList.toggle('active');
    keyboard.changeKeysCase();
    keyboard.toggleShift();
  });
});

document.querySelector('.caps-lock').addEventListener('click', (event) => {
  event.target.classList.toggle('active');
});
