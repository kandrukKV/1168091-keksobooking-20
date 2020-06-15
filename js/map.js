'use strict';

window.map = (function () {
  var areaMap = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var getElementFromDataById = function (arr, id) {
    return arr.find(function (item) {
      return item.id === id;
    });
  };

  return {
    activateMap: function (data) {
      areaMap.classList.remove('map--faded');
      window.pins.render(data, mapPins);
      mapPins.addEventListener('click', function (evt) {
        evt.preventDefault();
        var element = evt.target.closest('button[type=button]');
        if (element) {
          window.card.render(getElementFromDataById(data, element.dataset.card));
        }
      });
    }
  };
})();
