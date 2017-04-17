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


## 創建新頁面
* 步驟：
    * 先建立一個空殼 appengine/xxx.html
    * 把空殼中的 <body> 中要用到的files放在 appengine/xxx/yyy （可以複製現有的，例如index, maze, pond）
    * 寫 Makefile
        * Edit USER_APPS, ALL_JSON, ALL_TEMPLATES
        * Add xxx-en (可加可不加，加了可以單獨測試英文版的xxx)
    * 修改 appengine/xxx/template.soy 的 Namespace （例如 Index.soy） 等
    * 修改 appengine/xxx/js/xxx.js
