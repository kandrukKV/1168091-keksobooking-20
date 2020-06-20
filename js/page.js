'use strict';

(function () {
  var DATA_URL = 'https://javascript.pages.academy/keksobooking/data';
  var activatePage = function () {
    window.load(DATA_URL, window.map.activate, showStatusMessage);
    window.form.setAddress(window.mainPin.getCoordinates());
    window.form.activate();
  };

  var showStatusMessage = function () {
    // эту функцию я опишу в следующем ДЗ
  };

  window.page = {
    activate: activatePage,
    showStatusMessage: showStatusMessage
  };

})();
