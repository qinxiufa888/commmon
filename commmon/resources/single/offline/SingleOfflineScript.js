(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/offline/SingleOfflineScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3d59fFAwLhDNYoyPb6ACWml', 'SingleOfflineScript', __filename);
// resources/single/offline/SingleOfflineScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var Constant_1 = require("../../../Script/common/Constant");
var Event_1 = require("../../../Script/event/Event");
var EvenID_1 = require("../../../Script/event/EvenID");
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
var SingleOfflineScript = /** @class */ (function (_super) {
    __extends(SingleOfflineScript, _super);
    function SingleOfflineScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.close = null;
        _this.rewardNode = null;
        _this.infoNode = null;
        _this.doubleInfoNode = null;
        _this.allSound = [];
        _this.offlineData = null;
        return _this;
    }
    SingleOfflineScript.prototype.WX_ThreeKingFun_471ferfrtgtrewhyrnhh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleOfflineScript.prototype.onLoad = function () {
        this.initUI();
        this.refreshView();
        this.bindEvent();
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function () {
            var showHeight = MKUtils_1.default.getShowSize().height;
            var adTopScale = (showHeight / 2 - 320) / showHeight;
            SDKManager_1.default.getInstance().createBannerAd(3, adTopScale);
        }, this.node)));
    };
    SingleOfflineScript.prototype.WX_ThreeKingFun_4fegy488474nhh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleOfflineScript.prototype.start = function () { };
    SingleOfflineScript.prototype.onDestroy = function () {
        cc.log("offline onDestroy");
        this.unbind();
    };
    SingleOfflineScript.prototype.WX_ThreeKingFun_471fgthgr46875487hh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleOfflineScript.prototype.bindEvent = function () {
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE, this.refreshRewardType, this);
    };
    SingleOfflineScript.prototype.unbind = function () {
        Event_1.default.getInstance().removeEventListeners(this);
    };
    SingleOfflineScript.prototype.WX_ThreeKingFun_471fegt4728348375hh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleOfflineScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.close.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.close.node);
        this.rewardNode.active = false;
        this.infoNode.active = false;
        this.doubleInfoNode.active = false;
        //
        this.rewardNode.getChildByName("doubleBtn").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("双倍领取");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().getReward(function () {
                SingleGameLogic_1.default.getInstance().offlineReward(1);
                SDKManager_1.default.getInstance().createBannerAd(0);
                this.node.removeFromParent();
            }.bind(this), function () {
            }.bind(this), 0);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.rewardNode.getChildByName("doubleBtn"));
        this.rewardNode.getChildByName("getBtn").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("立即领取");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().offlineReward(0);
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.rewardNode.getChildByName("getBtn"));
        //
        this.infoNode.getChildByName("doubleBtn").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("点我翻倍");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().getReward(function () {
                SingleGameLogic_1.default.getInstance().offlineDouble();
                this.infoNode.active = false;
                this.doubleInfoNode.active = true;
            }.bind(this), function () {
            }.bind(this), 0);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.infoNode.getChildByName("doubleBtn"));
        this.refreshRewardType();
    };
    SingleOfflineScript.prototype.WX_ThreeKingFun_471ftreg48389374h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleOfflineScript.prototype.refreshRewardType = function () {
        var rewardType = SingleGameLogic_1.default.getInstance().curGetRewardType;
        this.rewardNode.getChildByName("doubleBtn").getChildByName("adIcon").active = rewardType != Constant_1.default.SingleRewardType.SHARE;
        this.rewardNode.getChildByName("doubleBtn").getChildByName("shareIcon").active = rewardType == Constant_1.default.SingleRewardType.SHARE;
        this.infoNode.getChildByName("doubleBtn").getChildByName("adIcon").active = rewardType != Constant_1.default.SingleRewardType.SHARE;
        this.infoNode.getChildByName("doubleBtn").getChildByName("shareIcon").active = rewardType == Constant_1.default.SingleRewardType.SHARE;
    };
    SingleOfflineScript.prototype.WX_ThreeKingFun_471ftdferwfreg48389374h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleOfflineScript.prototype.setOfflineData = function (data) {
        this.offlineData = data;
    };
    SingleOfflineScript.prototype.WX_ThreeKingFun_fr5gtegtr9374h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleOfflineScript.prototype.refreshView = function () {
        var oneHourGem = this.offlineData.GemFiveMin * 12;
        if (this.offlineData.Gem > 0) { //可以领取
            this.rewardNode.active = true;
            this.rewardNode.getChildByName("numLabel").getComponent(cc.Label).string = "x" + this.offlineData.Gem;
            this.rewardNode.getChildByName("doubleBtn").getChildByName("infoLabel").getComponent(cc.Label).string = "x" + this.offlineData.Gem * 2;
        }
        else {
            this.infoNode.getChildByName("infoLabel").getComponent(cc.Label).string = "" + oneHourGem + "/小时";
            this.infoNode.getChildByName("doubleBtn").getChildByName("infoLabel").getComponent(cc.Label).string = "" + oneHourGem * 2 + "/小时";
            this.doubleInfoNode.getChildByName("infoLabel").getComponent(cc.Label).string = "" + oneHourGem * 2 + "/小时";
            if (this.offlineData.Flag == 1) { //已经翻倍了
                this.doubleInfoNode.active = true;
            }
            else {
                this.infoNode.active = true;
            }
        }
    };
    SingleOfflineScript.prototype.WX_ThreeKingFun_getq486864h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    __decorate([
        property(cc.Sprite)
    ], SingleOfflineScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleOfflineScript.prototype, "close", void 0);
    __decorate([
        property(cc.Node)
    ], SingleOfflineScript.prototype, "rewardNode", void 0);
    __decorate([
        property(cc.Node)
    ], SingleOfflineScript.prototype, "infoNode", void 0);
    __decorate([
        property(cc.Node)
    ], SingleOfflineScript.prototype, "doubleInfoNode", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleOfflineScript.prototype, "allSound", void 0);
    SingleOfflineScript = __decorate([
        ccclass
    ], SingleOfflineScript);
    return SingleOfflineScript;
}(cc.Component));
exports.default = SingleOfflineScript;

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
        //# sourceMappingURL=SingleOfflineScript.js.map
        