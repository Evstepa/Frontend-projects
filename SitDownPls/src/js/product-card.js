// слайдер для товара
if(document.querySelector('.swiper-main.design__swiper-big') && document.querySelector('.swiper-main.design__swiper-small')) {
  const swiperProduct = new Swiper('.swiper-main.design__swiper-small', {
    direction: 'horizontal',
    spaceBetween: 38,
    slidesPerView: 4,
    slidesPerGroup: 1,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        direction: 'horizontal',
        spaceBetween: 38,
        slidesPerView: 2,
      },
      640: {
        direction: 'vertical',
        slidesPerView: 4,
        spaceBetween: 10,
      },
      960: {
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1280: {
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 38,
      },
    }
  });
  const swiperProduct2 = new Swiper('.swiper.design__swiper-big', {
    spaceBetween: 38,
    thumbs: {
      swiper: swiperProduct,
    },
  });
}

// слайдер Похожие товары
if(document.querySelector('.swiper.similar__swiper')) {
  const swiperSimilar = new Swiper('.swiper.similar__swiper', {
    spaceBetween: 32,
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.swiper-button-next.similar__navigation-btn',
      prevEl: '.swiper-button-prev.similar__navigation-btn',
    },
    breakpoints: {
      320: {
        slidesPerView: 2.0,
        spaceBetween: 16,
      },
      640: {
        slidesPerView: 2.0,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 3.0,
        spaceBetween: 32,
      },
      1400: {
        slidesPerView: 4.0,
        spaceBetween: 32,
      },
    }
  });
}



