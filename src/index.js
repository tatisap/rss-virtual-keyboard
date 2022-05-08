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
    if (button.code === 'Enter') keyboard.textarea.setRangeText('\n', keyboard.textarea.selectionStart, keyboard.textarea.selectionEnd, 'end');
    if (button.code === 'Tab') keyboard.textarea.setRangeText('\t', keyboard.textarea.selectionStart, keyboard.textarea.selectionEnd, 'end');
    if (button.code === 'Backspace') keyboard.textarea.setRangeText('', keyboard.textarea.selectionStart - 1, keyboard.textarea.selectionEnd, 'end');
    if (button.code === 'Delete') keyboard.textarea.setRangeText('', keyboard.textarea.selectionStart, keyboard.textarea.selectionEnd + 1, 'end');
  });
});

document.querySelectorAll('.shift').forEach((shift) => {
  shift.addEventListener('click', (event) => {
    const element = event.target.closest('.shift');
    element.classList.toggle('active');
    keyboard.changeKeysCase();
    keyboard.toggleShift();
  });
});

document.querySelector('.caps-lock').addEventListener('click', (event) => {
  const element = event.target.closest('.caps-lock');
  element.classList.toggle('active');
  keyboard.changeKeysCase();
  keyboard.toggleCaps();
});

window.addEventListener('keyup', (event) => {
  if (event.metaKey && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
    event.preventDefault();
    keyboard.switchLanguage();
  }
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lng', keyboard.language);
});
