'use strict';

window.pin = (function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  return {
    createPin: function (pin) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImg = pinElement.querySelector('img');
      pinElement.setAttribute('data-card', pin.id);
      pinElement.style = 'left:' + (pin.location.x + PIN_OFFSET_X) + 'px; ' + 'top:' + (pin.location.y + PIN_OFFSET_Y) + 'px;';
      pinImg.src = pin.author.avatar;
      pinImg.alt = pin.offer.title;
      return pinElement;
    }
  };
})();
