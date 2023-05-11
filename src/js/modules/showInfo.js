export default class ShowInfo {
  constructor(triggers) {
    this.triggers = document.querySelectorAll(triggers);
  }

  bindTriggers() {
    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const message =
          trigger.closest('.module__info-show').nextElementSibling;
        message.classList.add('animated', 'fadeInDown');
        if (window.getComputedStyle(message).display === 'none') {
          message.style.display = 'block';
        } else {
          message.style.display = 'none';
        }
      });
    });
  }

  init() {
    this.bindTriggers();
  }
}
