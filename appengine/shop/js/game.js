/**
 * define the behaviors of commands in the game
 */

'use strict';

goog.provide('Shop.Game');
goog.require('Blockly.JavaScript');
goog.require('Shop.Game.UI');

var Game = Shop.Game;
// Game.svg = document.getElementById('svgShop');

/*
Game.state
Game.commands.xxx
Game.levels
*/

// Game.init = function(levelSettings) {
Game.init = function() {
  // Game.constants = {
  //   blackTea: "black tea"
  // };

  // state of the game, including static and dynamic info
  // UI changes should be based on this
  Game.state = {
    shop: {
      money: 100,
      usedTime: 0,
      usedCupCount: 0,
      usedDrink: {
        "black tea": 0,
        "green tea": 0,
      },
      prices: {
        "black tea": 20,
        "green tea": 20,
      },
    },
    robot: {
      holding: null,
      served: [],
    },
    orders: [
      {drinkType: "black tea"},
    ],
  };

  Game.log = [];
  Game.UI.init();
};

Game.reset = Game.init;

/** private methods
 *
 */

Game.getRobot = function() {
  return Game.state.robot;
}

Game.checkLevelDone = function(level) {
  if (level === 1) {
    var robot = Game.getRobot();
    if (robot.served.length !== 1) {
      if (robot.served.length === 0) {
        console.log("level not done: not serving any drink");
        window.alert("The customer didn't get their tea. ☹");
        return false;
      }
      if (robot.served.length > 1) {
        console.log("level not done: should serve only one cup of drink");
        window.alert("The customer received more than 1 cup of tea. ☹");
        return false;
      }
    }
    if (!robot.served[0].filled) {
      console.log("level not done: cup not filled");
      window.alert("The cup is empty. ☹");
      return false;
    }
    if (robot.served[0].filled != "black tea") {
      console.log("level not done: not black tea in the cup");
      window.alert("It's not black tea. ☹");
      return false;
    }
    if (!robot.served[0].isCovered) {
      console.log("level not done: cup not covered");
      window.alert("The cup is not covered. :(");
      return false;
    }
    return true;
  }
  return false;
}

// block methods

Game.commands = {};

Game.commands.getNewCup = function() {
  console.log("getNewCup");
  var robot = Game.getRobot();
  robot.holding = {class: "cup"};
  Game.UI.clean()
  Game.UI.drawCup();
}

Game.commands.fillCupWith = function(drink) {
  console.log("fillCupWith");
  var robot = Game.getRobot();
  if (!robot.holding) {
    console.log("command error: robot not holding anything");
    return;
  }
  if (robot.holding.class !== "cup") {
    console.log("command error: robot not holding a cup");
    return;
  }
  if (!!robot.holding.isCovered) {
    console.log("command error: cup has been covered");
    return;
  }
  robot.holding.filled = drink; // ex: "black tea"
  if (drink == "black tea") {
    Game.UI.fillCup("#cf5a36");
  }
  else {
    Game.UI.fillCup("#e4db3d");
  }
}

Game.commands.coverCup = function(drink) {
  console.log("fillCupWith");
  var robot = Game.getRobot();
  if (!robot.holding) {
    console.log("command error: robot not holding anything");
    return;
  }
  if (robot.holding.class !== "cup") {
    console.log("command error: robot not holding a cup");
    return;
  }
  robot.holding.isCovered = true;
  Game.UI.drawCupCover();
}

Game.commands.serve = function() {
  var robot = Game.getRobot();
  if (!robot.holding) {
    console.log("command error: robot not holding anything");
    return;
  }
  robot.served.push(robot.holding);
  robot.holding = null;
  UI.clean();
}
