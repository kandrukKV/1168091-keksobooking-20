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

    window.data = data.map(function (item, i) {
      item.id = 'pin' + i;
      return item;
    });

    var filterData = window.filter.getData(window.data);

    window.pins.render(filterData);
    window.filter.activate();
    mapPins.addEventListener('click', function (evt) {
      evt.preventDefault();
      var element = evt.target.closest('button[type=button]');
      if (element) {
        window.card.render(getElementFromDataById(data, element.dataset.card));
      }
    });
  };

  var disableMap = function () {
    window.pins.remove();
    window.mainPin.setToCenter();
    window.filter.disable();
    areaMap.classList.add('map--faded');
  };

  window.map = {
    activate: activateMap,
    disable: disableMap
  };

})();
