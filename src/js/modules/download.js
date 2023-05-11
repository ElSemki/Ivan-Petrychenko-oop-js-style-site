export default class Download {
  constructor(triggers) {
    this.triggers = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path) {
    const link = document.createElement('a');
    link.setAttribute('href', path);
    link.setAttribute('download', 'nice_picture');
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    document.body.remove(link);
  }

  init() {
    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        this.downloadItem(this.path);
      });
    });
  }
}
