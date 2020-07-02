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

  var isEscEvent = function (evt, action) {
    if (evt.key === KEY_ESC) {
      evt.preventDefault();
      action();
    }
  };

  var showSuccessMessage = function () {
    var successPopup = successTemplate.cloneNode(true);

    var closeSuccsessMessage = function () {
      document.removeEventListener('keydown', onSuccessPopupPressEsc);
      successPopup.removeEventListener('click', onSuccessPopupClick);
      successPopup.remove();
    };

    var onSuccessPopupPressEsc = function (evt) {
      isEscEvent(evt, closeSuccsessMessage);
    };

    var onSuccessPopupClick = function () {
      closeSuccsessMessage();
    };

    successPopup.addEventListener('click', onSuccessPopupClick);
    document.addEventListener('keydown', onSuccessPopupPressEsc);

    main.appendChild(successPopup);

    disablePage();
  };

  var showErrorMessage = function (message) {
    var errorPopup = errorTemplate.cloneNode(true);

    var closeErrorMassage = function () {
      document.removeEventListener('keydown', onErrorMessagePressEsc);
      errorPopup.removeEventListener('click', onErrorMessageClick);
      errorPopup.remove();
    };

    var onErrorMessagePressEsc = function (evt) {
      isEscEvent(evt, closeErrorMassage);
    };

    var onErrorMessageClick = function (evt) {
      evt.preventDefault();
      if (evt.target.tagName === POPUP_CLOSE_ELEMENT) {
        closeErrorMassage();
      }
    };

    errorPopup.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessagePressEsc);
    errorPopup.querySelector('.error__message').textContent = message;
    main.appendChild(errorPopup);
  };

  window.page = {
    activate: activatePage,
    disable: disablePage,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };

})();
