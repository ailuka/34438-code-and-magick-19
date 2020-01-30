'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * @description function to get a random item from an array.
 * @param {array} arrayList
 * @return {*} returns a random item from the array.
 */
var getRandom = function (arrayList) {
  return arrayList[Math.floor(Math.random() * arrayList.length)];
};

/**
 * @description function to generate a random wizard.
 * @return {object} returns a wizard.
 */
var generateOneWizard = function () {
  return {
    name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
    coatColor: getRandom(COAT_COLOR),
    eyesColor: getRandom(EYES_COLOR)
  };
};

/**
 * @description function generates a desired number of wizard objects.
 * @param {number} num - a number of wizards to generate.
 * @return {array} an array of objects with a number of wizards.
 */
var generateAllWizards = function (num) {
  var wizards = [];
  for (var i = 0; i < num; i++) {
    wizards[i] = generateOneWizard();
  }

  return wizards;
};

/**
 * @description function renders one wizard.
 * @param {object} wizard
 * @param {object} similarWizard - HTML element object that will contain a wizard.
 * @return {object} wizard HTML element.
 */
var renderOneWizard = function (wizard, similarWizard) {
  var wizardElement = similarWizard.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Function renders all wizards in HTML block with a class of setup-similar-list.
 */
var renderAllWizards = function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = generateAllWizards(4);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderOneWizard(wizards[i], similarWizardTemplate));
  }

  similarListElement.appendChild(fragment);
};

/**
 * Function shows HTML block with similar wizards.
 */
var showSimilarWizards = function () {
  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
};

renderAllWizards();
showSimilarWizards();
