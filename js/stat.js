'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_OFFSET = 10;
var TEXT_HEIGHT = 20;
var GRAPH_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_BAR_HEIGHT = GRAPH_HEIGHT - TEXT_HEIGHT;

/**
 * @description A function that renders a cloud to display the results graph.
 * @param {object} ctx canvas context which is created in game.js
 * @param {number} x horizontal coordinate of top left corner of the cloud
 * @param {number} y vertical coordinate of top left corner of the cloud
 * @param {string} color color code of the cloud
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * @description A function displays welcome messege in the top left corner of the cloud with results.
 * @param {object} ctx canvas context
 * @param {string} color code of the text color
 * @param {string} font font family for the text
 */
var displayWelcomeText = function (ctx, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_HEIGHT, CLOUD_Y + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_HEIGHT, CLOUD_Y + TEXT_HEIGHT + TEXT_HEIGHT);
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

/**
 * @description A function used to find a random color saturation.
 * @return {number} returns a random number from 0 to 100.
 */
var getRandomSaturationPercent = function () {
  return Math.floor(Math.random() * 101);
};

/**
 * @description A function renders a graph bar for a player
 * @param {object} ctx canvas context
 * @param {string} name player's name
 * @param {number} time player's time in milliseconds
 * @param {number} maxTime time of a player, who played longer than other players
 * @param {number} resultIndex index of a player's name in the array of names
 */

var renderResultGraph = function (ctx, name, time, maxTime, resultIndex) {
  // Выводим имя игрока
  ctx.fillText(name, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * resultIndex, CLOUD_HEIGHT + CLOUD_Y - 30);

  // Сохраняем текущее положение контекста
  ctx.save();

  // Перемещаем контекст на горизонтальную ось гистограммы
  ctx.translate(0, CLOUD_HEIGHT + CLOUD_Y - BAR_WIDTH);

  // Отражаем контекст по вертикали
  ctx.scale(1, -1);

  var currentBarHeight = (MAX_BAR_HEIGHT * time) / maxTime;
  // Определяем цвет столбца
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl(240, ' + getRandomSaturationPercent() + '%, 50%)';
  }

  // Выводим столбец гистограммы
  ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * resultIndex, 0, BAR_WIDTH, currentBarHeight);
  // Восстанавливаем исходное положение контекста
  ctx.restore();
  // Выводим время каждого игрока над столбцом гистограммы с именем соответствующего игрока
  ctx.fillText(Math.floor(time), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * resultIndex, (CLOUD_HEIGHT + CLOUD_Y) - TEXT_HEIGHT - BAR_WIDTH - currentBarHeight);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  displayWelcomeText(ctx, '#000', '16px PT Mono');

  // Определяем максимльное время прохождения игры
  var maxTime = getMaxNumber(times);

  for (var i = 0; i < names.length; i++) {
    renderResultGraph(ctx, names[i], times[i], maxTime, i);
  }
};
