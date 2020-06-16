'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var mainPin = document.querySelector('.map__pin--main');
  var data = window.data;

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      activatePage();
    }
  };

  var onMainPinEnterPress = function (evt) {
    evt.preventDefault();
    if (evt.key === KEY_ENTER) {
      activatePage();
    }
  };

  var activatePage = function () {
    var coordinates = window.move.getCoordinatesElement(mainPin);
    window.form.setAddress(coordinates);
    window.map.activate(data);
    window.form.activate();
    window.move.activate(mainPin);
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  var coordinates = window.move.getCentralCoordinatesElement(mainPin);
  window.form.setAddress(coordinates);
  window.form.disable();
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinEnterPress);

})();
