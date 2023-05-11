import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, prev, next, activeClass, animate, autoplay) {
    // Получаем доступ (наследуем) к свойству container, prev, next, activeClass, animate, autoplay класса (прототипа) Slider
    super(container, prev, next, activeClass, animate, autoplay);
    this.autoPlaySlider;
  }

  // Декор слайдов
  decorizeSlides() {
    this.slides.forEach((slide) => {
      // По умолчанию убираем у всех слайдов активный класс
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        // Если слайдеру передан параметр animate - true, у всех кроме текущего слайда сделаем title и декоративную стрелку на слайде более прозрачную при каждой смене слайда (при нажатии на кнопку)
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    // Если это слайдер где в одном контейнере со слайдами находятся кнопки, мы даем класс только слайдам!
    // Если наш активный слайд не является кнопкой - даем ему активный класс. Если это кнопка - не даем
    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      // Если слайдеру передан параметр animate - true, то у текущего слайда на слайде делаем более яркий title и и более яркую декоративную стрелку при каждой смене слайда (при нажатии на кнопку)
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  // Пролистывание слайдов вперед
  nextSlide() {
    // Если мы взаимодействуем со слайдером, где помимо слайдов в контейнере со слайдами есть кнопки - то мы текущий слайд помещаем в конец ПЕРЕД КНОПКАМИ (кнопки в слайдере последние элементы, слайды находятся перед кнопками). Если это слайдер где только слайды - просто первый слайд помещаем в конец слайдов.
    if (this.container.closest('.feed__slider')) {
      this.container.insertBefore(
        this.slides[0],
        this.slides[this.slides.length - 2]
      );
      this.decorizeSlides();
    } else {
      this.container.append(this.slides[0]);
      this.decorizeSlides();
    }
  }

  // Функционал кнопок
  bindTriggers() {
    this.prev.addEventListener('click', () => {
      // Так как у нас кнопки в одном контейнере со слайдером - будем переберать элементы и находить кнопки.
      // Это обратный цикл
      for (let i = this.slides.length - 1; i > 0; i--) {
        // Если у нас текущий элемент это не кнопка - используем его в цикле.
        if (this.slides[i].tagName !== 'BUTTON') {
          // Когда мы переключаем назад, наш последний слайд будет перемещаться в начало слайдера перед первым НО! В конец цикла ПЕРЕД последними двумя элементами, то есть кнопками. КНОПКИ ОСТАЮТСЯ В КОНЦЕ И НЕ ПЕРЕБИРАЮТСЯ.
          this.container.insertBefore(this.slides[i], this.slides[0]);
          // // Декор слайдов при переключении
          this.decorizeSlides();
          break;
        }
      }
    });

    this.next.addEventListener('click', () => this.nextSlide());
  }

  // Автопролистывание слайдов
  activateAnimation() {
    this.autoPlaySlider = setInterval(() => this.nextSlide(), 5000);
  }

  // Главный функционал
  init() {
    try {
      // Контейнеру слайдов даем стили. Все мини слайдеры сделаны по одному типу, слайды идут в линию друг за другом.
      this.container.style.cssText = `
     display: flex;
     flex-wrap: wrap;
     overflow: hidden;
     align-items: flex-start;
   `;

      // Если в параметр слайда передан autoplay - true - запускаем автопролистывание слайдов
      if (this.autoplay) {
        this.activateAnimation();

        this.slides[0].parentNode.addEventListener('mouseenter', () => {
          clearInterval(this.autoPlaySlider);
        });

        this.slides[0].parentNode.addEventListener('mouseleave', () => {
          this.activateAnimation();
        });

        this.next.parentNode.addEventListener('mouseenter', () => {
          clearInterval(this.autoPlaySlider);
        });

        this.next.parentNode.addEventListener('mouseleave', () => {
          this.activateAnimation();
        });
      }

      this.bindTriggers();
      // Вызываем decorizeSlides для инициализации текущего слайда (декор)
      this.decorizeSlides();
    } catch (e) {}
  }
}
