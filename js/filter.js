'use strict';

(function () {
  var MAX_NUMBER_OF_PINS = 5;
  var HousingType = {
    ANY: 'any'
  };
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterCheckboxes = filterForm.querySelectorAll('input');

  var getFilterData = function (data) {
    var filterState = getFilterState();
    var filterData = data;
    if (filterState['housing-type'] !== HousingType.ANY) {
      filterData = data.filter(function (item) {
        return item.offer.type === filterState['housing-type'];
      });
    }
    if (filterData.length > MAX_NUMBER_OF_PINS) {
      return filterData.slice(MAX_NUMBER_OF_PINS);
    }
    return filterData;
  };

  var getFilterState = function () {
    var filrerState = {
      features: []
    };
    filterSelects.forEach(function (item) {
      filrerState[item.name] = item.value;
    });
    filterCheckboxes.forEach(function (item) {
      if (item.checked) {
        filrerState.features.push(item.value);
      }
    });

    return filrerState;
  };

  filterForm.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.card.remove();
    window.pins.remove();
    window.pins.render(getFilterData(window.data));
  });

  window.filter = {
    getData: getFilterData
  };

})();
