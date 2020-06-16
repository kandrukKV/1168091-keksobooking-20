'use strict';

(function () {
  var ELEMENT_OFFSET_Y = 22;
  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;
  var moveArea = document.querySelector('.map__pins');

  var getCoordinatesElement = function (element) {
    return {
      x: parseInt(element.style.left, 10) + Math.ceil(element.offsetWidth / 2),
      y: parseInt(element.style.top, 10) + element.offsetHeight + ELEMENT_OFFSET_Y
    };
  };

  var getCentralCoordinatesElement = function (element) {
    return {
      x: parseInt(element.style.left, 10) + Math.ceil(element.offsetWidth / 2),
      y: parseInt(element.style.top, 10) + Math.ceil(element.offsetWidth / 2)
    };
  };

  var activate = function (element) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var elementMoveLimits = {
        top: MIN_VALUE_Y - element.offsetHeight - ELEMENT_OFFSET_Y,
        bottom: MAX_VALUE_Y - element.offsetHeight - ELEMENT_OFFSET_Y,
        left: moveArea.offsetLeft - Math.ceil(element.offsetWidth / 2),
        right: moveArea.offsetWidth - Math.ceil(element.offsetWidth / 2)
      };

      var startPosition = {
        x: evt.clientX,
        y: evt.clientY
      };

      var renderElement = function (position) {
        element.style.top = position.y + 'px';
        element.style.left = position.x + 'px';
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

        var elementPosition = {
          x: element.offsetLeft - shift.x,
          y: element.offsetTop - shift.y
        };

        if (elementPosition.x < elementMoveLimits.left) {
          elementPosition.x = elementMoveLimits.left;
        } else if (elementPosition.x > elementMoveLimits.right) {
          elementPosition.x = elementMoveLimits.right;
        }

        if (elementPosition.y < elementMoveLimits.top) {
          elementPosition.y = elementMoveLimits.top;
        } else if (elementPosition.y > elementMoveLimits.bottom) {
          elementPosition.y = elementMoveLimits.bottom;
        }

        renderElement(elementPosition);
        window.form.setAddress(getCoordinatesElement(element));
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

  window.move = {
    activate: activate,
    getCoordinatesElement: getCoordinatesElement,
    getCentralCoordinatesElement: getCentralCoordinatesElement
  };

})();
