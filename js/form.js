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

  var onRoomNumberSelectChange = function () {
    var currentRoomNumber = roomNumberSelect.value;
    var currentCapacity = capacity.value;
    if (!isValidCapacity(currentRoomNumber, currentCapacity)) {
      roomNumberSelect.setCustomValidity('Количество комнат не соответствует количеству гостей');
    } else {
      roomNumberSelect.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };

  var onCapacityChange = function () {
    var currentRoomNumber = roomNumberSelect.value;
    var currentCapacity = capacity.value;
    if (!isValidCapacity(currentRoomNumber, currentCapacity)) {
      capacity.setCustomValidity('Количество комнат не соответствует количеству гостей');
    } else {
      capacity.setCustomValidity('');
      roomNumberSelect.setCustomValidity('');
    }
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    var myFormData = new FormData(adForm);
    myFormData.append('address', inputAddress.value);
    window.upload(myFormData, window.page.showSuccessMessage, window.page.showErrorMessage);
  };

  var onInputTypeOfHousingChange = function () {
    inputCostOfHousing.min = MIN_PRICE[inputTypeOfHousing.value];
    inputCostOfHousing.placeholder = MIN_PRICE[inputTypeOfHousing.value];
  };

  var onSelectTimeInChange = function () {
    selectTimeOut.options[selectTimeIn.selectedIndex].selected = true;
  };

  var onSelectTimeOutChange = function () {
    selectTimeIn.options[selectTimeOut.selectedIndex].selected = true;
  };

  var onInputTitleInvalid = function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Это обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  var onInputCostOfHousungInvalid = function () {
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Это обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  var addListeners = function () {
    roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);
    capacity.addEventListener('change', onCapacityChange);
    adForm.addEventListener('submit', onAdFormSubmit);
    inputTypeOfHousing.addEventListener('change', onInputTypeOfHousingChange);
    selectTimeIn.addEventListener('change', onSelectTimeInChange);
    selectTimeOut.addEventListener('change', onSelectTimeOutChange);
    inputTitle.addEventListener('invalid', onInputTitleInvalid);
    inputCostOfHousing.addEventListener('invalid', onInputCostOfHousungInvalid);
  };

  var removeListeners = function () {
    roomNumberSelect.removeEventListener('change', onRoomNumberSelectChange);
    capacity.removeEventListener('change', onCapacityChange);
    adForm.removeEventListener('submit', onAdFormSubmit);
    inputTypeOfHousing.removeEventListener('change', onInputTypeOfHousingChange);
    selectTimeIn.removeEventListener('change', onSelectTimeInChange);
    selectTimeOut.removeEventListener('change', onSelectTimeOutChange);
    inputTitle.removeEventListener('invalid', onInputTitleInvalid);
    inputCostOfHousing.removeEventListener('invalid', onInputCostOfHousungInvalid);
  };

  var activateAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.loadImg.activate();
    addListeners();
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = false;
    }
  };

  var disableAdForm = function () {
    adForm.classList.add('ad-form--disabled');
    removeListeners();
    window.loadImg.disable();
    adForm.reset();
    adFormFieldsets.forEach(function (adFormFieldset) {
      adFormFieldset.disabled = true;
    });
  };

  var setAddress = function (position) {
    inputAddress.value = position.x + ', ' + position.y;
    inputAddress.disabled = true;
  };

  window.form = {
    disable: disableAdForm,
    activate: activateAdForm,
    setAddress: setAddress
  };
})();
