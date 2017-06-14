/**
 * Self-Defined Blocks
 */

'use strict';

goog.provide('Shop.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');

goog.require('Blockly.Blocks.colour');  // Deprecated
goog.require('Blockly.Constants.Colour');
goog.require('Blockly.JavaScript.colour');

goog.require('Blockly.Blocks.lists');  // Deprecated
goog.require('Blockly.Constants.Lists');
goog.require('Blockly.JavaScript.lists');

goog.require('Blockly.Blocks.logic');  // Deprecated
goog.require('Blockly.Constants.Logic');
goog.require('Blockly.JavaScript.logic');

goog.require('Blockly.Blocks.loops');  // Deprecated
goog.require('Blockly.Constants.Loops');
goog.require('Blockly.JavaScript.loops');

goog.require('Blockly.Blocks.math');  // Deprecated
goog.require('Blockly.Constants.Math');
goog.require('Blockly.JavaScript.math');

goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.JavaScript.procedures');

goog.require('Blockly.Blocks.texts');  // Deprecated
goog.require('Blockly.Constants.Text');
goog.require('Blockly.JavaScript.texts');

goog.require('Blockly.Blocks.variables');  // Deprecated.
goog.require('Blockly.Constants.Variables');
goog.require('Blockly.JavaScript.variables');


var Scope_Blocks = Shop.Blocks;

/**
 * Common HSV hue
 */
Scope_Blocks.MOVEMENT_HUE = 290;
Scope_Blocks.LOOPS_HUE = 120;
Scope_Blocks.LOGIC_HUE = 210;

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['test_helloWorld'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('Test_helloWorld'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('Test_helloWorld')  // Test_helloWorldToolTip
    });
  }
};

Blockly.JavaScript['test_helloWorld'] = function(block) {
  // Generate JavaScript for moving forward.
  // return 'window.alert(\'Hello World!\');\n';
  return 'alert(\'Hello World!\');\n';
  // return 'console.log(\'Hello World!\');\n';
};

Blockly.Blocks['DrinkShop_getCup'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_getCup'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_getCup')  // Test_helloWorldToolTip
    });
  }
}
Blockly.JavaScript['DrinkShop_getCup'] = function(block) {
  // return 'robot.getCup();\n';
  return 'alert(\'Hello World!\');\n';
};

Blockly.Blocks['DrinkShop_fillCup'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_fillCup'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_fillCup')  // Test_helloWorldToolTip
    });
  }
}
Blockly.JavaScript['DrinkShop_fillCup'] = function(block) {
  // return 'robot.fillCup();\n';
  return 'alert(\'Hello World!\');\n';

};

Blockly.Blocks['DrinkShop_coverCup'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_coverCup'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_coverCup')  // Test_helloWorldToolTip
    });
  }
}
Blockly.JavaScript['DrinkShop_coverCup'] = function(block) {
  // return 'robot.coverCup();\n';
  return 'alert(\'Hello World!\');\n';
};
