'use strict';

(function () {
  var MAX_WIZARDS_NUMBER = 4;

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

  var renderAllWizards = function (data) {
    var wizardsNumber = data.length > MAX_WIZARDS_NUMBER ? MAX_WIZARDS_NUMBER : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < wizardsNumber; i++) {
      similarListElement.appendChild(renderOneWizard(data[i], similarWizardTemplate));
    }
  };

  // Переменные для вставки похожих магов на страницу.
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  window.wizards = {
    render: renderAllWizards
  };

})();
