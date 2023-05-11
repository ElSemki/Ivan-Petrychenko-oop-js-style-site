export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.message = {
      loading: 'Идет загрузка...',
      success: 'Спасибо, мы скоро свяжемся с вами',
      failure: 'Что-то пошло не так!',
    };
    this.path = 'assets/question.php';
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      input.addEventListener('keypress', function (evt) {
        if (evt.key.match(/[^a-z 0-9 @ \. \- \_]/gi)) {
          evt.preventDefault();
        }
      });
    });
  }

  mask() {
    // Установка курсора
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    // .....

    // Создание маски
    function createMask(event) {
      let matrix = '+1 (___) ___-____';
      let i = 0;
      let def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    // .....

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  async postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    });
    return await res.text();
  }

  init() {
    this.checkMailInputs();
    this.mask();

    this.forms.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `;
        form.parentNode.append(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);

        this.postData(this.path, formData)
          .then((data) => {
            console.log(data);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            form.reset();
            setTimeout(() => {
              statusMessage.remove();
            }, 3000);
          });
      });
    });
  }
}
