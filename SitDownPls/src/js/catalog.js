// слайдер catalog
if(document.querySelector('.swiper.catalog__swiper')) {
  const swiperCatalog = new Swiper('.swiper.catalog__swiper', {
    direction: 'horizontal',
    loop: false,
    pagination: {
      el: '.content__pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    grid: {
      fill: 'row',
      rows: 3,
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 3,
        },
      },
      640: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
        grid: {
          fill: 'row',
          rows: 3,
        },
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
        grid: {
          fill: 'row',
          rows: 3,
        },
      },
    }
  });
}

//выпадающие списки
if(document.querySelector('.filter__dropdown')) {
  const filters = document.querySelectorAll('.filter__title-small');
  const dropdowns = document.querySelectorAll('.filter__dropdown');
  const activeClassDropdowns = 'filter__dropdown-active';
  const activeClassFilters = 'filter__title-active';

  filters.forEach(item => {
    item.addEventListener('click', function() {
      let DropThis = this.parentElement.querySelector('.filter__dropdown');
      dropdowns.forEach(el => {
        if (el != DropThis) {
          el.classList.remove(activeClassDropdowns)
        }
      });
      filters.forEach(el => {
        if (el != this) {
          el.classList.remove(activeClassFilters)
        }
      });
      DropThis.classList.toggle(activeClassDropdowns);
      this.classList.toggle(activeClassFilters);
    });
  });
}

//ползунок цен
const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});
