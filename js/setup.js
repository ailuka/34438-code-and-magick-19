'use strict';
(function () {
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARDS_NUMBER = 4;

  /**
   * @description function to generate a random wizard.
   * @return {object} returns a wizard.
   */
  // var generateOneWizard = function () {
  //   return {
  //     name: window.util.getRandom(WIZARD_NAMES) + ' ' + window.util.getRandom(WIZARD_SURNAMES),
  //     coatColor: window.util.getRandom(COAT_COLOR),
  //     eyesColor: window.util.getRandom(EYES_COLOR)
  //   };
  // };

  /**
   * @description function generates a desired number of wizard objects.
   * @param {number} num - a number of wizards to generate.
   * @return {array} an array of objects with a number of wizards.
   */
  // var generateAllWizards = function (num) {
  //   var wizards = [];
  //   for (var i = 0; i < num; i++) {
  //     wizards[i] = generateOneWizard();
  //   }

  //   return wizards;
  // };

  /**
   * @description function renders one wizard.
   * @param {object} wizard
   * @param {object} similarWizard - HTML element object that will contain a wizard.
   * @return {object} wizard HTML element.
   */
  var renderOneWizard = function (wizard, similarWizard) {
    var wizardElement = similarWizard.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  /**
   * Function renders all wizards in HTML block with a class of setup-similar-list.
   * @param {object} wizards - JSON object with wizards data.
   */
  var renderAllWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderOneWizard(wizards[i], similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);
  };

  /**
   * Function shows HTML block with similar wizards.
   */
  var showSimilarWizards = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onSuccessWizardsLoad = function (wizards) {
    renderAllWizards(wizards);
    showSimilarWizards();
  };

  var onErrorWizardsLoad = function (errorMessage) {
    window.util.showMessageElement(errorMessage, errorWizardsBlock, window.util.ERROR_COLOR);
  };

  // Переменные для вставки похожих магов на страницу.
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var errorWizardsBlock = document.querySelector('.setup-footer');
  // Переменные с DOM-элементами, на которых отслеживаются события.
  var setup = document.querySelector('.setup');
  var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');
  var setupWizardCoat = setupWizardAppearance.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = setupWizardAppearance.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  // Переменные, содержащие скрытые input для отправки данных из формы при изменении цвета элементов волшебника.
  var eyesColorInput = setupWizardAppearance.querySelector('input[name = eyes-color]');
  var coatColorInput = setupWizardAppearance.querySelector('input[name = coat-color]');
  var fireballColorInput = setupFireball.querySelector('input[name = fireball-color]');
  // Вызываем модуль для окраски элементов мага при клике.
  window.color.change(setupWizardCoat, COAT_COLOR, coatColorInput);
  window.color.change(setupWizardEyes, EYES_COLOR, eyesColorInput);
  window.color.change(setupFireball, FIREBALL_COLOR, fireballColorInput);

  // Загрузим похожих магов с сервера.
  window.backend.load(onSuccessWizardsLoad, onErrorWizardsLoad);

})();

