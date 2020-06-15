'use strict';

(function () {
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var inputAddress = document.querySelector('#address');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var inputTypeOfHousing = document.querySelector('#type');
  var inputCostOfHousing = document.querySelector('#price');
  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');
  var inputTitle = document.querySelector('#title');

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

  inputTypeOfHousing.addEventListener('change', function () {
    inputCostOfHousing.min = MIN_PRICE[inputTypeOfHousing.value];
    inputCostOfHousing.placeholder = MIN_PRICE[inputTypeOfHousing.value];
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.options[selectTimeIn.selectedIndex].selected = true;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.options[selectTimeOut.selectedIndex].selected = true;
  });

  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Это обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  inputCostOfHousing.addEventListener('invalid', function () {
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Это обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

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

  var setAddress = function (x, y) {
    inputAddress.value = x + ', ' + y;
    inputAddress.disabled = true;
  };

  window.form = {
    disable: disableAdForm,
    activate: activateAdForm,
    setAddress: setAddress
  };
})();
