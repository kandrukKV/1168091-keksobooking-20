'use strict';

(function () {
  var data = window.data;

  var activatePage = function () {
    var coordinates = window.mainPin.getCoordinates();
    window.form.setAddress(coordinates);
    window.map.activate(data);
    window.form.activate();
  };

  window.page = {
    activate: activatePage
  };

})();
