(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/home/Common/common_Script/TipsScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '623f4vGy7lGja2AUEo6sB+L', 'TipsScene', __filename);
// home/Common/common_Script/TipsScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: qinsj
 * Date: 2018.11.1
 * @export
 * @class TipsScene tips 界面
 * @extends {cc.Component}
 */
var GamesCommonLogic_1 = require("../../../Script/logic/GamesCommonLogic");
var MKSound_1 = require("../../../Script/common/MKSound");
var MKUtils_1 = require("../../../Script/common/MKUtils");
var DataManager_1 = require("../../../Script/data/DataManager");
var Constant_1 = require("../../../Script/common/Constant");
var Event_1 = require("../../../Script/event/Event");
var EvenID_1 = require("../../../Script/event/EvenID");
exports.handerType = cc.Enum({
    continueGame: 0,
    findPlayer: 1,
    exit: 2,
});
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TipsScene = /** @class */ (function (_super) {
    __extends(TipsScene, _super);
    function TipsScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tipslabel = null;
        _this.btnSure = null;
        _this.btnCancel = null;
        _this.clickSound = null;
        _this.bg = null;
        _this.bgSp = null;
        _this.header = null;
        _this.tager = null;
        _this.handerExit = [];
        _this.isSingel = false; //是否是单机游戏
        return _this;
    }
    TipsScene.prototype.start = function () {
        var curSence = cc.director.getScene();
        if (curSence.name == "brave") {
            // let size = curSence.getContentSize();
            // cc.log("");
            // this.bgSp.node.setContentSize(size);
        }
        else {
            this.bgSp.node.scaleX = MKUtils_1.default.getShowScale().x;
            this.bgSp.node.scaleY = MKUtils_1.default.getShowScale().y;
        }
        this.handerExit = GamesCommonLogic_1.default.getInstance().getHeader();
        this.chickGameType();
    };
    TipsScene.prototype.initTipsValue = function (tips) {
        cc.log("TipsScene tips ");
        if (tips) {
            this.tipslabel.string = tips;
            this.tipslabel.enableWrapText = true;
        }
    };
    //传入一个回调函数
    TipsScene.prototype.initTipsExit = function (exit) {
        cc.log("TipsScene initTipsExit");
        if (exit) {
            this.header = exit;
        }
    };
    TipsScene.prototype.onBntExit = function () {
        cc.log(" send exit ");
        MKSound_1.default.play_wx_ThreeKing_SFX(this.clickSound);
        if (!this.isSingel) {
            this.handerExit[exports.handerType.exit]();
        }
        else {
            cc.director.loadScene("Home");
        }
    };
    TipsScene.prototype.onCancel = function () {
        cc.log(" send cancel ");
        MKSound_1.default.play_wx_ThreeKing_SFX(this.clickSound);
        this.node.removeFromParent();
        if (this.isSingel) {
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SEND_CITYCAR_SIGNEL_EXIT);
        }
    };
    TipsScene.prototype.chickGameType = function () {
        var curGameID = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(curGameID);
        if (!config) {
            return;
        }
        var enterType = config["enterType"];
        if (enterType == Constant_1.default.GameEnterType.SINGEL) {
            this.isSingel = true;
        }
    };
    __decorate([
        property(cc.Label)
    ], TipsScene.prototype, "tipslabel", void 0);
    __decorate([
        property(cc.Button)
    ], TipsScene.prototype, "btnSure", void 0);
    __decorate([
        property(cc.Button)
    ], TipsScene.prototype, "btnCancel", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], TipsScene.prototype, "clickSound", void 0);
    __decorate([
        property(cc.Node)
    ], TipsScene.prototype, "bg", void 0);
    __decorate([
        property(cc.Sprite)
    ], TipsScene.prototype, "bgSp", void 0);
    TipsScene = __decorate([
        ccclass
    ], TipsScene);
    return TipsScene;
}(cc.Component));
exports.default = TipsScene;

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
        //# sourceMappingURL=TipsScene.js.map
        