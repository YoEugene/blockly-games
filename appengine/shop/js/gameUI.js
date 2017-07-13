goog.provide('Shop.Game.UI');
goog.require('Shop.Game.UI.Config');
goog.require('Blockly');
goog.require('Shop.utils');
goog.require('goog.graphics.SvgGraphics');

var UI = Shop.Game.UI;

UI.init = function(shopState) {
  UI.svg = document.getElementById('svgWorkspace');

  // goog.graphics.SvgGraphics.drawRect(10, 50, 50, 10, '#eee', '#ccc', UI.svg);

  UI.drawn = {};
  UI.dom = {}

  // UI.drawObject(UI.Config.background, UI.svg);
  // UI.drawObject(UI.Config.workspace, UI.svg);
  UI.dom.workspace = document.getElementById('workspace-main');
  UI.dom.timeText = document.getElementById('scoring-board-time-text');
  UI.dom.moneyText = document.getElementById('scoring-board-money-text');

  UI.updateMoney(shopState.money);
  UI.updateTime(shopState.remainingTime);
};

UI.reset = function(shopState) {
  UI.cleanWorkspace();
  UI.drawn = {};

  UI.updateMoney(shopState.money);
  UI.updateTime(shopState.remainingTime);
};

// private

UI.drawObject = function(objConfig, parent) {
  // var object = UI.Config[objName];
  var attributes = objConfig.attributes;
  var shape = document.createElementNS(Blockly.SVG_NS, objConfig.element);
  Object.keys(objConfig.attributes).map(function(attributeName) {
    shape.setAttribute(attributeName, objConfig.attributes[attributeName]);
  });
  parent.appendChild(shape);
  return shape;
};

UI.removeChildren = function(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// public

UI.cleanWorkspace = function() {
  UI.removeChildren(UI.dom.workspace);
};

UI.drawCup = function() {
  UI.drawn.cup = UI.drawObject(UI.Config.cup, UI.dom.workspace);
  UI.drawObject(UI.Config.cupLight, UI.dom.workspace);
};

UI.fillCup = function(color) {
  UI.drawn.cup.setAttribute('fill', color);
};

UI.drawCupCap = function(color) {
  UI.drawObject(UI.Config.cupCap, UI.dom.workspace);
};

UI.drawHand = function() {
  UI.drawObject(UI.Config.hand, UI.dom.workspace);
};

UI.drawTimeMoney = function() {
  UI.drawObject(UI.Config.hand, UI.dom.workspace);
};

UI.updateTime = function (time) {
  UI.dom.timeText.textContent = time;
};

UI.updateMoney = function (money) {
  UI.dom.moneyText.textContent = money;
};