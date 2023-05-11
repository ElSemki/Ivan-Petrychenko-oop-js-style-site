export default class Difference {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (e) {}
  }

  bindTriggers(container, counter, items) {
    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = 'flex';
        counter++;
      } else {
        items[counter].style.display = 'flex';
        items[items.length - 1].remove();
      }
    });
  }

  hideItems(items, animation) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.classList.add('animated', animation);
        item.style.display = 'none';
      }
    });
  }

  init() {
    try {
      this.hideItems(this.oldItems, 'slideInLeft');
      this.hideItems(this.newItems, 'slideInRight');
      this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
      this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
    } catch (e) {}
  }
}
