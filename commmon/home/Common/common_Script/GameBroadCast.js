(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/home/Common/common_Script/GameBroadCast.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e5a0ascuohHyqVM1tBNGL4E', 'GameBroadCast', __filename);
// home/Common/common_Script/GameBroadCast.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataManager_1 = require("../../../Script/data/DataManager");
var MKUtils_1 = require("../../../Script/common/MKUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameBroadCast = /** @class */ (function (_super) {
    __extends(GameBroadCast, _super);
    function GameBroadCast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.maskNode = null;
        _this.broadCastTips = [];
        _this.startPos = null;
        _this.isPlaying = false;
        _this.richTextLengh = 400;
        _this.type = 0;
        _this.callBackFunc = null;
        return _this;
    }
    GameBroadCast.prototype.onLoad = function () {
        var richtext = MKUtils_1.default.findNode_wx_ThreeKing_ByName(this.node, "richtext");
        this.startPos = richtext.getPosition();
        this.node.active = false;
        this.playAni();
    };
    GameBroadCast.prototype.start = function () {
    };
    GameBroadCast.prototype.playAni = function () {
        var richtext = MKUtils_1.default.findNode_wx_ThreeKing_ByName(this.node, "richtext");
        if (this.broadCastTips.length > 0) {
            this.node.active = true;
            this.node.opacity = 0;
            richtext.getComponent(cc.RichText).string = this.broadCastTips[0];
            this.scheduleOnce(this.showAni, 1);
        }
        else {
            this.node.active = false;
        }
    };
    //收到通知显示调用这个共有方法  id = 1 三国数据 else 其他数据
    GameBroadCast.prototype.showBroad = function (data, id) {
        this.type = id;
        this.node.stopAllActions();
        if (id == 1) {
            this.broadCastTips = data;
        }
        else {
            if (!DataManager_1.default.getInstance().broadCast) {
                this.node.active = false;
                return;
            }
            var data_1 = DataManager_1.default.getInstance().broadCast.Param;
            if (data_1 == null || data_1 == undefined || data_1.length == 0) {
                return;
            }
            var lst = [];
            for (var index = 0; index < data_1.length; index++) {
                var text = data_1[index];
                lst.push(text);
            }
            this.broadCastTips = lst;
        }
        if (!this.broadCastTips || this.broadCastTips == undefined) {
            this.node.active = false;
            return;
        }
    };
    GameBroadCast.prototype.showAni = function () {
        var richtext = MKUtils_1.default.findNode_wx_ThreeKing_ByName(this.node, "richtext");
        richtext.setPosition(238, 0);
        var width = 0;
        if (this.type == 1) {
            width = this.richTextLengh;
        }
        else {
            width = richtext.width;
        }
        var timeW = Math.floor(width / 80);
        var moveToStartPos = cc.moveTo(0.01, this.startPos);
        var moveTo = cc.moveTo(timeW + 5, cc.v2(-richtext.getPosition().x - width, 0));
        var callFunc = cc.callFunc(function () {
            var fadeIn = cc.fadeIn(0.5);
            this.node.runAction(fadeIn);
        }, this);
        var callFunc1 = cc.callFunc(function () {
            if (this.broadCastTips.length >= 1) {
                richtext.getComponent(cc.RichText).string = this.broadCastTips[0];
                this.broadCastTips.shift();
                this.scheduleOnce(this.showAni, 1);
            }
            else {
                var fadeOut = cc.fadeOut(0.2);
                this.node.runAction(fadeOut);
                richtext.getComponent(cc.RichText).string = "";
                this.broadCastTips = [];
                if (this.type == 1) {
                    if (this.callBackFunc != null) {
                        this.callBackFunc();
                    }
                }
                else {
                    DataManager_1.default.getInstance().setHomeShowBroad(false);
                }
                this.node.removeFromParent(true);
            }
        }, this);
        var seq = cc.sequence(callFunc, moveToStartPos, moveTo, callFunc1);
        richtext.setPosition(this.startPos);
        richtext.runAction(seq);
    };
    GameBroadCast.prototype.setCallBack = function (callBackFunc) {
        this.callBackFunc = callBackFunc;
    };
    GameBroadCast.prototype.Hide = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Label)
    ], GameBroadCast.prototype, "label", void 0);
    __decorate([
        property(cc.Node)
    ], GameBroadCast.prototype, "maskNode", void 0);
    __decorate([
        property
    ], GameBroadCast.prototype, "broadCastTips", void 0);
    GameBroadCast = __decorate([
        ccclass
    ], GameBroadCast);
    return GameBroadCast;
}(cc.Component));
exports.default = GameBroadCast;

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
        //# sourceMappingURL=GameBroadCast.js.map
        