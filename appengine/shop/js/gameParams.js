/**
 * Blockly Games: Drink Shop
 */

goog.provide('Shop.Game.Params');

Shop.Game.Params.props = {
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

Shop.Game.Params.levels = [
  // Level 0
  undefined,
  // Level 1
  {
    maxBlocks: 4,
    blocks: ['DrinkShop_getNewCup', 'DrinkShop_fillCupWith', 'DrinkShop_serve', 'DrinkShop_coverCup'],
    desc: "歡迎來到你的飲料店！<br />這裡的員工只有一個人，而且是一個機器人！ <br />你可以對他下各式各樣的指令，讓他幫你做飲料給客人。<br /><br />啊，有客人來了！<br />你可以讓機器人做出一杯紅茶並賣給他嗎？",
    // 歡迎來到你的飲料店！<br />這裡的員工只有一人，而且是一個機器人！ <br />你可以對他下各式各樣的指令，讓他幫你做飲料和賣飲料給客人。<br />事不宜遲，快下指令讓他幫你做一杯紅茶吧！
    goal: "在30秒內製作一杯紅茶並賣給客人。<br />（請將程式積木拉到右邊的程式編輯區，並依照正確順序拼接，然後按下下方的「執行程式」按鈕，讓機器人幫你製作一杯紅茶。）<br /><img src=\"shop/public/hints/zh/level_1_hint.png\" class=\"hint-img\" alt=\"level 1 hint\" width=\"250\">",
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
      return true;
    },
  },
  {
    maxBlocks: 4,
    blocks: ['DrinkShop_getNewCup', 'DrinkShop_fillCupWith', 'DrinkShop_serve', 'DrinkShop_coverCup'],
    desc: "下一個客人來了<br />現在，讓機器人做出一杯綠茶吧<br />",
    goal: "在30秒內製作一杯綠茶並賣給客人。<br />（你可以點擊程式積木中的選單來選擇參數）<br /><img src=\"shop/public/hints/zh/level_2_hint.png\" class=\"hint-img\" alt=\"level 2 hint\" width=\"250\">",
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
      return true;
    },
  },
];
