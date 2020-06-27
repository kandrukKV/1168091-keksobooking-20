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
  var filterSelects = filterForm.querySelectorAll('select');
  var filterCheckboxes = filterForm.querySelectorAll('input');

  var getFilterData = function (data) {
    var filterState = getFilterState();
    var filterData = data;

    var verifyOption = function (filterStateOption, dataOption) {
      if (filterState[filterStateOption] !== ANY_TYPE) {
        filterData = filterData.filter(function (item) {
          return String(item.offer[dataOption]) === String(filterState[filterStateOption]);
        });
      }
    };

    verifyOption('housing-type', 'type');
    verifyOption('housing-rooms', 'rooms');
    verifyOption('housing-guests', 'guests');

    if (filterState['housing-price'] !== ANY_TYPE) {
      switch (filterState['housing-price']) {
        case HousingPriceType.LOW:
          filterData = filterData.filter(function (item) {
            return parseInt(item.offer.price, 10) < Price.MIDDLE;
          });
          break;
        case HousingPriceType.MIDDLE:
          filterData = filterData.filter(function (item) {
            return parseInt(item.offer.price, 10) >= Price.MIDDLE && parseInt(item.offer.price, 10) < Price.HIGH;
          });
          break;
        case HousingPriceType.HIGH:
          filterData = filterData.filter(function (item) {
            return parseInt(item.offer.price, 10) >= Price.HIGH;
          });
          break;
      }
    }

    if (filterState['features'].length) {
      filterState['features'].forEach(function (item) {
        filterData = filterData.filter(function (el) {
          return el.offer.features.indexOf(item) !== -1;
        });
      });
    }

    if (filterData.length > MAX_NUMBER_OF_PINS) {
      return filterData.slice(MAX_NUMBER_OF_PINS);
    }

    return filterData;
  };

  var getFilterState = function () {
    var filterState = {
      features: []
    };
    filterSelects.forEach(function (item) {
      filterState[item.name] = item.value;
    });
    filterCheckboxes.forEach(function (item) {
      if (item.checked) {
        filterState.features.push(item.value);
      }
    });
    return filterState;
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
