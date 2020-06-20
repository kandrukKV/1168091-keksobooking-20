'use strict';

(function () {
  var areaMap = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var getElementFromDataById = function (arr, id) {
    return arr.find(function (item) {
      return item.id === id;
    });
  };

  var activateMap = function (data) {
    areaMap.classList.remove('map--faded');
    var modifiedData = data.map(function (item, i) {
      item.id = 'pin' + i;
      return item;
    });
    window.pins.render(modifiedData, mapPins);
    mapPins.addEventListener('click', function (evt) {
      evt.preventDefault();
      var element = evt.target.closest('button[type=button]');
      if (element) {
        window.card.render(getElementFromDataById(data, element.dataset.card));
      }
    });
  };

  window.map = {
    activate: activateMap
  };

})();
