![Blockly Games](https://raw.githubusercontent.com/wiki/google/blockly-games/title.png)

Google's Blockly Games is a series of educational games that teach programming.
It is based on the [Blockly](https://developers.google.com/blockly/) library.
All code is free and open source.

**The games are at https://blockly-games.appspot.com/**

**The developer's site is at https://github.com/google/blockly-games/wiki**

## 基本開發流程
* 官方wiki(務必閱讀): https://github.com/google/blockly-games/wiki
* Getting Started
    * 安裝google cloud SDK
    * fork and clone blockly games
    * $ cd blockly-games; make maze-en
        * 這樣會壓縮maze-en的code進到用來serve的compressed.js
    * $ cd appengine; dev_appserver.py app.yaml
        * 這一行是啟動localhost的server
    * go to http://localhost:8080/
* Config
    * 設定 Debug mode (這樣會直接serve uncompressed js file 就不用每改一點就要壓縮一次)
        * go to http://localhost:8080/dubug
        * check "Use slow uncompressed code. (Hackers only.)"
* Deploy to Google Cloud
    * $ cd appengine
    * $ gcloud app deploy

## 被修改的blockly-games的code
* appengine/js/lib-dialogs.js:351
    * Add `* @suppress {checkVars}`
* appengine/js/lib-interface.js:42
    * Add `* @suppress {checkVars}`
* appengine/js/lib-games.js:182
* appengine/genetics/js/blocks.js:405
    * Add `* @suppress {checkVars}`
* appengine/common/boot.js
    * change false to true

## Maze
* 每次進入新關卡時，會透過url傳入level，maze.js裡會根據level拿相應的地圖和設置
* 每一關能用哪些block是在哪裡定義的？
    * appengine/maze/template.soy 的最下面 Toolboxes for each level
* 新增積木的方法
    * 在`block.js`增加 block 的定義，其中message0: BlocklyGames.getMsg('Maze_moveForward'), 的 'Maze_moveForward' 是在 `template.soy` 的 {template .messages} 定義的，而文字是在 `en.json`, `zh-hant.json`, ... 裡面定義的
    * block 的 code對應的function是定義在 maze.js 裡，例如

    ```
    Maze.move = function(direction, id) {
        ...
    };
    ```

    最後還要用以下的code來inject到global scope

    ```
    Maze.initInterpreter = function(interpreter, scope) {
        // API
        var wrapper;
        wrapper = function(id) {
            Maze.move(0, id.toString());
        };
        interpreter.setProperty(scope, 'moveForward',
            interpreter.createNativeFunction(wrapper));
        ...
    }
    ```

* Blockly Games有預設每個課程的關卡上限是10，這是在 `lib-games.js` 裡的 `BlocklyGames.MAX_LEVEL = 10;` 定義的，可修改

## Duplicate 遊戲
* 步驟：
    * 先建立一個空殼 appengine/xxx.html
    * 把空殼中的 <body> 中要用到的files放在 appengine/xxx/yyy （可以複製現有的，例如index, maze, pond）
    * 寫 Makefile
        * Edit USER_APPS, ALL_JSON, ALL_TEMPLATES
        * Add xxx-en (可加可不加，加了可以單獨測試英文版的xxx)
    * 修改 appengine/xxx/template.soy 的 Namespace （例如 Index.soy） 等
    * 修改 appengine/xxx/js/xxx.js

## 創建新遊戲
* **重要** template裡面的註解會作為SoyDoc，一定要加
    ```
    /**
    * Web page structure.
    */
    {template .start}
    ```

## 執行blockly code
* Note: Maze 裡面的 initInterpreter 裡面的wrapper，貌似是把像 moveForward() 這樣原本沒定義的global function 連結到(轉換？) Maze.move(0, id.toString()); 所以當 execute moveForward 的時候就會執行 Maze.move(0, id.toString()) ，但像是if, else, while 就不需要做這層轉換
* https://developers.google.com/blockly/guides/app-integration/running-javascript
* interpreter 似乎不支援window, console


## Template.soy
* 在template.soy的開頭會寫 `{namespace Maze.soy}` 代表建立了 Maze.soy 這個namespace
* 會在 maze.js 裡面用 goog.require('Maze.soy'); 來引入 template.soy的東西
* 似乎是template.soy先轉換成js code再被 maze.js require

## Trivial Notes
* 為了i18n, block的文字不直接定義在js裡，而是用一個key，然後在Template.soy裡面定義key對應到en.json裡的文字

## i18n
* message: 所有會用到的文字，都稱為massage, msg
* /json/xx.json: blockly games 用到的文字
    * workflow:
        1. 在 /json/xx.js 定義文字
        2. 在template.soy 開一個 messages 區塊，引入文字
        3. 在blocks.js裡抓取 template.soy 裡面的message
    * 總之必須靠 template.soy 銜接 blocks.js and xx.js

* /appengine/third-party/msg/js/xx.js: 通用block內部顯示的文字
    * e.g. ```Blockly.Msg.CONTROLS_REPEAT_TITLE = "repeat %1 times";```
* /appengine/third-party/msg/json/xx.json: 通用block的tooltip
    * e.g.
    ```js
    {
        ...
    	"CONTROLS_REPEAT_HELPURL": "https://en.wikipedia.org/wiki/For_loop",
	    "CONTROLS_REPEAT_TITLE": "repeat %1 times",
        "CONTROLS_REPEAT_TOOLTIP": "Do some statements several times.",
        ...
    }
    ```
## 使用通用blocks
* 以使用loops相關的blocks為例，在我們的 `blocks.js` 裡加入以下兩行
    ```js
    goog.require('Blockly.Blocks.loops');
    goog.require('Blockly.JavaScript.loops');
    ```
    其中， `Blockly.JavaScript.loops` 是 `code generator` 用來把 block 轉換成 JavaScript code。
    定義在 `third-part/blockly/generators/javascript`。

## Toolbox (Blocks)
* 基本結構
    ```
    {template .toolbox}
        <xml id="toolbox" style="display: none;">
            <block type="test_helloWorld"></block>
        </xml>
    {/template}
    ```
* root層級不可同時有category和block

## 進入下一關的方法：
* 正常的關卡進入下一關的方法：
    1. 在 `<game>.js` 裡面呼叫 `BlocklyDialogs.congratulation` (in `lib-dialogs.js`)
    2. 在恭喜畫面按 OK 會呼叫 BlocklyInterface.nextLevel (in `lib-interface.js`)
* Maze 裡面 BlocklyInterface.nextLevel 有被重新定義，為了配合 skin 的指定
* Maze 裡面，執行code時，會把動作 push 進 Maze.log 裡，然後在 Maze.animate 裡根據 log 來做事，包含跳出恭喜畫面。

## 儲存 blocks
* 在過關時執行以下code
    ```js
    
    ```
* template.soy 裡面必須有
    ```
    {call BlocklyGames.soy.dialog /}
    {call BlocklyGames.soy.doneDialog /}
    {call BlocklyGames.soy.abortDialog /}
    {call BlocklyGames.soy.storageDialog /}
    ```

## 讀取 blocks
* 在關卡 init 時執行以下code
    ```js
    var defaultXml = '';
    BlocklyInterface.loadBlocks(defaultXml, false);
    ```
    可以從local storage拿積木




# Problems to Solve
* 如何讓通用的積木定義一次，就能被各個頁面存取，例如if
* 如何動態載入需要的積木，而不是寫死在template.soy裡
* 如何把generator隔離開，並支援多種語言（執行時還是用JavaScript，但也許能compile成Python讓學生學習）

# TODO
* 嘗試製作一個新遊戲
* toolbox的內容寫在 js 裡，不寫在template.soy裡
* 帳號系統
* Code 儲存

# Done
* 總之先把各種積木嵌進去，別管code漂不漂亮
* 嘗試讓積木可以寫在一個地方，並被多個關卡或遊戲存取
