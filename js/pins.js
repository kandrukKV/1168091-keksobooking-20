'use strict';

(function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var createPin = function (dataPin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.setAttribute('data-card', dataPin.id);
    pinElement.style = 'left:' + (dataPin.location.x + PIN_OFFSET_X) + 'px; ' + 'top:' + (dataPin.location.y + PIN_OFFSET_Y) + 'px;';
    pinImg.src = dataPin.author.avatar;
    pinImg.alt = dataPin.offer.title;
    return pinElement;
  };

  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      fragment.appendChild(createPin(item));
    });
    return fragment;
  };

  var renderPins = function (data, mapPins) {
    var pins = createPins(data);
    mapPins.appendChild(pins);
  };

  window.pins = {
    render: renderPins
  };
})();
