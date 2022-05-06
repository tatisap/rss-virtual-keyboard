import './styles/style.scss';
import initPageLayout from './scripts/page';
import Button from './scripts/button';
import keys from './keys.json';

initPageLayout();

const buttons = [];

function addKeys() {
  keys.forEach((key) => {
    const button = new Button(key);
    button.initButtonEffect();
    buttons.push(button);
  });
}

addKeys();

const arrowWrapper = document.createElement('div');
arrowWrapper.classList.add('arrow-wrapper');
document.querySelector('.keyboard-wrapper').append(arrowWrapper);
document.querySelectorAll('.arrow').forEach((arrow) => arrowWrapper.append(arrow));

window.addEventListener('keydown', (event) => {
  buttons.forEach((button) => {
    if (event.code === button.code) button.element.classList.add('active');
  });
});
window.addEventListener('keyup', (event) => {
  buttons.forEach((button) => {
    if (event.code === button.code) button.element.classList.remove('active');
  });
});
