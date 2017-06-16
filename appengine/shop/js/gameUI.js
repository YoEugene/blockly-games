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
      'fill': '#F1EEE7',
      'stroke-width': 0.5,
      'stroke': '#CCB',
    }
  };

  UI.settings.cup = {
    topWidth: 50,
    bottomWidth: 35,
    height: 60,
    element: 'polygon',
    attributes:{
      'fill': '#eee',
      'stroke': '#fff',
      'stroke-width': 2,
      'stroke-linecap': 'round',
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
  cup.attributes.points = "{0},{1} {2},{1} {3},{4} {5},{4}".format(
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
    'stroke': "rgba(255, 255, 255, 0.5)",
    'stroke-width': 4,
    'stroke-linecap': 'round',
  }

  // var cup = UI.settings.cup;
  UI.settings.cupCover = {
    topWidth: 50,
    bottomWidth: 55,
    height: 10,
    element: 'polygon',
  }
  var cupCover = UI.settings.cupCover;
  UI.settings.cupCover.attributes = {
    points: "{0},{1} {2},{1} {3},{4} {5},{4}".format(
      middleX - cupCover.topWidth / 2,
      cup.topY - cupCover.height / 2,
      middleX + cupCover.topWidth / 2,
      middleX + cupCover.bottomWidth / 2,
      cup.topY + cupCover.height / 2,
      middleX - cupCover.bottomWidth / 2
    ),
    'fill': '#ddd',
  }

  UI.clean();
};

UI.drawObject = function(objName) {
  var object = UI.settings[objName];
  var attributes = object.attributes;
  var shape = document.createElementNS(Blockly.SVG_NS, object.element);
  Object.keys(object.attributes).map(function(attributeName) {
    shape.setAttribute(attributeName, object.attributes[attributeName]);
  });
  UI.svg.appendChild(shape);
  UI.drawn[objName] = shape;
}

UI.clean = function() {
  // make svg empty
  while (UI.svg.firstChild) {
    UI.svg.removeChild(UI.svg.firstChild);
  }
  UI.drawObject("background");
}

UI.drawCup = function() {
  UI.drawObject("cup");
  UI.drawObject("cupLight");
}

UI.fillCup = function(color) {
  UI.drawn.cup.setAttribute('fill', color);
}

UI.drawCupCover = function(color) {
  UI.drawObject("cupCover");
}
