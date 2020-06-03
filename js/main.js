'use strict';

var createPins = function (arr) {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left:' + (arr[i].location.x + PIN_OFFSET_X) + 'px; ' + 'top:' + (arr[i].location.y + PIN_OFFSET_Y) + 'px;';
    pinElement.firstElementChild.src = arr[i].author.avatar;
    pinElement.firstElementChild.alt = arr[i].offer.title;
    fragment.appendChild(pinElement);
  }
  return fragment;
};

var renderPins = function (pins) {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(pins);
};

var mapActivate = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getArrayRandomLength = function (arr) {
  if (arr.length > 1) {
    var newArray = [];
    for (var i = 0; i < getRandomInteger(1, arr.length); i++) {
      newArray.push(arr[i]);
    }
    return newArray;
  }
  return arr;
};

var getRandomElementOfArray = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getDemoData = function () {
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var data = [];
  var mapPins = document.querySelector('.map__pins');

  for (var i = 1; i <= 8; i++) {
    var item = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'заголовок предложения ' + i,
        address: '600, 350',
        price: (i * 345) + ' $',
        type: getRandomElementOfArray(TYPES),
        rooms: getRandomInteger(1, 4),
        guests: getRandomInteger(1, 6),
        checkin: getRandomElementOfArray(TIMES),
        checkout: getRandomElementOfArray(TIMES),
        features: getArrayRandomLength(FEATURES),
        description: getRandomElementOfArray(TYPES),
        photos: getArrayRandomLength(PHOTOS)
      },
      location: {
        x: getRandomInteger(25, mapPins.offsetWidth - 25),
        y: getRandomInteger(130, 630)
      }
    };
    data.push(item);
  }
  return data;
};

var data = getDemoData();
var pins = createPins(data);
mapActivate();
renderPins(pins);
