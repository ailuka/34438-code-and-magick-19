'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  var onAvatarChange = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var addAvatarListener = function () {
    fileChooser.addEventListener('change', onAvatarChange);
  };

  var removeAvatarListener = function () {
    fileChooser.removeEventListener('change', onAvatarChange);
  };

  window.avatar = {
    addListener: addAvatarListener,
    removeListener: removeAvatarListener
  };

})();
