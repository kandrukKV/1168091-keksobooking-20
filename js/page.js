'use strict';

(function () {
  var POPUP_CLOSE_ELEMENT = 'BUTTON';
  var KEY_ESC = 'Escape';
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var activatePage = function () {
    window.load(window.map.activate, showErrorMessage);
    window.form.setAddress(window.mainPin.getCoordinates());
    window.form.activate();
  };

  var disablePage = function () {
    window.map.disable();
    window.form.disable();
    var centralCoordinates = window.mainPin.getCoordinates();
    window.form.setAddress(centralCoordinates);
  };

  var removePopup = function (popup, listener) {
    popup.remove();
    document.removeEventListener('keydown', listener);
  };

  var showSuccessMessage = function () {
    var successPopup = successTemplate.cloneNode(true);

    var onPupapClosePressEsc = function (evt) {
      if (evt.key === KEY_ESC) {
        evt.preventDefault();
        removePopup(successPopup, onPupapClosePressEsc);
      }
    };

    successPopup.addEventListener('click', function (evt) {
      evt.preventDefault();
      removePopup(successPopup, onPupapClosePressEsc);
    });

    document.addEventListener('keydown', onPupapClosePressEsc);
    main.appendChild(successPopup);

    disablePage();
  };

  var showErrorMessage = function (message) {
    var errorPupap = errorTemplate.cloneNode(true);

    var onPupapClosePressEsc = function (evt) {
      if (evt.key === KEY_ESC) {
        evt.preventDefault();
        removePopup(errorPupap, onPupapClosePressEsc);
      }
    };

    errorPupap.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.tagName === POPUP_CLOSE_ELEMENT) {
        removePopup(errorPupap, onPupapClosePressEsc);
      }
    });

    document.addEventListener('keydown', onPupapClosePressEsc);
    errorPupap.querySelector('.error__message').textContent = message;
    main.appendChild(errorPupap);
  };

  window.page = {
    activate: activatePage,
    disable: disablePage,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };

})();
