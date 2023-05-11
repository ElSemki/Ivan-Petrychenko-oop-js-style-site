export default class Slider {
  // Главный прототип слайдеров (все общее всех слайдов на проекте)
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    prevModule = null,
    nextModule = null,
    activeClass = '',
    animate = false,
    autoplay = false,
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.prevModule = document.querySelectorAll(prevModule);
    this.nextModule = document.querySelectorAll(nextModule);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
  // Методы у всех слайдеров будут разные, поэтому у всех классов слайдеров будут свои методы
}
