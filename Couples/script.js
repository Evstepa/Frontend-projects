(() => {
  let countCard = 0;
  let masPaer = [];//числа, записанные на кнопках
  let masOpenPaer = []; // состояния кнопок: 0-закрыта, 1-открыта, 2-зафиксирована
  let masCard = [];//кнопки
  // очистка массива
  function clearMas(array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = 0;
    }
    return array;
  }
  // перемешивание массива
  function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  //Создание и заполнение массивов чисел, состояний кнопок и кнопок
  function createMas(countEl) {
    masPaer = [];
    masOpenPaer = [];
    masCard = [];
    //Создание и заполнение массивов чисел
    for (let i = 0; i < countEl * countEl / 2; i++) {
      masPaer.push(i + 1);
      masPaer.push(i + 1);
    }
    masPaer = shuffle(masPaer);

    // создание кнопок и состояний кнопок
    for (let i = 0; i < countEl * countEl; i++) {
      let cardBlock = document.createElement('button');
      cardBlock.classList.add('btn', 'btn-outline-info', 'btn-lg', 'm-1', 'mybtn');
      cardBlock.setAttribute('id', i);
      cardBlock.textContent = ' * ';
      masCard.push(cardBlock);
      masOpenPaer.push(0);
    }
  }

// создание формы для определения количества кнопок
  function createFormCount() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Количество карточек (2, 4, 6, 8, 10)';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Создать игровое поле';
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // выстраивание кнопок по рядам
  function createGameField(elementWrapper) {
    for (let i = 0; i < countCard; i++) {
      row = document.createElement('div');
      row.classList.add('col-12', 'text-center', 'btn-row');
      for (let j = 0; j < countCard; j++) {
        row.append(masCard[i * countCard + j]);
      }
      elementWrapper.append(row);
    }
  }

//кнопка "Сыграть ещё раз"
  const BTN_AGAIN = document.createElement('button');
  BTN_AGAIN.classList.add('btn', 'btn-success', 'btn-lg', 'col-6', 'mt-5');
  BTN_AGAIN.textContent = 'Сыграть ещё раз';
  BTN_AGAIN.classList.add('mybtn-none');

// проверка на количество кнопок с заданным состоянием
  function checkOpenCard(array, num) {
    let count = 0;
    for (let i of array) { if (i === num) count++; }
    return count;
  }
// поиск первой открытой кнопки
  function findFirstOpenCard(array) {
    let id1 = 0;
    while (array[id1] !== 1) id1++;
    return id1;
  }
// посик второй открытой кнопки
  function findLastOpenCard(array) {
    let id2 = array.length - 1;
    while (array[id2] !== 1) id2--;
    return id2;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const FORM_BOX = document.getElementById('form');
    const FORM_COUNT = createFormCount();
    let row = document.createElement('div');
    row.classList.add('col-12', 'text-center');
    row.append(FORM_COUNT.form);
    FORM_BOX.append(row);
    FORM_COUNT.input.value = '';
    countCard = 0;
    FORM_COUNT.input.focus();

    const REPLAY_BOX = document.getElementById('replay');
    row = document.createElement('div');
    row.classList.add('col-12', 'text-center');
    row.append(BTN_AGAIN);
    REPLAY_BOX.append(row);

    const DIV_ELEMENT = document.getElementById('app');

    FORM_COUNT.input.addEventListener('input', function() {
      countCard = 0;
      if (FORM_COUNT.input.value) {
        FORM_COUNT.button.disabled = false;
      }else {
        FORM_COUNT.button.disabled = true;
      }
    })

    FORM_COUNT.form.addEventListener('submit', function(e) {
      countCard = 0;
      e.preventDefault();
      let currentCount = parseInt(FORM_COUNT.input.value);
      if (currentCount !== 2 && currentCount !== 4 && currentCount !== 6 && currentCount !== 8 && currentCount !== 10) {
        FORM_COUNT.input.value = 4;
        countCard = 4;
      }else {
        countCard = currentCount;
      }

      FORM_COUNT.input.disabled = true;
      FORM_COUNT.button.disabled = true;

      createMas(countCard);
      createGameField(DIV_ELEMENT);

      for (let i in masCard) {//нажатие на кнопку
        masCard[i].addEventListener('click', () => {
          let btnAtrtr = masCard[i].id;
          let btnText = masCard[i].textContent;
          if(btnText === ' * ') {
            masCard[i].textContent = masPaer[btnAtrtr];
            masOpenPaer[i] = 1;
          }
          else {
            masCard[i].textContent = ' * ';
            masOpenPaer[i] = 0;
          }
          if (checkOpenCard(masOpenPaer, 1) === 2) {
            let card1 = findFirstOpenCard(masOpenPaer);
            let card2 = findLastOpenCard(masOpenPaer);
            if (masPaer[card1] === masPaer[card2]) {
              masCard[card1].classList.add('disabled');
              masOpenPaer[card1] = 2;
              masCard[card2].classList.add('disabled');
              masOpenPaer[card2] = 2;
            }else {
              setTimeout(() => {
                masCard[card1].textContent = ' * ';
                masOpenPaer[card1] = 0;
                masCard[card2].textContent = ' * ';
                masOpenPaer[card2] = 0;
              }, 500)
            }
          }

          // проверка на окончание игры
          if (checkOpenCard(masOpenPaer, 2) === countCard * countCard) {
            BTN_AGAIN.classList.remove('mybtn-none');
          }
        })
      }

      BTN_AGAIN.addEventListener('click', () => {
        BTN_AGAIN.classList.add('mybtn-none');
        masOpenPaer = clearMas(masOpenPaer);
        masPaer = clearMas(masPaer);
        document.querySelectorAll('.btn-row').forEach(elem => elem.remove());
        masCard = [];
        countCard = 0;
        FORM_COUNT.input.value = '';
        FORM_COUNT.input.disabled = false;
        FORM_COUNT.input.focus();
      })
    })


  });
})();
