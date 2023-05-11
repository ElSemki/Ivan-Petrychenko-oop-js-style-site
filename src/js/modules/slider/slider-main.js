import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(btns) {
    // Получаем доступ (наследуем) к свойству btns класса (прототипа) Slider
    super(btns);
  }

  // Методы исключительно для класса главного слайдера
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    // Если есть какой-то код, который находится не везде, но он есть в определенном месте - поместим его в try{} catch(e){}
    // Блок hanson есть только на 1 слайде. Что бы не было ошибок на других - мы поместили его в try catch
    // И этот скрипт запустится только тогда, когда мы скажем
    try {
      this.hanson.style.opacity = 0;
      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = 1;
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}

    this.slides.forEach((slide) => {
      slide.classList.add('animated');
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        evt.preventDefault();

        this.plusSlides(1);
        this.slides[this.slideIndex - 1].classList.add('slideInDown');
        this.slides[this.slideIndex - 1].classList.remove(
          'slideInUp',
          'slideInLeft',
          'slideInRight'
        );
      });

      btn.parentNode.previousElementSibling.addEventListener('click', (evt) => {
        evt.preventDefault();

        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
        this.slides[this.slideIndex - 1].classList.add('slideInUp');
        this.slides[this.slideIndex - 1].classList.remove(
          'slideInDown',
          'slideInLeft',
          'slideInRight'
        );
      });
    });

    this.prevModule.forEach((item) => {
      item.addEventListener('click', (evt) => {
        // Всплытие событий
        evt.stopPropagation();
        evt.preventDefault();
        this.plusSlides(-1);
        this.slides[this.slideIndex - 1].classList.add('slideInRight');
        this.slides[this.slideIndex - 1].classList.remove(
          'slideInLeft',
          'slideInDown',
          'slideInUp'
        );
      });
    });

    this.nextModule.forEach((item) => {
      item.addEventListener('click', (evt) => {
        // Отмена всплытия событий, так как при нажатии кнопки (стрелка вправо) срабатывает событие на кнопке next (стрелка вниз)
        evt.stopPropagation();
        evt.preventDefault();
        this.plusSlides(1);
        this.slides[this.slideIndex - 1].classList.add('slideInLeft');
        this.slides[this.slideIndex - 1].classList.remove(
          'slideInRight',
          'slideInDown',
          'slideInUp'
        );
      });
    });
  }

  render() {
    if (this.container) {
      // Если есть какой-то код, который находится не везде, но он есть в определенном месте - поместим его в try{} catch(e){}
      // Блок hanson есть только на 1 слайде. Что бы не было ошибок на других - мы поместили его в try catch
      // И этот скрипт запустится только тогда, когда мы скажем
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}

      this.showSlides(this.slideIndex);

      this.bindTriggers();
    }
  }
}
