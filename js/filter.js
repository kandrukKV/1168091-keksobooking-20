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

  var filterByTypeOfHousing = function (arr) {
    var type = filterForm.querySelector('#housing-type').value;
    if (type === ANY_TYPE) {
      return arr;
    }
    return arr.filter(function (item) {
      return item.offer.type === type;
    });
  };

  var filterByPriceOfHousing = function (arr) {
    var priceType = filterForm.querySelector('#housing-price').value;

    switch (priceType) {
      case HousingPriceType.LOW:
        return arr.filter(function (item) {
          return parseInt(item.offer.price, 10) < Price.MIDDLE;
        });
      case HousingPriceType.MIDDLE:
        return arr.filter(function (item) {
          return parseInt(item.offer.price, 10) >= Price.MIDDLE && parseInt(item.offer.price, 10) < Price.HIGH;
        });
      case HousingPriceType.HIGH:
        return arr.filter(function (item) {
          return parseInt(item.offer.price, 10) >= Price.HIGH;
        });
      default:
        return arr;
    }
  };

  var filterByRoomsOfHousing = function (arr) {
    var numberOfRooms = filterForm.querySelector('#housing-rooms').value;
    if (numberOfRooms === ANY_TYPE) {
      return arr;
    }
    return arr.filter(function (item) {
      return String(item.offer.rooms) === numberOfRooms;
    });
  };

  var filterByGuestsOfHousing = function (arr) {
    var numberOfGuests = filterForm.querySelector('#housing-guests').value;
    if (numberOfGuests === ANY_TYPE) {
      return arr;
    }
    return arr.filter(function (item) {
      return String(item.offer.guests) === numberOfGuests;
    });
  };

  var filterByFeaturesOfHousing = function (arr) {
    var features = filterForm.querySelectorAll('input:checked');
    if (features.length) {
      features.forEach(function (item) {
        arr = arr.filter(function (el) {
          return el.offer.features.indexOf(item.value) !== -1;
        });
      });
    }
    return arr;
  };

  var setLimitOutput = function (arr, limit) {
    return arr.length > limit ? arr.slice(limit) : arr;
  };

  var getFilterData = function (data) {
    var filterData = data;

    filterData = filterByTypeOfHousing(filterData);
    filterData = filterByPriceOfHousing(filterData);
    filterData = filterByRoomsOfHousing(filterData);
    filterData = filterByGuestsOfHousing(filterData);
    filterData = filterByFeaturesOfHousing(filterData);
    filterData = setLimitOutput(filterData, MAX_NUMBER_OF_PINS);

    return filterData;
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
