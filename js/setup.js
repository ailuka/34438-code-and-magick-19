'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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
  document.querySelector('.setup-similar').classList.remove('hidden');
};

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

/**
 * @description Function changes color of wizard's features.
 * @param {object} wizardFeature - HTML element fill color of which needs to be changed randomly.
 * @param {*} featureOptions - Array of colors for the feature.
 * @param {*} inputName - Hidden input for the feature.
 */
var changeColorOfWizardFeatures = function (wizardFeature, featureOptions, inputName) {
  var newOptionValue = getRandom(featureOptions);
  wizardFeature.style.fill = newOptionValue;
  inputName.value = newOptionValue;
};

// Переменные с DOM-элементами, на которых отслеживаются события
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');
var setupWizardCoat = setupWizardAppearance.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = setupWizardAppearance.querySelector('.setup-wizard .wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
// Переменные, содержащие скрытые input для отправки данных из формы при изменении цвета элементов волшебника.
var eyesColorInput = setupWizardAppearance.querySelector('input[name = eyes-color]');
var coatColorInput = setupWizardAppearance.querySelector('input[name = coat-color]');
var fireballColorInput = setupFireball.querySelector('input[name = fireball-color]');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && !checkIfElementHasFocus(setupUserName)) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', function () {
  changeColorOfWizardFeatures(setupWizardCoat, COAT_COLOR, coatColorInput);
});

setupWizardEyes.addEventListener('click', function () {
  changeColorOfWizardFeatures(setupWizardEyes, EYES_COLOR, eyesColorInput);
});

setupFireball.addEventListener('click', function () {
  var newOptionValue = getRandom(FIREBALL_COLOR);
  setupFireball.style.background = newOptionValue;
  fireballColorInput.value = newOptionValue;
});

renderAllWizards();
showSimilarWizards();
