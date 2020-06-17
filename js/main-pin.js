'use strict';

(function () {
  var ELEMENT_OFFSET_Y = 22;
  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;
  var moveArea = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin--main');
  var KEY_ENTER = 'Enter';

  var getMainPinCoordinates = function (isCentral) {
    isCentral = typeof isCentral !== 'undefined' ? isCentral : false;
    var annex = isCentral ? Math.ceil(pin.offsetWidth / 2) : pin.offsetHeight + ELEMENT_OFFSET_Y;
    return {
      x: parseInt(pin.style.left, 10) + Math.ceil(pin.offsetWidth / 2),
      y: parseInt(pin.style.top, 10) + annex
    };
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {

      var mainPinMoveLimits = {
        top: MIN_VALUE_Y - pin.offsetHeight - ELEMENT_OFFSET_Y,
        bottom: MAX_VALUE_Y - pin.offsetHeight - ELEMENT_OFFSET_Y,
        left: moveArea.offsetLeft - Math.ceil(pin.offsetWidth / 2),
        right: moveArea.offsetWidth - Math.ceil(pin.offsetWidth / 2)
      };

      var startPosition = {
        x: evt.clientX,
        y: evt.clientY
      };

      var moveMainPin = function (x, y) {
        pin.style.left = x + 'px';
        pin.style.top = y + 'px';
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startPosition.x - moveEvt.clientX,
          y: startPosition.y - moveEvt.clientY
        };

        startPosition = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mainPinPosition = {
          x: pin.offsetLeft - shift.x,
          y: pin.offsetTop - shift.y
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

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.page.activate();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      pin.removeEventListener('keydown', onMainPinEnterPress);
    }
  };

  var onMainPinEnterPress = function (evt) {
    evt.preventDefault();
    if (evt.key === KEY_ENTER) {
      window.page.activate();
      pin.removeEventListener('keydown', onMainPinEnterPress);
    }
  };

  pin.addEventListener('mousedown', onMainPinMouseDown);
  pin.addEventListener('keydown', onMainPinEnterPress);

  window.mainPin = {
    getCoordinates: getMainPinCoordinates,
  };

})();
