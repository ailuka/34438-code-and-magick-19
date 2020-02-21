'use strict';

(function () {
  var dialogHandle = window.dnd.dialogHandle;
  var onDragAndDrop = window.dnd.onDragAndDrop;
  var addAvatarListener = window.avatar.addListener;
  var removeAvatarListener = window.avatar.removeListener;
  var showMessageElement = window.util.showMessageElement;
  var saveForm = window.backend.save;
  var ENTER_KEY = window.util.ENTER_KEY;
  var ESC_KEY = window.util.ESC_KEY;
  var SUCCESS_COLOR = window.util.SUCCESS_COLOR;
  var ERROR_COLOR = window.util.ERROR_COLOR;
  var SUCCESS_MESSAGE = 'Данные успешно сохранены.';

  /**
   * @description Function checks, if element is in focus or not.
   * @param {object} element - HTML element
   * @return {boolean} true if element is in focus and false if element is not in focus.
   */
  var checkIfElementHasFocus = function (element) {
    var isInFocus = false;
    if (element === document.activeElement) {
      isInFocus = true;
    }
    return isInFocus;
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && !checkIfElementHasFocus(setupUserName)) {
      closePopup();
    }
  };

  var isFirstElementOpen = true;
  var startX = 0;
  var startY = 0;
  var resetElementPosition = function (element) {
    if (isFirstElementOpen) {
      startX = element.offsetLeft;
      startY = element.offsetTop;
      isFirstElementOpen = false;
    }
    element.style.left = startX + 'px';
    element.style.top = startY + 'px';
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var openPopup = function () {
    setup.classList.remove('hidden');
    resetElementPosition(setup);
    document.addEventListener('keydown', onPopupEscPress);
    dialogHandle.addEventListener('mousedown', onDragAndDrop);
    addAvatarListener();
  };

  var setupClose = setup.querySelector('.setup-close');
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('mousedown', onDragAndDrop);
    document.removeEventListener('keydown', onPopupEscPress);
    removeAvatarListener();
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  var setupUserName = setup.querySelector('.setup-user-name');
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });

  var onSetupFormSuccessLoad = function () {
    showMessageElement(SUCCESS_MESSAGE, document.body, SUCCESS_COLOR);
    closePopup();
  };

  var errorBlock = setup.querySelector('.setup-footer');
  var onSetupFormError = function (errorMessage) {
    showMessageElement(errorMessage, errorBlock, ERROR_COLOR);
  };

  var setupForm = setup.querySelector('.setup-wizard-form');
  // Отменяем действие по умолчанию и сохраняем данные из формы с помощью AJAX.
  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    saveForm(new FormData(setupForm), onSetupFormSuccessLoad, onSetupFormError);
  });

})();
