'use strict';

(function () {
  /**
   * @description Function changes color of HTML element.
   * @param {object} element - HTML element color of which needs to be changed randomly.
   * @param {Array} colors - Array of colors for the element.
   * @param {object} inputName - Hidden input for the element.
   */
  var change = function (element, colors, inputName) {
    element.addEventListener('click', function () {
      var color = window.util.getRandom(colors);
      inputName.value = color;

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };

  window.color = {
    change: change
  };
})();
