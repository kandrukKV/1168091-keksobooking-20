'use strict';

(function () {
  var data = window.data;

  var activatePage = function () {
    window.map.activate(data);
    window.form.setAddress(window.mainPin.getCoordinates());
    window.form.activate();
  };

  window.page = {
    activate: activatePage
  };

})();
