goog.provide('Shop.Game.UI');
goog.require('Blockly');

var UI = Shop.Game.UI;

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

UI.init = function() {
  var scale = 100;
  var middleX = scale / 2;
  var middleY = scale / 2;

  UI.svg = document.getElementById('svgShop');
  var scale = 100;
  UI.svg.setAttribute('viewBox', '0 0 ' + scale + ' ' + scale);

  UI.drawn = {};

  UI.settings = {};

  UI.settings.background = {
    element: 'rect',
    attributes: {
      'width': 100,
      'height': 100,
      'fill': '#eee',
      'stroke-width': 0.5,
      'stroke': '#ccc',
    }
  };

  UI.settings.workspace = {
    element: 'g',
    attributes: {}
  };

  UI.settings.cup = {
    topWidth: 50,
    bottomWidth: 35,
    height: 60,
    element: 'polygon',
    attributes:{
      'fill': 'rgba(0, 0, 0, 0)',
      'stroke': '#fff',
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-alignment': 'outer',
    }
  }
  var cup = UI.settings.cup;
  cup.topleftX = middleX - UI.settings.cup.topWidth / 2;
  cup.topY = middleY - UI.settings.cup.height / 2;
  cup.toprightX = middleX + UI.settings.cup.topWidth / 2;
  cup.bottomrightX = middleX + UI.settings.cup.bottomWidth / 2;
  cup.bottomY = middleY + UI.settings.cup.height / 2;
  cup.bottomleftX = middleX - UI.settings.cup.bottomWidth / 2;
  cup.attributes.points = '{0},{1} {2},{1} {3},{4} {5},{4}'.format(
    cup.topleftX,
    cup.topY,
    cup.toprightX,
    cup.bottomrightX,
    cup.bottomY,
    cup.bottomleftX
  );

  UI.settings.cupLight = {
    ratio: 0.625,
    element: 'line',
  };
  var ratio = UI.settings.cupLight.ratio;
  UI.settings.cupLight.attributes = {
    x1: middleX + UI.settings.cup.topWidth / 2 * ratio,
    y1: middleY - UI.settings.cup.height / 2 * ratio,
    x2: middleX + UI.settings.cup.bottomWidth / 2 * ratio,
    y2: middleY + UI.settings.cup.height / 2 * ratio,
    'stroke': 'rgba(255, 255, 255, 0.5)',
    'stroke-width': 4,
    'stroke-linecap': 'round',
  }

  // var cup = UI.settings.cup;
  UI.settings.cupCap = {
    topWidth: 50,
    bottomWidth: 55,
    height: 10,
    element: 'polygon',
  }
  var cupCap = UI.settings.cupCap;
  UI.settings.cupCap.attributes = {
    points: '{0},{1} {2},{1} {3},{4} {5},{4}'.format(
      middleX - cupCap.topWidth / 2,
      cup.topY - cupCap.height / 2,
      middleX + cupCap.topWidth / 2,
      middleX + cupCap.bottomWidth / 2,
      cup.topY + cupCap.height / 2,
      middleX - cupCap.bottomWidth / 2
    ),
    'fill': '#ddd',
  }

  UI.settings.hand = {
    color: '#ffc57b',
    fingerWidth: 5,
  }
  UI.settings.hand.elements = [
    {
      element: 'line',
      attributes: {
        x1: 50,
        y1: 50,
        x2: scale,
        y1: 50,
      }
    }
  ]

  UI.drawObject('background', UI.svg);
  UI.workspace = UI.drawObject('workspace', UI.svg);
  UI.drawn = {};
};

UI.reset = function() {
  UI.cleanWorkspace();
  UI.drawn = {};
}

// private

UI.drawObject = function(objName, parent) {
  var object = UI.settings[objName];
  var attributes = object.attributes;
  var shape = document.createElementNS(Blockly.SVG_NS, object.element);
  Object.keys(object.attributes).map(function(attributeName) {
    shape.setAttribute(attributeName, object.attributes[attributeName]);
  });
  parent.appendChild(shape);
  return shape;
}

UI.removeChildren = function(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// public

UI.cleanWorkspace = function() {
  UI.removeChildren(UI.workspace);
}

UI.drawCup = function() {
  UI.drawn.cup = UI.drawObject('cup', UI.workspace);
  UI.drawObject('cupLight', UI.workspace);
}

UI.fillCup = function(color) {
  UI.drawn.cup.setAttribute('fill', color);
}

UI.drawCupCap = function(color) {
  UI.drawObject('cupCap', UI.workspace);
}
