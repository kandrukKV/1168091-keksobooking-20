'use strict';

(function () {
  var GENERAL_PIN_OFFSET_Y = 22;
  var KEY_ENTER = 'Enter';
  var mainPin = document.querySelector('.map__pin--main');
  var data = window.data;

  var onGeneralPinMouseDown = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      activatePage();
    }
  };

  var onGeneralPinEnterPress = function (evt) {
    evt.preventDefault();
    if (evt.key === KEY_ENTER) {
      activatePage();
    }
  };

  var getCoordinatesMainPin = function () {
    return {
      x: parseInt(mainPin.style.left, 10) + Math.ceil(mainPin.offsetWidth / 2),
      y: parseInt(mainPin.style.top, 10) + Math.ceil(mainPin.offsetWidth / 2) + GENERAL_PIN_OFFSET_Y
    };
  };

  var getCentralCoordinatesMainPin = function () {
    return {
      x: parseInt(mainPin.style.left, 10) + Math.ceil(mainPin.offsetWidth / 2),
      y: parseInt(mainPin.style.top, 10) + Math.ceil(mainPin.offsetWidth / 2)
    };
  };

  var activatePage = function () {
    var coordinates = getCoordinatesMainPin();
    window.form.setAddress(coordinates.x, coordinates.y);
    window.map.activateMap(data);
    window.form.activateAdForm();
    mainPin.removeEventListener('mousedown', onGeneralPinMouseDown);
    mainPin.removeEventListener('keydown', onGeneralPinEnterPress);
  };

  var coordinates = getCentralCoordinatesMainPin();
  window.form.setAddress(coordinates.x, coordinates.y);
  window.form.disableAdForm();
  mainPin.addEventListener('mousedown', onGeneralPinMouseDown);
  mainPin.addEventListener('keydown', onGeneralPinEnterPress);
})();
