import './styles/style.scss';
import initPageLayout from './scripts/page';
import Button from './scripts/button';
import keys from './keys.json';

initPageLayout();

function addKeys() {
  keys.forEach((key) => {
    const button = new Button(key);
    button.addToBoard();
    button.initButtonEffect();
  });
}

addKeys();

const arrowWrapper = document.createElement('div');
arrowWrapper.classList.add('arrow-wrapper');
document.querySelector('.keyboard-wrapper').append(arrowWrapper);
document.querySelectorAll('.arrow').forEach((arrow) => arrowWrapper.append(arrow));
