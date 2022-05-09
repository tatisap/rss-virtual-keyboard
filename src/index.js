import './styles/style.scss';
import initPageLayout from './scripts/page';
import keys from './keys.json';
import Keyboard from './scripts/keyboard';

initPageLayout();

const keyboard = new Keyboard(keys);

keyboard.buttons.forEach((button) => { keyboard.add(button); });
keyboard.addArrowWrapper();

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lng', keyboard.language);
});

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  keyboard.buttons.forEach((button) => {
    if (event.code !== button.code) return;
    if (button.code !== 'CapsLock') button.element.classList.add('pressed');
    keyboard.press(button);
  });
});
window.addEventListener('keyup', (event) => {
  keyboard.buttons.forEach((button) => {
    if (event.code !== button.code) return;
    button.element.classList.remove('pressed');
    if (button.code === 'CapsLock') keyboard.press(button);
    if (button.code.includes('Shift')) keyboard.press(button);
  });
});

document.querySelector('.keyboard-wrapper').addEventListener('click', (event) => {
  const element = event.target.closest('.button');
  if (!element) return;
  if (element.classList.contains('shift')) return;

  keyboard.buttons.forEach((button) => {
    if (element !== button.element) return;
    keyboard.textarea.focus();
    keyboard.press(button);
  });
});

document.querySelectorAll('.shift').forEach((shift) => {
  shift.addEventListener('mousedown', (event) => {
    const elem = event.target.closest('.shift');
    const button = keyboard.buttons.find((btn) => btn.element === elem);
    keyboard.press(button);
  });
  shift.addEventListener('mouseup', (event) => {
    console.log(keyboard.isShiftOn);
    if (!keyboard.shiftIsOn) return;
    const elem = event.target.closest('.shift');
    if (!elem) return;
    const button = keyboard.buttons.find((btn) => btn.element === elem);
    keyboard.press(button);
  });
});

window.addEventListener('keyup', (event) => {
  if ((event.metaKey && (event.code === 'ShiftLeft' || event.code === 'ShiftRight'))
    || (event.shiftKey && (event.code === 'MetaLeft' || event.code === 'MetaRight'))) {
    keyboard.switchLanguage();
  }
});
