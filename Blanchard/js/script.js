// слайдер hero с плавным растворением
const swiper_hero = new Swiper('.swiper-container.hero__swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 2000,
  autoplay: {
    delay: 2000,
  },
  effect: "fade",
  allowTouchMove: false,
});

// слайдер gallery
const swiper_gallery = new Swiper('.swiper-container.gallery__swiper', {
  direction: 'horizontal',
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    601: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  }
});

// слайдер events
const swiper_events = new Swiper('.swiper-container.events__swiper', {
  direction: 'horizontal',
  loop: false,
  spaceBetween: 50,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1.0,
      slidesPerGroup: 1,
    },
    721: {
      slidesPerView: 2.0,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    1023: {
      slidesPerView: 3.0,
      slidesPerGroup: 3,
      spaceBetween: 27,
    },
    1200: {
      slidesPerView: 3.0,
      slidesPerGroup: 3,
      spaceBetween: 40,
    },
    1460: {
      slidesPerView: 3.0,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  }
});

// слайдер projects
const swiper_projects = new Swiper('.swiper-container.projects__swiper', {
  direction: 'horizontal',
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },
    721: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    1000: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  }
});

// селекторы
const element = document.querySelector('.filter-choice');
const choices = new Choices(element, {
  placeholder: false,
  searchEnable: false,
  shouldSort: false,
  itemSelectText: "",
  selected: false,
});

// аккордеон
let accord = document.querySelectorAll('.catalog__btn');
accord.forEach(function(accord_btn) {
  accord_btn.addEventListener('click', function(e) {
    let self = e.currentTarget;
    let bottomEl = self.querySelector('.catalog__btn-descr');

    let tl = gsap.timeline({pause: true});

    tl.to(bottomEl, {
        duration: 0.7,
        opacity: 1
      });

    if(self.classList.contains('catalog__btn--isopen')) {
      self.classList.remove('catalog__btn--isopen');
      tl.reverse();
    }
    else {
      accord.forEach (function(btn) {
        btn.classList.remove('catalog__btn--isopen');
      });
      self.classList.add('catalog__btn--isopen');
      tl.play();
    };
  });
});

// табы
let tab = document.querySelectorAll('.catalog__item-btn');
tab.forEach(function(tabsBtn) {
  tabsBtn.addEventListener('click', function(e) {
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.catalog__item-btn').forEach (function(btn) {
      btn.classList.remove('catalog__item-btn--active');
    });
    e.currentTarget.classList.add('catalog__item-btn--active');
    document.querySelectorAll('.catalog__card').forEach(function(tabsBtn) {
      tabsBtn.classList.remove('catalog__card--isopen');
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__card--isopen');
    document.querySelector(`[data-target="${path}"]`).scrollIntoView(true);
  });
});

// маска
var selector = document.querySelector('input[type="tel"]');
var im = new Inputmask("+7 (999) 999-99-99");

im.mask(selector);

// валидация
new JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxlength: 30,
      customRegexp: /(?=.*[a-z])(?=.*[A-Z])(?=.*[А-Я])(?=.*[а-я])/,
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

//выпадающее меню
document.querySelectorAll(".dropdown__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
  /* чтобы изначально ползунок был виден ???*/
    autoHide: false,
  /* с помощью этого значения вы можете управлять высотой ползунка ???*/
    scrollbarMaxSize: 25,
  });
})

const btns = document.querySelectorAll(".header__menu-btn");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function() {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  })
})


// бургер
let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click',
  function() {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__nav--active');
    document.body.classList.toggle('stop-scroll');
  });

menuLinks.forEach(function(el) {
  el.addEventListener('click', function() {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__nav--active');
    document.body.classList.remove('stop-scroll');
  });
});

// поиск
let search_open = document.querySelector('.header__btn');
let search_win = document.querySelector('.header__search');
let search_close = document.querySelector('.header__form-close');

search_open.addEventListener('click', function() {
  search_win.classList.add('header__search-opened');
  search_close.classList.remove('btn-closed');
});

search_close.addEventListener('click', function() {
  search_win.classList.remove('header__search-opened');
  search_close.classList.add('btn-closed');
})

/* модальное окно */
var modal = document.getElementById('modal-2');
var btn = document.getElementById('btn-2');
var btnClose = document.querySelector('.gallery__modal-close');

btn.addEventListener('click', function() {
  modal.classList.add('modal--isopen');
  document.body.classList.add('stop-scroll');
})

btnClose.addEventListener('click', function() {
  modal.classList.remove('modal--isopen');
  document.body.classList.remove('stop-scroll');
})

// window.onclick = function(event) {
//   if (event.target == modal) {
//   modal.classList.remove('modal--isopen');
//   document.body.classList.remove('stop-scroll');
// }}


// maps
ymaps.ready(init);
function init(){
    // Создание карты.
  var myMap = new ymaps.Map('map', {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
    center: [55.758468, 37.601088],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
    zoom: 15,
    controls: [],
  });

  var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/marker.svg',
    iconImageSize: [20, 20],
  });

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
}
