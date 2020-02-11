'use strict';

(function () {
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
    if (evt.key === window.util.ESC_KEY && !checkIfElementHasFocus(setupUserName)) {
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
    window.dnd.dialogHandle.addEventListener('mousedown', window.dnd.onDragAndDrop);
  };

  var setupClose = setup.querySelector('.setup-close');
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('mousedown', window.dnd.onDragAndDrop);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      openPopup();
    }
  });

  var setupUserName = setup.querySelector('.setup-user-name');
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      closePopup();
    }
  });

})();
