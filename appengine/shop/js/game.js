/**
 * define the behaviors of commands in the game
 */

'use strict';

goog.provide('Shop.Game');
goog.require('Blockly.JavaScript');
goog.require('Shop.Game.UI');
goog.require('Shop.utils');
goog.require('Shop.Game.Params');

var Game = Shop.Game;
// Game.svg = document.getElementById('svgShop');

/*
Game.state
Game.commands.xxx
Game.levels
*/

// Game.init = function(levelSettings) {
Game.init = function(level) {
  Game.props = Shop.Game.Params.props;
  Game.levelConfig = Shop.Game.Params.levels[level];

  Game.initState();
  Game.UI.init(Game.state.shop);
  document.getElementById('drink-shop-level-desc').innerHTML = Game.levelConfig.desc;
  document.getElementById('drink-shop-level-desc-goal').innerHTML = Game.levelConfig.goal;
};

Game.initState = function () {
  Game.state = {
    shop: Game.levelConfig.getInitialShopState(),
    robot: {
      holding: null,
      served: [],
    },
    log: [],
  };
};

Game.reset = function () {
  Game.initState();
  Game.UI.reset(Game.state.shop);
};

/** private methods
 *
 */

Game.getRobot = function() {
  return Game.state.robot;
};

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
  if (level === 2) {
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
    if (robot.served[0].filled != "green tea") {
      console.log("level not done: not green tea in the cup");
      window.alert(BlocklyGames.getMsg('DrinkShop_msg_notGreenTea'));
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
};

Game.errorMessage = function(cmdKey, msgKey) {
  return BlocklyGames.getMsg('DrinkShop_msg_errorIn').replace('%1', BlocklyGames.getMsg(cmdKey)) + '\n'
    + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': ' + BlocklyGames.getMsg(msgKey);
};

Game.spendTime = function(timeSpent) {
  // data
  // Game.state.shop.timeSpent += timeSpent;
  Game.state.shop.remainingTime -= timeSpent;
  // UI
  Game.UI.updateTime(Game.state.shop.remainingTime);
};

Game.earnMoney = function(money) {
  // data
  // Game.state.shop.timeSpent += timeSpent;
  Game.state.shop.money += money;
  // UI
  Game.UI.updateMoney(Game.state.shop.money);
};

// block methods

Game.commands = {};

Game.commands.getNewCup = function() {
  // data
  // var robot = Game.getRobot();
  Game.state.robot.holding = {class: "cup"};
  Game.state.shop.materials.cup -= 1;
  Game.spendTime(Game.props.robot.actions.getNewCup.timeSpent);

  // UI
  Game.UI.cleanWorkspace();
  Game.UI.drawCup();
};

Game.commands.fillCupWith = function(drink) {
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding anything");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_noCup');
  }
  // if (robot.holding.class !== "cup") {
  //   console.log("command error: robot not holding a cup");
  //   throw "command error: There is no cup in my hand."; // "執行 xxx 時發生錯誤\n原因：手上沒有杯子"
  // }
  if (!!robot.holding.isCovered) {
    console.log("command error: cup has been covered");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_cupCovered');
  }

  robot.holding.filled = drink; // ex: "black tea"
  if (drink == "black tea") {
    Game.UI.fillCup("#cf5a36");
  }
  else {
    Game.UI.fillCup("#e4db3d");
  }
  Game.spendTime(Game.props.robot.actions.fillCup.timeSpent);
};

Game.commands.fillCupWithVolume = function(drink, volume) {
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding anything");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_noCup');
  }
  // if (robot.holding.class !== "cup") {
  //   console.log("command error: robot not holding a cup");
  //   throw "command error: There is no cup in my hand."; // "執行 xxx 時發生錯誤\n原因：手上沒有杯子"
  // }
  if (!!robot.holding.isCovered) {
    console.log("command error: cup has been covered");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_cupCovered');
  }

  robot.holding.filled = drink; // ex: "black tea"
  if (drink == "black tea") {
    Game.UI.fillCup("#cf5a36");
  }
  else {
    Game.UI.fillCup("#e4db3d");
  }
  Game.spendTime(Game.props.robot.actions.fillCup.timeSpent);
};

Game.commands.coverCup = function(drink) {
  console.log("coverCup");
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding cup");
    throw Game.errorMessage('DrinkShop_coverCup', 'DrinkShop_msg_noCup');
  }
  robot.holding.isCovered = true;
  Game.UI.drawCupCap();
  Game.spendTime(Game.props.robot.actions.coverCup.timeSpent);
};

Game.commands.serve = function() {
  console.log("serve");
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding cup");
    throw Game.errorMessage('DrinkShop_coverCup', 'DrinkShop_msg_noCup');
  }
  robot.served.push(robot.holding);
  robot.holding = null;

  UI.drawHand();
  Game.spendTime(Game.props.robot.actions.serve.timeSpent);
  Game.earnMoney(20);

  setTimeout(function() {
    UI.cleanWorkspace();
  }, 500);
};
