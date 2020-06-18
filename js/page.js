'use strict';

(function () {
  var activatePage = function () {
    window.load('https://javascript.pages.academy/keksobooking/data', window.map.activate, showActivationError);
    window.form.setAddress(window.mainPin.getCoordinates());
    window.form.activate();
  };

  var showActivationError = function () {
    // console.log(error);
  };

  window.page = {
    activate: activatePage
  };

})();
