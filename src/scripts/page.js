const notes = ['This keyboard is based on the MacOS.',
  'Left Control + Left Option (Alt) is hotkey to switch a language.',
  'Left Command (Win) + Left Option (Alt) is hotkey to switch the keyboard theme.'];

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
  const paragraphs = notes.map((note) => {
    const p = document.createElement('p');
    p.textContent = note;
    return p;
  });
  info.append(...paragraphs);
  main.append(info);

  pageContainer.append(main);

  const footer = document.createElement('footer');
  pageContainer.append(footer);

  document.body.append(pageContainer);
}
