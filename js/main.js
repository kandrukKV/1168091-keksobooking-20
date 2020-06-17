'use strict';

(function () {

  var centralCoordinates = window.mainPin.getCoordinates(true);
  window.form.setAddress(centralCoordinates);
  window.form.disable();

})();
