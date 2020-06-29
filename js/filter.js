'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var MAX_NUMBER_OF_PINS = 5;
  var ANY_TYPE = 'any';
  var HousingPriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var Price = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPriceType = filterForm.querySelector('#housing-price');
  var housingNumberOfRooms = filterForm.querySelector('#housing-rooms');
  var housingNumberOfGuest = filterForm.querySelector('#housing-guests');

  var isAnyType = function (type) {
    return type === ANY_TYPE;
  };

  var filterByTypeOfHousing = function (dataItem) {
    var type = housingType.value;
    return isAnyType(type) || dataItem.offer.type === type;
  };

  var filterByPriceOfHousing = function (dataItem) {
    switch (housingPriceType.value) {
      case HousingPriceType.LOW:
        return parseInt(dataItem.offer.price, 10) < Price.MIDDLE;
      case HousingPriceType.MIDDLE:
        return parseInt(dataItem.offer.price, 10) >= Price.MIDDLE && parseInt(dataItem.offer.price, 10) < Price.HIGH;
      case HousingPriceType.HIGH:
        return parseInt(dataItem.offer.price, 10) >= Price.HIGH;
      default:
        return true;
    }
  };

  var filterByRoomsOfHousing = function (dataItem) {
    var numberOfRooms = housingNumberOfRooms.value;
    return isAnyType(numberOfRooms) || String(dataItem.offer.rooms) === numberOfRooms;
  };

  var filterByGuestsOfHousing = function (dataItem) {
    var numberOfGuests = housingNumberOfGuest.value;
    return isAnyType(numberOfGuests) || String(dataItem.offer.guests) === numberOfGuests;
  };

  var filterByFeaturesOfHousing = function (dataItem) {
    var features = filterForm.querySelectorAll('input:checked');
    if (features.length) {
      for (var i = 0; i < features.length; i++) {
        if (dataItem.offer.features.indexOf(features[i].value) === -1) {
          return false;
        }
      }
    }
    return true;
  };

  var setLimitOutput = function (arr, limit) {
    return arr.length > limit ? arr.slice(0, limit) : arr;
  };

  var getFilterData = function (data) {

    var filterData = data.filter(function (item) {
      return filterByTypeOfHousing(item)
              && filterByPriceOfHousing(item)
              && filterByRoomsOfHousing(item)
              && filterByGuestsOfHousing(item)
              && filterByFeaturesOfHousing(item);
    });

    return setLimitOutput(filterData, MAX_NUMBER_OF_PINS);
  };

  var lastTimeout;

  var onFilterChange = function (evt) {
    evt.preventDefault();
    var data = getFilterData(window.data);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.pins.render(data);
    }, DEBOUNCE_INTERVAL);
  };

  var activateFilter = function () {
    filterForm.addEventListener('change', onFilterChange);
  };

  var disableFilter = function () {
    filterForm.reset();
    filterForm.removeEventListener('change', onFilterChange);
  };

  window.filter = {
    getData: getFilterData,
    activate: activateFilter,
    disable: disableFilter
  };

})();
