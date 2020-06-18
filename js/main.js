'use strict';

(function () {

  var centralCoordinates = window.mainPin.getCoordinates();
  window.form.setAddress(centralCoordinates);
  window.form.disable();

  // след. ДЗ

  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
  //  console.log(JSON.parse(xhr.responseText));
  });
  xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
  xhr.send();
})();
