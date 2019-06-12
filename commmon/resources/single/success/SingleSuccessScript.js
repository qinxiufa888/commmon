(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/success/SingleSuccessScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6cf10DYP1ZD26jRMo+WT5R6', 'SingleSuccessScript', __filename);
// resources/single/success/SingleSuccessScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var DataManager_1 = require("../../../Script/data/DataManager");
var GamesCommonLogic_1 = require("../../../Script/logic/GamesCommonLogic");
var Event_1 = require("../../../Script/event/Event");
var EvenID_1 = require("../../../Script/event/EvenID");
var Constant_1 = require("../../../Script/common/Constant");
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
var SingleSuccessScript = /** @class */ (function (_super) {
    __extends(SingleSuccessScript, _super);
    function SingleSuccessScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.numLebel = null;
        _this.rewardBtn = null;
        _this.nextBtn = null;
        _this.backBtn = null;
        _this.rankNode = null;
        _this.allSound = [];
        return _this;
        // update (dt) {}
    }
    SingleSuccessScript.prototype.onLoad = function () {
        this.initUI();
        this.bindEvent();
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function () {
            SDKManager_1.default.getInstance().createBannerAd(5);
        }, this.node)));
    };
    SingleSuccessScript.prototype.start = function () {
    };
    SingleSuccessScript.prototype.onDestroy = function () {
        this.unbind();
    };
    SingleSuccessScript.prototype.bindEvent = function () {
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE, this.refreshRewardType, this);
    };
    SingleSuccessScript.prototype.unbind = function () {
        Event_1.default.getInstance().removeEventListeners(this);
    };
    SingleSuccessScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.numLebel.string = "x" + SingleGameLogic_1.default.getInstance().getLevelRewardNum();
        this.rewardBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("领取成功奖励");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().getReward(function () {
                SingleGameLogic_1.default.getInstance().getLevelReward(SingleGameLogic_1.default.getInstance().getLevelRewardNum());
                SDKManager_1.default.getInstance().createBannerAd(0);
                this.node.removeFromParent();
            }.bind(this), function () {
            }.bind(this), 3);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.rewardBtn.node);
        MKUtils_1.default.btnScaleAct(this.rewardBtn.node);
        this.nextBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("下一关");
            cc.audioEngine.play(this.allSound[0], false, 1);
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_START_NEXT_LEVEL);
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.nextBtn.node);
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("回到主界面");
            cc.audioEngine.play(this.allSound[0], false, 1);
            cc.director.loadScene(DataManager_1.default.getInstance().curGameType + "Start");
            SDKManager_1.default.getInstance().createBannerAd(0);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.backBtn.node);
        this.rankNode.getChildByName("normalRank").active = !MKUtils_1.default.isWXGameFun();
        this.rankNode.getChildByName("wxRank").active = MKUtils_1.default.isWXGameFun();
        if (MKUtils_1.default.isWXGameFun()) {
            var wxRankNode = this.rankNode.getChildByName("wxRank");
            var wxDisplay = wxRankNode.getChildByName("wxDisplay");
            if (wxDisplay) {
                wxDisplay.removeFromParent();
            }
            var display = new cc.Node();
            display.setContentSize(720, 1280);
            display.setPosition(0, 0);
            display.addComponent(cc.WXSubContextView);
            wxRankNode.addChild(display, 10, "wxDisplay");
            SDKManager_1.default.getInstance().showResultRank(SDKManager_1.default.getInstance().getWXGameItemName(DataManager_1.default.getInstance().curGameID));
        }
        else {
            var orderNode = [];
            orderNode.push(this.rankNode.getChildByName("normalRank").getChildByName("order1"));
            orderNode.push(this.rankNode.getChildByName("normalRank").getChildByName("order2"));
            orderNode.push(this.rankNode.getChildByName("normalRank").getChildByName("order3"));
            var singleGameOrder = SingleGameLogic_1.default.getInstance().getOrderData();
            cc.log("refreshOrder1------", singleGameOrder);
            for (var i = 0; i < orderNode.length; i++) {
                if (singleGameOrder != null && singleGameOrder.PlayerOrderList.length > i) {
                    orderNode[i].active = true;
                    var node = orderNode[i];
                    var data = singleGameOrder.PlayerOrderList[i];
                    GamesCommonLogic_1.default.getInstance().createHead(node.getChildByName("head"), 90, data.Photo);
                    node.getChildByName("nameLabel").getComponent(cc.Label).string = data.NickName;
                    node.getChildByName("levelLabel").getComponent(cc.Label).string = "第" + Math.floor(data.Chapter) + "关";
                }
                else {
                    orderNode[i].active = false;
                }
            }
        }
        this.refreshRewardType();
    };
    SingleSuccessScript.prototype.refreshRewardType = function () {
        var rewardType = SingleGameLogic_1.default.getInstance().curGetRewardType;
        this.rewardBtn.node.getChildByName("adIcon").active = rewardType != Constant_1.default.SingleRewardType.SHARE;
        this.rewardBtn.node.getChildByName("shareIcon").active = rewardType == Constant_1.default.SingleRewardType.SHARE;
    };
    __decorate([
        property(cc.Sprite)
    ], SingleSuccessScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Label)
    ], SingleSuccessScript.prototype, "numLebel", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleSuccessScript.prototype, "rewardBtn", void 0);
    __decorate([
        property(cc.Label)
    ], SingleSuccessScript.prototype, "nextBtn", void 0);
    __decorate([
        property(cc.Label)
    ], SingleSuccessScript.prototype, "backBtn", void 0);
    __decorate([
        property(cc.Node)
    ], SingleSuccessScript.prototype, "rankNode", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleSuccessScript.prototype, "allSound", void 0);
    SingleSuccessScript = __decorate([
        ccclass
    ], SingleSuccessScript);
    return SingleSuccessScript;
}(cc.Component));
exports.default = SingleSuccessScript;

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
        //# sourceMappingURL=SingleSuccessScript.js.map
        