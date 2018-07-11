import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  new App(<HTMLElement>document.body.querySelector('[data-app]'));
});
