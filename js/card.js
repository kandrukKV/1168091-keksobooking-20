'use strict';

window.card = (function () {
  var cardTemlpate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var getApartamentType = function (type) {
    var apartmentTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };
    return apartmentTypes[type] ? apartmentTypes[type] : 'неизвестный тип';
  };

  var getDeclensionOfNouns = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
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

  var fillFeatureList = function (currentFeatures, allFeaturesList) {
    for (var i = 0; i < allFeaturesList.length; i++) {
      var current = allFeaturesList[i].getAttribute('class').split('--')[1];
      allFeaturesList[i].style = currentFeatures.indexOf(current) >= 0 ? 'display: inline-block' : 'display: none';
    }
  };

  return {
    createCard: function (dataCard) {
      var fragment = document.createDocumentFragment();
      var card = cardTemlpate.cloneNode(true);
      card.querySelector('.popup__avatar').src = dataCard.author.avatar;
      card.querySelector('.popup__title').textContent = dataCard.offer.title;
      card.querySelector('.popup__text--address').textContent = dataCard.offer.address;
      card.querySelector('.popup__text--price').textContent = dataCard.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = getApartamentType(dataCard.offer.type);
      card.querySelector('.popup__text--capacity').textContent = dataCard.offer.rooms
        + ' '
        + getDeclensionOfNouns(dataCard.offer.rooms, ['комната', 'комнаты', 'комнат'])
        + ' для '
        + dataCard.offer.guests
        + ' '
        + getDeclensionOfNouns(dataCard.offer.guests, ['гостя', 'гостей', 'гостей']);
      card.querySelector('.popup__text--time').textContent = 'заезд после ' + dataCard.offer.checkin + ', выезд до ' + dataCard.offer.checkout;
      fillFeatureList(dataCard.offer.features, card.querySelectorAll('.popup__features li'));
      card.querySelector('.popup__description').textContent = dataCard.offer.description;
      card.querySelector('.popup__photo').replaceWith(getPhotoList(dataCard.offer.photos));
      fragment.appendChild(card);
      return fragment;
    }
  };
})();
