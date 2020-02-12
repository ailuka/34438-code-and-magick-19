'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  /**
   * @description function to get a random item from an array.
   * @param {array} arrayList
   * @return {*} returns a random item from the array.
   */
  var getRandom = function (arrayList) {
    return arrayList[Math.floor(Math.random() * arrayList.length)];
  };

  /**
   * @description Universal function to find the maximum number in array.
   * @param {Array} arr An array of numbers.
   * @return {number} a maximum number in the array or 0 if array is empty
   */
  var getMaxNumber = function (arr) {
    if (!arr) {
      return 0;
    }

    var maxNumber = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxNumber) {
        maxNumber = arr[i];
      }
    }

    return maxNumber;
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    getRandom: getRandom,
    getMaxNumber: getMaxNumber
  };
})();
