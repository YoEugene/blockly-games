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
