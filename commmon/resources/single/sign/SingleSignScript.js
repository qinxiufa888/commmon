(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/sign/SingleSignScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1a85bB2fJxGw411OfpPTQl2', 'SingleSignScript', __filename);
// resources/single/sign/SingleSignScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var SDKManager_1 = require("../../../Script/logic/SDKManager");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SingleSignScript = /** @class */ (function (_super) {
    __extends(SingleSignScript, _super);
    function SingleSignScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.day = [];
        _this.getBtn = null;
        _this.sureBtn = null;
        _this.dayNumFrame_0 = [];
        _this.dayNumFrame_1 = [];
        _this.dayNumFrame_2 = [];
        _this.boardFrame_0 = [];
        _this.boardFrame_1 = [];
        _this.getFrame = [];
        _this.gemIconFrame = [];
        _this.allSound = [];
        _this.gemLabelFont = [];
        _this.signData = null;
        return _this;
    }
    SingleSignScript.prototype.WX_ThreeKingFun_eifjr1ac = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleSignScript.prototype.onLoad = function () {
        this.initUI();
        this.refreshView();
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function () {
            SDKManager_1.default.getInstance().createBannerAd(4);
        }, this.node)));
    };
    SingleSignScript.prototype.start = function () {
    };
    SingleSignScript.prototype.WX_ThreeKingFun_eifjr5941ac = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleSignScript.prototype.onDestroy = function () {
    };
    SingleSignScript.prototype.WX_ThreeKingFun_e2143rifjr1ac = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleSignScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.getBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().signReward();
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.getBtn.node);
        this.sureBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.sureBtn.node);
    };
    SingleSignScript.prototype.WX_ThreeKingFun_eifjr1defdrewac = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleSignScript.prototype.setSignData = function (data) {
        this.signData = data;
        cc.log("setSignData---", this.signData);
    };
    SingleSignScript.prototype.WX_ThreeKingFun_489187edfc = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleSignScript.prototype.refreshView = function () {
        if (this.signData) {
            var curDay = this.signData.CurDay + 1;
            for (var i = 0; i < this.signData.Shows.length; i++) {
                var data = this.signData.Shows[i];
                var item = this.day[i];
                item.active = true;
                item.getChildByName("numLabel").getComponent(cc.Label).string = "x" + data.Gem;
                if (data.Day < curDay) { //前几天的
                    item.getChildByName("board").getComponent(cc.Sprite).spriteFrame = (i != 6) ? (this.boardFrame_0[1]) : (this.boardFrame_1[1]);
                    item.getChildByName("day").getComponent(cc.Sprite).spriteFrame = this.dayNumFrame_1[data.Day - 1];
                    item.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = this.gemIconFrame[1];
                    item.getChildByName("get").getComponent(cc.Sprite).spriteFrame = this.getFrame[1];
                    item.getChildByName("get").active = true;
                    if (this.gemLabelFont.length >= 2) {
                        item.getChildByName("numLabel").getComponent(cc.Label).font = this.gemLabelFont[1];
                    }
                    else {
                        item.getChildByName("numLabel").color = cc.color(218, 156, 11, 256);
                    }
                }
                else if (data.Day == curDay) { //今天
                    item.getChildByName("board").getComponent(cc.Sprite).spriteFrame = (i != 6) ? (this.boardFrame_0[2]) : (this.boardFrame_1[2]);
                    item.getChildByName("day").getComponent(cc.Sprite).spriteFrame = this.dayNumFrame_2[data.Day - 1];
                    item.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = this.gemIconFrame[2];
                    item.getChildByName("get").getComponent(cc.Sprite).spriteFrame = this.getFrame[2];
                    item.getChildByName("get").active = this.signData.HasGet == 1;
                    if (this.gemLabelFont.length >= 2) {
                        item.getChildByName("numLabel").getComponent(cc.Label).font = this.gemLabelFont[2];
                    }
                    else {
                        item.getChildByName("numLabel").color = cc.color(98, 161, 6, 256);
                    }
                }
                else { //之后的
                    item.getChildByName("board").getComponent(cc.Sprite).spriteFrame = (i != 6) ? (this.boardFrame_0[0]) : (this.boardFrame_1[0]);
                    item.getChildByName("day").getComponent(cc.Sprite).spriteFrame = this.dayNumFrame_0[data.Day - 1];
                    item.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = this.gemIconFrame[0];
                    item.getChildByName("get").active = false;
                    if (this.gemLabelFont.length >= 2) {
                        item.getChildByName("numLabel").getComponent(cc.Label).font = this.gemLabelFont[0];
                    }
                    else {
                        item.getChildByName("numLabel").color = cc.color(177, 145, 95, 256);
                    }
                }
            }
            this.getBtn.node.active = this.signData.HasGet == 0;
            this.sureBtn.node.active = this.signData.HasGet != 0;
        }
    };
    SingleSignScript.prototype.WX_ThreeKingFun_e32r1de3rac = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    __decorate([
        property(cc.Sprite)
    ], SingleSignScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Node)
    ], SingleSignScript.prototype, "day", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleSignScript.prototype, "getBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleSignScript.prototype, "sureBtn", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleSignScript.prototype, "dayNumFrame_0", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleSignScript.prototype, "dayNumFrame_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleSignScript.prototype, "dayNumFrame_2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleSignScript.prototype, "boardFrame_0", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleSignScript.prototype, "boardFrame_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleSignScript.prototype, "getFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleSignScript.prototype, "gemIconFrame", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleSignScript.prototype, "allSound", void 0);
    __decorate([
        property(cc.Font)
    ], SingleSignScript.prototype, "gemLabelFont", void 0);
    SingleSignScript = __decorate([
        ccclass
    ], SingleSignScript);
    return SingleSignScript;
}(cc.Component));
exports.default = SingleSignScript;

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
        //# sourceMappingURL=SingleSignScript.js.map
        