'use strict';

(function () {
  var UPLOAD_URL = 'https://javascript.pages.academy/keksobooking';
  var SERVER_STATUS_OK = 200;
  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка загрузки объявления');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.upload = upload;
})();
