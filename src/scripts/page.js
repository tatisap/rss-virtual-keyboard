export default function initPageLayout() {
  const pageContainer = document.createElement('div');
  pageContainer.classList.add('container');

  const header = document.createElement('header');

  const pageTitle = document.createElement('h1');
  pageTitle.classList.add('title');
  pageTitle.textContent = 'Virtual Keyboard';
  header.append(pageTitle);

  pageContainer.append(header);

  const main = document.createElement('main');

  const textArea = document.createElement('textarea');
  textArea.classList.add('text');
  main.append(textArea);

  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-wrapper');
  main.append(keyboardWrapper);

  const info = document.createElement('div');
  info.classList.add('info');
  main.append(info);

  pageContainer.append(main);

  const footer = document.createElement('footer');
  pageContainer.append(footer);

  document.body.append(pageContainer);
}
