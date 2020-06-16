'use strict';

(function () {
  var GENERAL_PIN_OFFSET_Y = 22;
  var KEY_ENTER = 'Enter';
  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;
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

  var getCoordinatesMainPin = function () {
    return {
      x: parseInt(mainPin.style.left, 10) + Math.ceil(mainPin.offsetWidth / 2),
      y: parseInt(mainPin.style.top, 10) + mainPin.offsetHeight + GENERAL_PIN_OFFSET_Y
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
    window.form.setAddress(coordinates);
    window.map.activate(data);
    window.form.activate();
    moveMainPin();
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  var coordinates = getCentralCoordinatesMainPin();
  window.form.setAddress(coordinates);
  window.form.disable();
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinEnterPress);

  // ТУТ НАРАБОТКИ ДЛЯ ВТОРОЙ ЧАСТи ДЗ move mainPin

  var moveMainPin = function () {
    var mapPins = document.querySelector('.map__pins');
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var mainPinMoveLimits = {
        top: MIN_VALUE_Y - mainPin.offsetHeight - GENERAL_PIN_OFFSET_Y,
        bottom: MAX_VALUE_Y - mainPin.offsetHeight - GENERAL_PIN_OFFSET_Y,
        left: mapPins.offsetLeft - Math.ceil(mainPin.offsetWidth / 2),
        right: mapPins.offsetWidth - Math.ceil(mainPin.offsetWidth / 2)
      };

      var startPosition = {
        x: evt.clientX,
        y: evt.clientY
      };

      var renderMainPin = function (position) {
        mainPin.style.top = position.y + 'px';
        mainPin.style.left = position.x + 'px';
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

        var pinPosition = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };

        if (pinPosition.x < mainPinMoveLimits.left) {
          pinPosition.x = mainPinMoveLimits.left;
        } else if (pinPosition.x > mainPinMoveLimits.right) {
          pinPosition.x = mainPinMoveLimits.right;
        }

        if (pinPosition.y < mainPinMoveLimits.top) {
          pinPosition.y = mainPinMoveLimits.top;
        } else if (pinPosition.y > mainPinMoveLimits.bottom) {
          pinPosition.y = mainPinMoveLimits.bottom;
        }

        renderMainPin(pinPosition);
        window.form.setAddress(getCoordinatesMainPin());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
