'use strict';

(function () {
  var showMessageElement = window.util.showMessageElement;
  var loadSimilarWizards = window.backend.load;
  var renderSimilarWizards = window.wizards.render;
  var changeColor = window.color.change;
  var ERROR_COLOR = window.util.ERROR_COLOR;
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizards = [];

  var getRank = function (wizard, wizardCoat, wizardEyes) {
    var coatColor = wizardCoat.style.fill;
    var eyesColor = wizardEyes.style.fill;
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var compareWizards = function (wizardA, wizardB) {
    var rankDiff = getRank(wizardB, setupWizardCoat, setupWizardEyes) - getRank(wizardA, setupWizardCoat, setupWizardEyes);

    if (rankDiff === 0) {
      rankDiff = wizards.indexOf(wizardA) - wizards.indexOf(wizardB);
    }

    return rankDiff;
  };

  var updateWizards = function () {
    renderSimilarWizards(wizards.slice().sort(compareWizards));
  };

  var showSimilarWizards = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onSuccessWizardsLoad = function (data) {
    wizards = data;
    updateWizards();
    showSimilarWizards();
  };

  var onErrorWizardsLoad = function (errorMessage) {
    showMessageElement(errorMessage, errorWizardsBlock, ERROR_COLOR);
  };

  // Находим блок для вставки сообщения об ошибке загрузки похожих магов.
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
  changeColor(setupWizardCoat, COAT_COLOR, coatColorInput, updateWizards);
  changeColor(setupWizardEyes, EYES_COLOR, eyesColorInput, updateWizards);
  changeColor(setupFireball, FIREBALL_COLOR, fireballColorInput, updateWizards);

  // Загрузим похожих магов с сервера.
  loadSimilarWizards(onSuccessWizardsLoad, onErrorWizardsLoad);
})();
