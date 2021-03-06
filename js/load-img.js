'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var imageFileChooser = document.querySelector('#images');
  var imagePreview = document.querySelector('.ad-form__photo');


  var isTrueImg = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var clearImagePreview = function () {
    var image = imagePreview.querySelector('img');
    if (image) {
      image.remove();
    }
  };

  var onImageFileChoserChange = function () {
    var file = imageFileChooser.files[0];

    if (isTrueImg(file)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.style = 'max-width: 100%;';
        clearImagePreview();
        imagePreview.appendChild(img);
      });
      reader.readAsDataURL(file);
    }
  };

  var onAvatarFileChoserChange = function () {
    var file = avatarFileChooser.files[0];

    if (isTrueImg(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var activateLoadImg = function () {
    imageFileChooser.addEventListener('change', onImageFileChoserChange);
    avatarFileChooser.addEventListener('change', onAvatarFileChoserChange);
  };

  var disableLoadImg = function () {
    imageFileChooser.removeEventListener('change', onImageFileChoserChange);
    avatarFileChooser.removeEventListener('change', onAvatarFileChoserChange);
  };

  window.loadImg = {
    activate: activateLoadImg,
    disable: disableLoadImg
  };

})();
