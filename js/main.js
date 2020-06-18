'use strict';

(function () {
  var centralCoordinates = window.mainPin.getCoordinates();
  window.form.setAddress(centralCoordinates);
  window.form.disable();
})();
