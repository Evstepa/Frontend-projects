function checkData(mas) {
  let checked = true;
  let err = document.querySelectorAll('.js-validate-error-label');
  checked = err.length === 0;
  if(checked) {
    mas.forEach(item => {
      checked = checked && item[1] != '';
    });
  };
  // console.log(checked);
  return checked;
}
function serializeForm(formNode) {
  return new FormData(formNode);//получаем все данные из полей формы
}
function showThanks(event, id) {
  /* модальное окно */
  const modal = document.getElementById(id);
  const btnClose = document.querySelector('.modal__close');
  modal.classList.add('modal--isopen');
  document.body.classList.add('stop-scroll');

  btnClose.addEventListener('click', function() {
    event.target.reset();
    modal.classList.remove('modal--isopen');
    document.body.classList.remove('stop-scroll');
    location.reload();
  });
  window.onclick = function() {
    modal.classList.remove('modal--isopen');
    document.body.classList.remove('stop-scroll');
    event.target.reset();
    location.reload();
  };
}
//отправка формы на главной странице
if(document.getElementById('formSend')) {
  // async function sendData(data) {
  //   return await fetch('/api/apply/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     body: data,
  //   });
  // }
  function handleFormSubmit(event) {
    event.preventDefault();
    const data = serializeForm(formSubmit);
    // console.log(Array.from(data.entries()));
    const status = checkData(Array.from(data.entries()));
    console.log(status);
    // const { status } = await sendData(data);

    if (status) {
      showThanks(event, 'modal-1');
    }else return;
  }
  const formSubmit = document.getElementById('formSend');
  formSubmit.addEventListener('submit', handleFormSubmit, false);
}

//отправка формы Купить в один клик
if(document.getElementById('oneClick')) {
  const btnClick = document.getElementById('oneClick');
  btnClick.addEventListener('click', () => {
    const modal0 = document.getElementById('modal-0');
    const btnClose = modal0.querySelector('.modal__close');
    modal0.classList.add('modal--isopen');
    document.body.classList.add('stop-scroll');

    btnClose.addEventListener('click', function() {
      modal0.classList.remove('modal--isopen');
      document.body.classList.remove('stop-scroll');
    });

    const formSubmit = document.getElementById('formSend0');
    formSubmit.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = serializeForm(formSubmit);
      const status = checkData(Array.from(data.entries()));
      console.log(status);

      if (status) {
        modal0.classList.remove('modal--isopen');
        /* модальное окно */
        showThanks(event, 'modal-1');
        event.preventDefault();

        // const modal = document.getElementById('modal-1');
        // const btnClose = modal.querySelector('.modal__close');
        // modal0.classList.remove('modal--isopen');
        // modal.classList.add('modal--isopen');
        // document.body.classList.add('stop-scroll');

        // btnClose.addEventListener('click', function() {
        //   event.target.reset();
        //   modal.classList.remove('modal--isopen');
        //   document.body.classList.remove('stop-scroll');
        //   location.reload();
        // });
        // window.onclick = function() {
        //   modal.classList.remove('modal--isopen');
        //   document.body.classList.remove('stop-scroll');
        //   event.target.reset();
        //   location.reload();
        // };
      }else return;
     });
  });
}

// валидация ???
if(document.querySelector('.product-card__form')) {
  // маска
  const form = document.querySelector('.product-card__form');
  if(form.querySelector('input[type="tel"]')) {
    const selector = form.querySelector('input[type="tel"]');
    console.log(selector);
    let im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector);
    new JustValidate('.product-card__form', {
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxlength: 30,
          customRegexp: /^[a-zA-Zа-яА-Я]+$/,
        },
        tel: {
          required: true,
          function: (name, value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Number(phone) && phone.length === 10
          },
        },
      },
      messages: {
        name: {
          required: 'Вы не ввели имя',
          minLength: 'В имени должно быть не меньше 2 букв',
          maxlength: 'В имени не должно быть больше 30 букв',
          customRegexp: 'Недопустимый формат',
        },
        tel: {
          required: 'Вы не ввели телефон',
        },
      },
    });
  }
}

// слайдер в модальном окне
if(document.querySelector('.modal__swiper')) {
  const modalSwiper = new Swiper('.modal__swiper-small', {
    direction: 'horizontal',
    spaceBetween: 38,
    slidesPerView: 4,
    slidesPerGroup: 1,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next.modal__swiper-btn',
      prevEl: '.swiper-button-prev.modal__swiper-btn',
    },
    breakpoints: {
      320: {
        spaceBetween: 38,
        slidesPerView: 1,
      },
      640: {
        spaceBetween: 10,
        slidesPerView: 2,
      },
      960: {
        spaceBetween: 38,
        slidesPerView: 3,
      },
      1280: {
        spaceBetween: 38,
        slidesPerView: 4,
      },
    }
  });
  const modalSwiper2 = new Swiper('.modal__swiper-big', {
    direction: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 38,
    thumbs: {
      swiper: modalSwiper,
    },
  });

  const swiperModal = document.querySelector('.modal__swiper');
  const img = Array.from(document.querySelectorAll('.swiper-img'));

  img.forEach(item => {
    item.addEventListener('click', () => {
      swiperModal.classList.add('modal--isopen');
      document.body.classList.add('stop-scroll');

      const btnSwiperModalClose = document.querySelector('.modal__swiper-close');
      btnSwiperModalClose.addEventListener('click', () => {
        swiperModal.classList.remove('modal--isopen');
        document.body.classList.remove('stop-scroll');
      });
    })
  })

}
