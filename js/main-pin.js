'use strict';

(function () {
  var ELEMENT_OFFSET_Y = 22;
  var MAIN_PIN_CENTRAL_COORDINATES = 'left: 570px; top: 375px;';
  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;
  var KEY_ENTER = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;
  var moveArea = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var areaMap = document.querySelector('.map');

  var getMainPinCoordinates = function () {
    var isCentral = areaMap.classList.contains('map--faded');
    var annex = isCentral ? Math.ceil(mainPin.offsetWidth / 2) : mainPin.offsetHeight + ELEMENT_OFFSET_Y;
    return {
      x: parseInt(mainPin.style.left, 10) + Math.ceil(mainPin.offsetWidth / 2),
      y: parseInt(mainPin.style.top, 10) + annex
    };
  };

  var mainPinSetToCenter = function () {
    mainPin.style = MAIN_PIN_CENTRAL_COORDINATES;
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    if (evt.button !== LEFT_MOUSE_BUTTON) {
      return;
    }

    var mainPinMoveLimits = {
      top: MIN_VALUE_Y - mainPin.offsetHeight - ELEMENT_OFFSET_Y,
      bottom: MAX_VALUE_Y - mainPin.offsetHeight - ELEMENT_OFFSET_Y,
      left: moveArea.offsetLeft - Math.ceil(mainPin.offsetWidth / 2),
      right: moveArea.offsetWidth - Math.ceil(mainPin.offsetWidth / 2)
    };

    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var moveMainPin = function (x, y) {
      mainPin.style.left = x + 'px';
      mainPin.style.top = y + 'px';
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (mainPinPosition.x < mainPinMoveLimits.left) {
        mainPinPosition.x = mainPinMoveLimits.left;
      } else if (mainPinPosition.x > mainPinMoveLimits.right) {
        mainPinPosition.x = mainPinMoveLimits.right;
      }

      if (mainPinPosition.y < mainPinMoveLimits.top) {
        mainPinPosition.y = mainPinMoveLimits.top;
      } else if (mainPinPosition.y > mainPinMoveLimits.bottom) {
        mainPinPosition.y = mainPinMoveLimits.bottom;
      }

      moveMainPin(mainPinPosition.x, mainPinPosition.y);
      window.form.setAddress(getMainPinCoordinates());
    };

    var onMouseUp = function () {
      window.page.activate();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);

  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === KEY_ENTER) {
      window.page.activate();
      mainPin.removeEventListener('keydown', onMainPinEnterPress);
    }
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinEnterPress);

  window.mainPin = {
    getCoordinates: getMainPinCoordinates,
    setToCenter: mainPinSetToCenter
  };

})();
