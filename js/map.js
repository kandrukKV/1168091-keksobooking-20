'use strict';

window.map = (function () {
  var KEY_ESC = 'Escape';
  var areaMap = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');

  var getElementFromDataById = function (arr, id) {
    return arr.find(function (item) {
      return item.id === id;
    });
  };

  var renderCard = function (card) {
    removeCard();
    areaMap.insertBefore(card, mapFilterContainer);
    var btnPopupClose = document.querySelector('.map__card .popup__close');
    btnPopupClose.addEventListener('click', onBtnCloseCardClick);
    document.addEventListener('keydown', onBtnCloseCardPressEsc);
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', onBtnCloseCardPressEsc);
  };

  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      fragment.appendChild(window.pin.createPin(item));
    });
    return fragment;
  };

  var renderPins = function (pins) {
    mapPins.appendChild(pins);
  };

  var onBtnCloseCardClick = function (evt) {
    evt.preventDefault();
    removeCard();
  };

  var onBtnCloseCardPressEsc = function (evt) {
    if (evt.key === KEY_ESC) {
      evt.preventDefault();
      removeCard();
    }
  };

  return {
    activateMap: function (data) {
      var pins = createPins(data);
      areaMap.classList.remove('map--faded');
      renderPins(pins);
      mapPins.addEventListener('click', function (evt) {
        evt.preventDefault();
        var element = evt.target.closest('button[type=button]');
        if (element) {
          var card = window.card.createCard(getElementFromDataById(data, element.dataset.card));
          renderCard(card);
        }
      });
    }
  };
})();
