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

  var doEscEvent = function (evt, action) {
    if (evt.key === KEY_ESC) {
      evt.preventDefault();
      action();
    }
  };

  var closeMessage = function (popup, onPopuoPressEsc, onPopupClick) {
    document.removeEventListener('keydown', onPopuoPressEsc);
    popup.removeEventListener('click', onPopupClick);
    popup.remove();
  };

  var showSuccessMessage = function () {
    var successPopup = successTemplate.cloneNode(true);

    var closeSuccsessMessage = function () {
      closeMessage(successPopup, onSuccessPopupPressEsc, onSuccessPopupClick);
    };

    var onSuccessPopupPressEsc = function (evt) {
      doEscEvent(evt, closeSuccsessMessage);
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

    var closeErrorMessage = function () {
      closeMessage(errorPopup, onErrorMessagePressEsc, onErrorMessageClick);
    };

    var onErrorMessagePressEsc = function (evt) {
      doEscEvent(evt, closeErrorMessage);
    };

    var onErrorMessageClick = function (evt) {
      evt.preventDefault();
      if (evt.target.tagName === POPUP_CLOSE_ELEMENT) {
        closeErrorMessage();
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
