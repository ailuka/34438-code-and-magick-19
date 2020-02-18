'use strict';

(function () {
  var getRandom = window.util.getRandom;
  var debounce = window.debounce.set;

  /**
   * @description Function changes color of HTML element.
   * @param {object} element - HTML element color of which needs to be changed randomly.
   * @param {Array} colors - Array of colors for the element.
   * @param {object} inputName - Hidden input for the element.
   * @param {function} updateFunction - Function to update elements in color change.
   */
  var change = function (element, colors, inputName, updateFunction) {
    element.addEventListener('click', function () {
      var color = getRandom(colors);
      inputName.value = color;

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }

      var debouncedUpdateFunction = debounce(updateFunction);
      debouncedUpdateFunction();
    });
  };

  window.color = {
    change: change
  };
})();
