export default class VideoPlayer {
  constructor(triggers, overlay) {
    // Кнопки открытия модального окна с видео
    this.triggers = document.querySelectorAll(triggers);
    // Модальное окно, в котором будет плеер (видео)
    this.overlay = document.querySelector(overlay);
    // Привязываем жестко контекст  вызова
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  // 2. Создание плеера на странице
  createPlayer(url) {
    // класс YT.Player подгрузится на страницу асинхронно (код в п.1)
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      // url для видео
      videoId: `${url}`,
      // Свойство для отслеживания событий с видео
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });

    this.overlay.style.display = 'flex';
  }

  // 7 Срабатывает, когда изменяется состояние нашего плеера
  onPlayerStateChange(state) {
    try {
      // После просмотра видео нам должно открыться нижнее видео, которое находится после него. Пока мы не просмотрели верхнее - нижнее включить мы не можем.

      // Получаем блокированное видео, которое находтся сразу после текущего видео. Находим его при помощи кнопки видеоплеера, который находится перед блокированным плеером.
      const blockedElem = this.activeBtn.closest(
        '.module__video-item'
      ).nextElementSibling;

      // Получаем svg-иконку открытого видео, что бы потом эту иконку поменять в блокированном видео, где svg-иконка с замком
      // Копируем ее
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

      // Проверяем, просмотрел ли пользователь открытое видео, которое находится перед закрытым
      if (state.data === 0) {
        if (
          // Проверяем, заблокирован ли второй плеер с видео
          blockedElem
            .querySelector('.play__circle')
            .classList.contains('closed')
        ) {
          // Убираем блокировку плеера
          blockedElem.querySelector('.play__circle').classList.remove('closed');
          // Удаляем svg иконку блокировки
          blockedElem.querySelector('svg').remove();
          // Добавляем svg иконку разблокировки
          blockedElem.querySelector('.play__circle').append(playBtn);
          // Меняем текст и стили текста
          blockedElem.querySelector('.play__text').textContent = 'play video';
          blockedElem
            .querySelector('.play__text')
            .classList.remove('.attention');
          blockedElem.style.opacity = '1';
          blockedElem.style.filter = 'none';

          // Включаем взаимодействие
          blockedElem.setAttribute('data-disabled', 'false');
        }
      }
    } catch (e) {}
  }

  // 3. Кнопка открытия оверлея и создания плеера
  bindTriggers() {
    this.triggers.forEach((btn, i) => {
      try {
        // Получаем блокированное видео, которое находтся сразу после текущего видео. Находим его при помощи кнопки видеоплеера, который находится перед блокированным плеером.
        const blockedElem = btn.closest(
          '.module__video-item'
        ).nextElementSibling;

        // Каждое второе видео (а это у нас заблокированные видео) отключаем взаимодействие с ним
        if (i % 2 == 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}

      btn.addEventListener('click', () => {
        if (
          !btn.closest('.module__video-item') ||
          btn.closest('.module__video-item').getAttribute('data-disabled') !==
            'true'
        ) {
          // Определяем нажатую кнопку
          this.activeBtn = btn;
          // ВНИМАНИЕ! При клике на эту кнопку каждый раз создается новый плеер, а нам такое поведение не нужно! Нам нужно что бы он создался 1 раз при первом клике. Поэтому делаем проверку
          // Если плеер уже создан - открываем модальное окно с ним, а не создаем при клике на кнопку новый экземпляр плеера
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';

            // Тыкнул ли пользователь в другую кнопку... Если пользователь нажал на одну кнопку с видео, а потом на другую - мы должны показать ему другое видео, так как каждая кнопка включает разное видео
            if (this.patn !== btn.getAttribute('data-url')) {
              this.patn = btn.getAttribute('data-url');
              this.player.loadVideoById({ videoId: this.patn });
            }
          } else {
            // Получаем url (url лежит в кнопке)
            this.patn = btn.getAttribute('data-url');
            // 4. Вызываем метод createPlayer (создание плеера) и передаем в него url видео из кнопки
            this.createPlayer(this.patn);
          }
        }
      });
    });
  }

  // 5. Закрытие overlay
  closeOverlay() {
    this.overlay.addEventListener('click', (evt) => {
      if (evt.target === this.overlay || evt.target.className === 'close') {
        this.overlay.style.display = 'none';
        // При закрытии оверлея останавливаем видео
        this.player.stopVideo();
      }
    });
  }

  // 1. Инициализация всего функционала
  init() {
    if (this.triggers.length > 0) {
      // Этот код асинхронно загружает код API IFrame Player (Код взят с сайта Youtube Player API)
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 6. Передаем методы с триггерами
      this.bindTriggers();
      this.closeOverlay();
    }
  }
}
