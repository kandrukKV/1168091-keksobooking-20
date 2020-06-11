'use strict';
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var GENERAL_PIN_OFFSET_Y = 22;
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


// service functions

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

var getDeclarationOfNum = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

// create demo data

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

var getAvatarImgPrefixes = function () {
  var pefixes = [];
  for (var i = 1; i <= NUMBER_OF_PINS; i++) {
    pefixes.push(i);
  }
  return getShuffleArray(pefixes);
};

// create card

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
    + getDeclarationOfNum(dataCard.offer.rooms, ['комната', 'комнаты', 'комнат'])
    + ' для '
    + dataCard.offer.guests
    + ' '
    + getDeclarationOfNum(dataCard.offer.guests, ['гостя', 'гостей', 'гостей']);
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


// create pins

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

// activate

var activateMap = function (data) {
  var pins = createPins(data);
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  renderPins(pins);
  var card = createCard(data[0]);
  renderCard(card);
};

// disabled/activate form ad

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');

var disableAdForm = function () {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach(function (adFormFieldset) {
    adFormFieldset.disabled = true;
  });
};

var activateAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = false;
  }
};

var onGeneralPinMouseDown = function (evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    activatePage();
  }
};

var onGeneralPinEnterPress = function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    activatePage();
  }
};

// set adress

var getCoordinatesGeneralPin = function () {
  return {
    x: parseInt(mapGeneralPin.style.left, 10) + Math.ceil(mapGeneralPin.offsetWidth / 2),
    y: parseInt(mapGeneralPin.style.top, 10) + Math.ceil(mapGeneralPin.offsetWidth / 2) + GENERAL_PIN_OFFSET_Y
  };
};

var getCentralCoordinatesGeneralPin = function () {
  return {
    x: parseInt(mapGeneralPin.style.left, 10) + Math.ceil(mapGeneralPin.offsetWidth / 2),
    y: parseInt(mapGeneralPin.style.top, 10) + Math.ceil(mapGeneralPin.offsetWidth / 2)
  };
};

var setAddress = function (x, y) {
  inputAddress.value = x + ', ' + y;
};

var activatePage = function () {
  var coordinates = getCoordinatesGeneralPin();
  setAddress(coordinates.x, coordinates.y);
  activateMap(data);
  activateAdForm();
  mapGeneralPin.removeEventListener('mousedown', onGeneralPinMouseDown);
  mapGeneralPin.removeEventListener('keydown', onGeneralPinEnterPress);
};

var init = function () {
  var coordinates = getCentralCoordinatesGeneralPin();
  setAddress(coordinates.x, coordinates.y);
  disableAdForm();
  mapGeneralPin.addEventListener('mousedown', onGeneralPinMouseDown);
  mapGeneralPin.addEventListener('keydown', onGeneralPinEnterPress);
};

// validation

var roomNumberSelect = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var isValidCapacity = function (valueOfRooms, valueOfCapacity) {
  if (valueOfRooms === '100' || valueOfCapacity === '0') {
    return valueOfRooms === '100' && valueOfCapacity === '0';
  }
  return parseInt(valueOfRooms, 10) >= parseInt(valueOfCapacity, 10);
};

roomNumberSelect.addEventListener('change', function () {
  var currentRoomNumber = roomNumberSelect.value;
  var currentCapacity = capacity.value;
  if (!isValidCapacity(currentRoomNumber, currentCapacity)) {
    roomNumberSelect.setCustomValidity('Количество комнат не соответствует количеству гостей');
  } else {
    roomNumberSelect.setCustomValidity('');
    capacity.setCustomValidity('');
  }
});

capacity.addEventListener('change', function () {
  var currentRoomNumber = roomNumberSelect.value;
  var currentCapacity = capacity.value;
  if (!isValidCapacity(currentRoomNumber, currentCapacity)) {
    capacity.setCustomValidity('Количество комнат не соответствует количеству гостей');
  } else {
    capacity.setCustomValidity('');
    roomNumberSelect.setCustomValidity('');
  }
});

// main

var mapGeneralPin = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');

var data = getDemoData();

init();
