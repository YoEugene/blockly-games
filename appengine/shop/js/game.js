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
  Game.props = {
    shop: {
      prices: {
        "black tea": 20,
        "green tea": 20,
      },
    },
    orders: [
      {drinkType: "black tea"},
    ],
  }

  Game.initState()
  Game.UI.init();
};

Game.initState = function () {
  Game.state = {
    shop: {
      usedMoney: 0,
      usedTime: 0,
      usedCupCount: 0,
      usedDrink: {
        "black tea": 0,
        "green tea": 0,
      },
    },
    // workspace: {
    //   holding: null,
    //   served: [],
    // },
    robot: {
      holding: null,
      served: [],
    },
    log: [],
  };
}

Game.reset = function () {
  Game.initState();
  Game.UI.reset();
}

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
        window.alert(BlocklyGames.getMsg('DrinkShop_msg_noServedDrink'));
        return false;
      }
      if (robot.served.length > 1) {
        console.log("level not done: should serve only one cup of drink");
        window.alert(BlocklyGames.getMsg('DrinkShop_msg_servedMultiple'));
        return false;
      }
    }
    if (!robot.served[0].filled) {
      console.log("level not done: cup empty");
      window.alert(BlocklyGames.getMsg('DrinkShop_msg_cupEmpty'));
      return false;
    }
    if (robot.served[0].filled != "black tea") {
      console.log("level not done: not black tea in the cup");
      window.alert(BlocklyGames.getMsg('DrinkShop_msg_notBlackTea'));
      return false;
    }
    if (!robot.served[0].isCovered) {
      console.log("level not done: cup not covered");
      window.alert(BlocklyGames.getMsg('DrinkShop_msg_cupNotCovered'));
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
  Game.UI.cleanWorkspace()
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
  console.log("coverCup");
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
  Game.UI.drawCupCap();
}

Game.commands.serve = function() {
  console.log("serve");
  var robot = Game.getRobot();
  if (!robot.holding) {
    console.log("command error: robot not holding anything");
    return;
  }
  robot.served.push(robot.holding);
  robot.holding = null;
  // UI.clean();
}
