(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/home/Common/common_Script/GameData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '479a8LfJsJHTbK13l4MeDex', 'GameData', __filename);
// home/Common/common_Script/GameData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GlbData = /** @class */ (function () {
    function GlbData() {
    }
    GlbData.HEAD_URL = "http://images.qp.games.weibo.com/";
    return GlbData;
}());
exports.GlbData = GlbData;
// 结果data
var GameResultData = /** @class */ (function () {
    function GameResultData() {
        this.selfScore = 0;
        this.otherScore = 0;
        this.createType = 0;
        this.winType = 0;
        this.playerExitType = 0;
        this.scoresPercent = 0;
        this.pkCount = 0;
        this.winCount = 0;
        this.otherPlayercount = 0;
        this.bestLines = 0;
    }
    return GameResultData;
}());
exports.GameResultData = GameResultData;
// 玩家信息
var PlayerData = /** @class */ (function () {
    function PlayerData() {
        this.playerID = 0;
        this.playerHeadPath = "";
        this.playerName = "";
        this.playerAge = 0;
        this.playerCity = "";
        this.playerSex = 0;
        this.otherID = 0;
        this.otherCity = "";
        this.otherName = "";
        this.otherAge = 0;
        this.otherHead = "";
        this.otherSex = 0;
    }
    return PlayerData;
}());
exports.PlayerData = PlayerData;
var ShowData = /** @class */ (function () {
    function ShowData() {
    }
    return ShowData;
}());
exports.ShowData = ShowData;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameData.js.map
        