'use strict';

window.data = (function () {
  var NUMBER_OF_PINS = 8;
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_VALUE_X = 25;
  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var data = [];
  var mapPins = document.querySelector('.map__pins');

  var getAvatarImgPrefixes = function () {
    var pefixes = [];
    for (var i = 1; i <= NUMBER_OF_PINS; i++) {
      pefixes.push(i);
    }
    return getShuffleArray(pefixes);
  };

  var getShuffleArray = function (arr) {
    var copy = [];
    var n = arr.length;
    var i;

    while (n) {
      i = Math.floor(Math.random() * n--);
      copy.push(arr.splice(i, 1)[0]);
    }
    return copy;
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomElementOfArray = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
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

  var avatarImgPrefixes = getAvatarImgPrefixes();

  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    var item = {
      id: 'pin' + i,
      author: {
        avatar: 'img/avatars/user0' + avatarImgPrefixes[i] + '.png'
      },
      offer: {
        title: 'заголовок предложения ' + i,
        address: '600, 350',
        price: 345 + (i * 345),
        type: getRandomElementOfArray(TYPES),
        rooms: getRandomInteger(1, 4),
        guests: getRandomInteger(1, 6),
        checkin: getRandomElementOfArray(TIMES),
        checkout: getRandomElementOfArray(TIMES),
        features: getArrayRandomLength(FEATURES),
        description: 'описание объекта ' + i,
        photos: getArrayRandomLength(PHOTOS)
      },
      location: {
        x: getRandomInteger(MIN_VALUE_X, mapPins.offsetWidth - MIN_VALUE_X),
        y: getRandomInteger(MIN_VALUE_Y, MAX_VALUE_Y)
      }
    };
    data.push(item);
  }

  return data;
})();
