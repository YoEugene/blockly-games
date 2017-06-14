/**
 * define the behaviors of commands in the game
 */

'use strict';

goog.provide('Shop.Game');
goog.require('Blockly.JavaScript');

var Game = Shop.Game;

Game.shop = {};
Game.robot = {};

Game.reset = function() {
  Game.shop = {
    money: 0,
    usedCupCount: 0,
    usedDrink: {
      "black tea": 0,
      "green tea": 0,
    },
    prices: {
      "black tea": 20,
      "green tea": 20,
    }
  }
  Game.robot.holding = null;
  Game.robot.served = [];
}

Game.robot.getCup = function() {
  console.log("getCup");
  Game.robot.holding = {class: "cup"};
}

Game.robot.fillCupWith = function(drink) {
  console.log("fillCupWith");
  if (!Game.robot.holding) {
    console.log("game error: robot not holding anything");
    return;
  }
  if (Game.robot.holding.class !== "cup") {
    console.log("game error: robot not holding a cup");
    return;
  }
  if (!!Game.robot.holding.isCovered) {
    console.log("game error: cup has been covered");
    return;
  }
  Game.robot.holding.filled = drink; // ex: "black tea"
}

Game.robot.coverCup = function(drink) {
  console.log("fillCupWith");
  if (!Game.robot.holding) {
    console.log("game error: robot not holding anything");
    return;
  }
  if (Game.robot.holding.class !== "cup") {
    console.log("game error: robot not holding a cup");
    return;
  }
  Game.robot.holding.isCovered = true;
}

Game.robot.serve = function() {
  if (!Game.robot.holding) {
    console.log("game error: robot not holding anything");
    return;
  }
  Game.robot.served.push(Game.robot.holding);
  Game.robot.holding = null;
}

Game.isLevelDone = function(level) {
  if (level === 1) {
    if (Game.robot.served.length !== 1) {
      if (Game.robot.served.length === 0) {
        console.log("level not done: not serving any drink");
        window.alert("The robot didn't serve any drink :(");
        return false;
      }
      if (Game.robot.served.length > 1) {
        console.log("level not done: should serve only one cup of drink");
        window.alert("The robot served more than 1 cup of drink :(");
        return false;
      }
    }
    if (Game.robot.served[0].filled != "black tea") {
      console.log("level not done: no black tea in the cup");
      window.alert("No black tea in the cup :(");
      return false;
    }
    if (!Game.robot.served[0].isCovered) {
      console.log("level not done: cup not covered");
      window.alert("The cup is not covered :(");
      return false;
    }
    return true;
  }
  return true;
}

