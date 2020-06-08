'use strict';
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var NUMBER_OF_PINS = 8;
var MIN_VALUE_X = 25;
var MIN_VALUE_Y = 130;
var MAX_VALUE_Y = 630;
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var cardTemlpate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var mapPins = document.querySelector('.map__pins');
var mapFilterContainer = document.querySelector('.map__filters-container');

var getDeclOfNum = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var getAvatarImgPrefixes = function () {
  var pefixes = [];
  for (var i = 1; i <= NUMBER_OF_PINS; i++) {
    pefixes.push(i);
  }
  return getShuffleArray(pefixes);
};

var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  pinElement.style = 'left:' + (pin.location.x + PIN_OFFSET_X) + 'px; ' + 'top:' + (pin.location.y + PIN_OFFSET_Y) + 'px;';
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  return pinElement;
};

var createPins = function (data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });
  return fragment;
};

var renderPins = function (pins) {
  mapPins.appendChild(pins);
};

var activateMap = function () {
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

var getDemoData = function () {
  var data = [];
  var avatarImgPrefixes = getAvatarImgPrefixes();

  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    var item = {
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
};

var getApartamentType = function (type) {
  var apartmentTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  return apartmentTypes[type] ? apartmentTypes[type] : 'неизвестный тип';
};

var fillFeatureList = function (currentFeatures, allFeaturesList) {
  for (var i = 0; i < allFeaturesList.length; i++) {
    var current = allFeaturesList[i].getAttribute('class').split('--')[1];
    allFeaturesList[i].style = currentFeatures.indexOf(current) >= 0 ? 'display: block' : 'display: none';
  }
};

var getPhotoList = function (photos) {
  var content = document.createDocumentFragment();
  if (photos.length > 0) {
    var imgPlace = cardTemlpate.querySelector('.popup__photo');
    photos.forEach(function (photo) {
      var imgItem = imgPlace.cloneNode(true);
      imgItem.src = photo;
      content.appendChild(imgItem);
    });
  }
  return content;
};

var createCard = function (dataCard) {
  var fragment = document.createDocumentFragment();
  var card = cardTemlpate.cloneNode(true);
  card.querySelector('.popup__avatar').src = dataCard.author.avatar;
  card.querySelector('.popup__title').textContent = dataCard.offer.title;
  card.querySelector('.popup__text--address').textContent = dataCard.offer.address;
  card.querySelector('.popup__text--price').textContent = dataCard.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = getApartamentType(dataCard.offer.type);
  card.querySelector('.popup__text--capacity').textContent = dataCard.offer.rooms
    + ' '
    + getDeclOfNum(dataCard.offer.rooms, ['комната', 'комнаты', 'комнат'])
    + ' для '
    + dataCard.offer.guests
    + ' '
    + getDeclOfNum(dataCard.offer.guests, ['гостя', 'гостей', 'гостей']);
  card.querySelector('.popup__text--time').textContent = 'заезд после ' + dataCard.offer.checkin + ', выезд до ' + dataCard.offer.checkout;
  fillFeatureList(dataCard.offer.features, card.querySelectorAll('.popup__features li'));
  card.querySelector('.popup__description').textContent = dataCard.offer.description;
  card.querySelector('.popup__photo').replaceWith(getPhotoList(dataCard.offer.photos));
  fragment.appendChild(card);
  return fragment;
};

var renderCard = function (card) {
  mapFilterContainer.before(card);
};

var data = getDemoData();
var pins = createPins(data);
var card = createCard(data[0]);
activateMap();
renderPins(pins);
renderCard(card);
