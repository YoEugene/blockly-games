/**
 * Blockly Games: Drink Shop
 */

goog.provide('Shop.Game.Config');

Shop.Game.Config.constants = {
  shop: {
    cupCapacities: {
      large: 700,   // 2
      medium: 500,  // 1.428571
      small: 350,   // 1
    },
    prices: {
      blackTea: {
        large: 25,
        medium: 20,
        small: 15,
      },
      greenTea: {
        large: 25,
        medium: 20,
        small: 15,
      },
      milkTea: {
        large: 50,
        medium: 35,
        small: 25,
      },
    },
    materialPrices: {
      blackTea: 0.01,  // $/ml
      greenTea: 0.01,
      milk: 0.02,
    },
  },
  robot: {
    actions: {
      getNewCup: {
        timeSpent: 5, // seconds
      },
      fillCup: {
        timeSpent: 10, // seconds
      },
      coverCup: {
        timeSpent: 5, // seconds
      },
      serve: {
        timeSpent: 5,
      },
    },
  },
};

Shop.Game.Config.levels = [
  // Level 0
  undefined,
  // Level 1
  {
    blocks: ['DrinkShop_getNewCup', 'DrinkShop_fillCupWith', 'DrinkShop_coverCup'],
    goal: "製作一杯紅茶。",
    desc: '請將程式積木拉到右邊空白的程式編輯區，<br />' +
    '並由上到下依照正確順序拼接，<br />' +
    '然後按下下方的「執行程式」按鈕，<br />' +
    '讓機器人幫你製作一杯紅茶。<br />' +
    '<img src=\"shop/public/hints/zh/level_1_hint.png\" class=\"hint-img\" alt=\"level 1 hint\" width=\"250\">',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 30,
        materials: {
          blackTea: 500,
          cup: 1,
        }
      };
    },
    checkComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // not black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_notBlackTea');
      }
      // TODO: check more

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 2
  {
    blocks: ['DrinkShop_getNewCup', 'DrinkShop_fillCupWith', 'DrinkShop_coverCup'],
    goal: "製作一杯綠茶。",
    desc: '你可以點擊程式積木中的選單來選擇不同的飲料。<br />' +
    '<img src="shop/public/hints/zh/level_2_hint.png" class="hint-img" alt="level 2 hint" width="250">',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 30,
        materials: {
          greenTea: 500,
          cup: 1,
        }
      };
    },
    checkComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // not green tea in cup
      if (!cup.filled.hasOwnProperty("green tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_notGreenTea');
      }
      // TODO: check more

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 3
  {
    blocks: ['DrinkShop_getNewCup', 'DrinkShop_fillCupWithVolume', 'DrinkShop_coverCup'],
    goal: "製作一杯奶茶。",
    desc: '你可以輸入不同的數字來改變飲料倒入的量。<br />' +
    '<img src="shop/public/hints/zh/level_3_hint.png" class="hint-img" alt="level 3 hint" width="250">' +
    '杯子的容量是500毫升。<br />' +
    '本店的奶茶，紅茶：牛奶的比例是3:2<br />',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 30,
        materials: {
          greenTea: 500,
          cup: 1,
        }
      };
    },
    checkComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBlackTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }

      // cup not full
      if (cup.filledVolume < 499.9) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea and milk
      if (Object.keys(cup.filled).length > 2) {
        throw Game.levelFailedMessage('DrinkShop_msg_notOnlyBlackTeaAndMilk');
      }

      // not correct proportion
      if (cup.filled["black tea"] !== 300 || cup.filled["milk"] !== 200) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
];
