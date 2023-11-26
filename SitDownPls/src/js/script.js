// селекторы
if(document.querySelector('.js-choice.region__listbox')) {
  const elementRegion = document.querySelector('.js-choice.region__listbox');
  const choicesRegion = new Choices(elementRegion, {
    searchEnabled: false,
    placeholder: false,
    itemSelectText: '',
    shouldSort: false,
    selected: false,
  });
}

if(document.querySelector('.js-choice.category__listbox')) {
  const elementCategory = document.querySelector('.js-choice.category__listbox');
  const choicesCategory = new Choices(elementCategory, {
    searchEnabled: false,
    placeholder: false,
    itemSelectText: '',
    shouldSort: false,
    selected: false,
  });
}

if(document.querySelector('.swiper.banner__swiper')) {
  const swiperBanner = new Swiper('.swiper.banner__swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    pagination: {
      el: '.swiper-pagination.banner__pagination',
      type: 'bullets',
      clickable: true,
    },
  });
}

// popup
// tippy('#myPopup', {
//   content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.',
// });

// валидация
if(document.querySelector('.contacts__form')) {
  // маска
  if(document.querySelector('input[type="tel"]')) {
    const selector = document.querySelector('input[type="tel"]');
    let im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector);
  }
  new JustValidate('.contacts__form', {
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
      mail: {
        required: true,
        email: true,
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
      mail: {
        required: 'Вы не ввели e-mail',
        email: 'Введите корректный e-mail',
      },
    },
  });
}

// слайдер special
if(document.querySelector('.swiper-container.special__slider')) {
  const swiperSpecial = new Swiper('.swiper-container.special__slider', {
    direction: 'horizontal',
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1.0,
    slidesPerGroup: 1,
    spaceBetween: 32,
    breakpoints: {
      320: {
        slidesPerView: 1.0,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2.0,
        slidesPerGroup: 1,
      },
      1024: {
        slidesPerView: 3.0,
        slidesPerGroup: 1,
      },
      1280: {
        slidesPerView: 4.0,
        slidesPerGroup: 1,
      },
      1600: {
        slidesPerView: 'auto',
        // slidesPerView: 3,
        slidesPerGroup: 3,
      },
    }
  });
}

//смотреть больше товаров
if(document.querySelector('.high-rating__btn-more')) {
  const showMore = document.querySelector('.high-rating__btn-more');
  const cardList = Array.from(document.querySelector('.high-rating__list').children);
  const cardCount = cardList.length;
  let items = 0;
  let itemsInc = 0;
  let winWidth = document.documentElement.clientWidth;

  showMore.addEventListener('click', () => {
    if(!items) itemCalc();
    items += itemsInc;
    const visibleCards = cardList.slice(0, items);
    visibleCards.forEach(el => {
      if(el.classList.contains('item-unvisible'))
        el.classList.remove('item-unvisible');
    });
    if(visibleCards.length >= cardCount) {
      showMore.style.display = 'none';
    }

  });
  // window.addEventListener('DOMSubtreeModified', () => {
  //   location.reload();
  //   winReload();
  // });
  window.addEventListener('DOMContentLoaded', winReload);

  function winReload() {
    itemCalc();
    const visibleCards = cardList.slice(0, items);
    visibleCards.forEach(el => {
      if(el.classList.contains('item-unvisible'))
        el.classList.remove('item-unvisible');
    });
  };
  function itemCalc() {
    if(winWidth > 1600) {
      items = 8;
      itemsInc = 4;
    }
    else if(winWidth > 996) {
      items = 6;
      itemsInc = 3;
    }
    else if(winWidth > 300){
      items = 6;
      itemsInc = 2;
    };
  }
}

// бургер
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__mainnav');
const menuLinks = menu.querySelectorAll('.mainnav__link');
burger.addEventListener('click', function() {
  if(header.classList.contains('open')) {
    header.classList.remove('open');
    document.body.classList.remove('stop-scroll');
  } else {
    header.classList.add('open');
    document.body.classList.add('stop-scroll');
  }
  });
menuLinks.forEach(function(el) {
  el.addEventListener('click', function() {
    header.classList.remove('open');
    document.body.classList.remove('stop-scroll');
  });
});


