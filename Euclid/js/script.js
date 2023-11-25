// слайдер
const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  // пагинация
  pagination: {
  el: '.swiper-pagination',
  type: 'bullets',
  clickable: true,
  },
//  autoplay: {
//    delay: 5000,
//  },
});

// табы
let tab = document.querySelectorAll('.how-work__btn');
tab.forEach(function(tabsBtn) {
  tabsBtn.addEventListener('click', function(e) {
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.how-work__btn').forEach (function(btn) {
      btn.classList.remove('how-work__btn--active');
    });
    e.currentTarget.classList.add('how-work__btn--active');
    document.querySelectorAll('.how-work__slade').forEach(function(tabsBtn) {
      tabsBtn.classList.remove('how-work__slade--active');
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('how-work__slade--active');
  });
});

// аккордеон
let accord = document.querySelectorAll('.faq__btn');
accord.forEach(function(accord_btn) {
  accord_btn.addEventListener('click', function(e) {
    if(e.currentTarget.classList.contains('faq__btn--active')) {
      e.currentTarget.classList.remove('faq__btn--active')
    }
    else {
      accord.forEach (function(btn) {
        btn.classList.remove('faq__btn--active');
      });
      e.currentTarget.classList.add('faq__btn--active');
    };
  });
});

// бургер
let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav__link');

console.log(burger.classList);
console.log(menu.classList);

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
  search_win.classList.add('header__search_opened');
});

search_close.addEventListener('click', function() {
  search_win.classList.remove('header__search_opened');
})

// hero__btn
//let hero_btn = document.querySelector('.hero__btn');
//hero_btn.addEventListener('click');
