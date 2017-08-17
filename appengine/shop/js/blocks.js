/**
 * Self-Defined Blocks
 */

'use strict';

goog.provide('Shop.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');

// goog.require('Blockly.Blocks.colour');  // Deprecated
// goog.require('Blockly.Constants.Colour');
// goog.require('Blockly.JavaScript.colour');

// goog.require('Blockly.Blocks.lists');  // Deprecated
// goog.require('Blockly.Constants.Lists');
// goog.require('Blockly.JavaScript.lists');

// goog.require('Blockly.Blocks.logic');  // Deprecated
// goog.require('Blockly.Constants.Logic');
// goog.require('Blockly.JavaScript.logic');

// goog.require('Blockly.Blocks.loops');  // Deprecated
// goog.require('Blockly.Constants.Loops');
// goog.require('Blockly.JavaScript.loops');

// goog.require('Blockly.Blocks.math');  // Deprecated
// goog.require('Blockly.Constants.Math');
// goog.require('Blockly.JavaScript.math');

// goog.require('Blockly.Blocks.procedures');
// goog.require('Blockly.JavaScript.procedures');

// goog.require('Blockly.Blocks.texts');  // Deprecated
// goog.require('Blockly.Constants.Text');
// goog.require('Blockly.JavaScript.texts');

// goog.require('Blockly.Blocks.variables');  // Deprecated.
// goog.require('Blockly.Constants.Variables');
// goog.require('Blockly.JavaScript.variables');


var Scope_Blocks = Shop.Blocks;

/**
 * Common HSV hue
 */
Scope_Blocks.MOVEMENT_HUE = 290;
Scope_Blocks.LOOPS_HUE = 120;
Scope_Blocks.LOGIC_HUE = 210;

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['DrinkShop_getNewCup'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_getNewCup'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_getNewCup')
    });
  }
}
Blockly.JavaScript['DrinkShop_getNewCup'] = function(block) {
  // return 'robot.getNewCup();\n';
  return 'getNewCup();\n';
  // return 'window.alert(\'Hello World!\');\n';
  // return 'console.log(\'Hello World!\');\n';
};

Blockly.Blocks['DrinkShop_fillCupWith'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_fillCupWith') + " %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "drink_dropdown",
          "options": [
            [ BlocklyGames.getMsg('DrinkShop_blackTea'), "black tea" ],
            [ BlocklyGames.getMsg('DrinkShop_greenTea'), "green tea" ],
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_fillCupWith'),
    });
  }
}
Blockly.JavaScript['DrinkShop_fillCupWith'] = function(block) {
  var drink_str = block.getFieldValue('drink_dropdown');
  // var value_drink_str = Blockly.JavaScript.valueToCode(block, 'drink_str', Blockly.JavaScript.ORDER_ATOMIC);

  return 'fillCupWith("' + drink_str + '");\n';
  // return 'window.alert("' + drink_str + '");\n';
};

Blockly.Blocks['DrinkShop_fillCupWithVolume'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_fillCupWithVolume') + " %1 %2 ml",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "drinkType",
          "options": [
            [ BlocklyGames.getMsg('DrinkShop_blackTea'), "black tea" ],
            [ BlocklyGames.getMsg('DrinkShop_greenTea'), "green tea" ],
            [ BlocklyGames.getMsg('DrinkShop_milk'), "milk" ],
            [ BlocklyGames.getMsg('DrinkShop_ice'), "ice" ],
            [ BlocklyGames.getMsg('DrinkShop_boba'), "boba" ],
          ]
        },
        {
          "type": "field_number",
          "name": "volume",
          "value": 500,
          "min": 0
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_fillCupWithVolume'),
    });
  }
}
Blockly.JavaScript['DrinkShop_fillCupWithVolume'] = function(block) {
  var drinkType = block.getFieldValue('drinkType');
  var volume = block.getFieldValue('volume');
  // var value_drink_str = Blockly.JavaScript.valueToCode(block, 'drink_str', Blockly.JavaScript.ORDER_ATOMIC);

  return 'fillCupWithVolume("' + drinkType + '", ' + volume + ');\n';
  // return 'window.alert("' + drink_str + '");\n';
};

Blockly.Blocks['DrinkShop_coverCup'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_coverCup'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_coverCup')
    });
  }
}
Blockly.JavaScript['DrinkShop_coverCup'] = function(block) {
  return 'coverCup();\n';
  // return 'window.alert(\'Hello World!\');\n';
};

Blockly.Blocks['DrinkShop_serve'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_serve'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_serve')
    });
  }
}
Blockly.JavaScript['DrinkShop_serve'] = function(block) {
  return 'serve();\n';
  // return 'window.alert(\'Hello World!\');\n';
};
