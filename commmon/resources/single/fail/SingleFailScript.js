(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/fail/SingleFailScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e04fcyi2T1HFbfmRI9nTeP1', 'SingleFailScript', __filename);
// resources/single/fail/SingleFailScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var Event_1 = require("../../../Script/event/Event");
var EvenID_1 = require("../../../Script/event/EvenID");
var DataManager_1 = require("../../../Script/data/DataManager");
var GamesCommonLogic_1 = require("../../../Script/logic/GamesCommonLogic");
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
var SingleFailScript = /** @class */ (function (_super) {
    __extends(SingleFailScript, _super);
    function SingleFailScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.buyLifeNode = null;
        _this.backNode = null;
        _this.allSound = [];
        _this.countdownTime = 0; //复活倒计时
        _this.isInCountdown = false; //是否在倒计时中
        _this.countdownAllTime = 10; //倒计时总时长
        _this.data = null;
        return _this;
    }
    SingleFailScript.prototype.onLoad = function () {
        this.initUI();
        this.bindEvent();
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function () {
            var showHeight = MKUtils_1.default.getShowSize().height;
            var adTopScale = (showHeight / 2 - 330) / showHeight;
            SDKManager_1.default.getInstance().createBannerAd(6, adTopScale);
        }, this.node)));
    };
    SingleFailScript.prototype.start = function () {
        if (this.data && this.data.showBack) {
            this.isInCountdown = false;
            this.countdownTime = 0;
            this.buyLifeNode.active = false;
            this.backNode.active = true;
        }
        else {
            this.countdownTime = this.countdownAllTime;
            this.isInCountdown = true;
            this.buyLifeNode.active = true;
            this.backNode.active = false;
        }
        this.initRank();
    };
    SingleFailScript.prototype.onDestroy = function () {
        this.unbind();
    };
    SingleFailScript.prototype.bindEvent = function () {
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE, this.refreshRewardType, this);
    };
    SingleFailScript.prototype.unbind = function () {
        Event_1.default.getInstance().removeEventListeners(this);
    };
    SingleFailScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        //复活
        this.buyLifeNode.getChildByName("buyLifeBtn").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("复活");
            cc.audioEngine.play(this.allSound[0], false, 1);
            this.isInCountdown = false;
            SingleGameLogic_1.default.getInstance().getReward(function () {
                Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_BUY_LIEF_SUCCESS);
                SDKManager_1.default.getInstance().createBannerAd(0);
                this.node.removeFromParent();
            }.bind(this), function () {
                this.isInCountdown = true;
            }.bind(this), 4);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.buyLifeNode.getChildByName("buyLifeBtn"));
        if (MKUtils_1.default.isWxReview()) {
            this.buyLifeNode.getChildByName("buyLifeBtn").active = false;
        }
        this.buyLifeNode.getChildByName("skipLabel").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("跳过");
            cc.audioEngine.play(this.allSound[0], false, 1);
            this.isInCountdown = false;
            this.buyLifeNode.active = false;
            this.backNode.active = true;
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.buyLifeNode.getChildByName("skipLabel"));
        this.buyLifeNode.getChildByName("timeLabel").getComponent(cc.Label).string = "" + this.countdownAllTime;
        //回退
        this.backNode.getChildByName("continueBtn").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("再来一次，回退一关");
            cc.audioEngine.play(this.allSound[0], false, 1);
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_BACK_LEVEL);
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.backNode.getChildByName("continueBtn"));
        this.backNode.getChildByName("backStartBtn").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("返回首页");
            cc.audioEngine.play(this.allSound[0], false, 1);
            cc.director.loadScene(DataManager_1.default.getInstance().curGameType + "Start");
            SDKManager_1.default.getInstance().createBannerAd(0);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.backNode.getChildByName("backStartBtn"));
        this.refreshRewardType();
    };
    SingleFailScript.prototype.initRank = function () {
        this.backNode.getChildByName("rankNode").getChildByName("normalRank").active = !MKUtils_1.default.isWXGameFun();
        this.backNode.getChildByName("rankNode").getChildByName("wxRank").active = MKUtils_1.default.isWXGameFun();
        if (MKUtils_1.default.isWXGameFun()) {
            var wxRankNode = this.backNode.getChildByName("rankNode").getChildByName("wxRank");
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
            orderNode.push(this.backNode.getChildByName("rankNode").getChildByName("normalRank").getChildByName("order1"));
            orderNode.push(this.backNode.getChildByName("rankNode").getChildByName("normalRank").getChildByName("order2"));
            orderNode.push(this.backNode.getChildByName("rankNode").getChildByName("normalRank").getChildByName("order3"));
            var singleGameOrder = SingleGameLogic_1.default.getInstance().getOrderData();
            cc.log("refreshOrder1------", singleGameOrder);
            for (var i = 0; i < orderNode.length; i++) {
                if (singleGameOrder != null && singleGameOrder.PlayerOrderList.length > i) {
                    orderNode[i].active = true;
                    var node = orderNode[i];
                    var data = singleGameOrder.PlayerOrderList[i];
                    GamesCommonLogic_1.default.getInstance().createHead(node.getChildByName("head"), 90, data.Photo);
                    node.getChildByName("nameLabel").getComponent(cc.Label).string = data.NickName;
                    if (this.data && this.data.type == 1) {
                        node.getChildByName("levelLabel").getComponent(cc.Label).string = "" + Math.floor(data.Chapter) + "m";
                    }
                    else {
                        node.getChildByName("levelLabel").getComponent(cc.Label).string = "第" + Math.floor(data.Chapter) + "关";
                    }
                }
                else {
                    orderNode[i].active = false;
                }
            }
        }
    };
    SingleFailScript.prototype.refreshRewardType = function () {
        var rewardType = SingleGameLogic_1.default.getInstance().curGetRewardType;
        this.buyLifeNode.getChildByName("buyLifeBtn").getChildByName("adIcon").active = rewardType != Constant_1.default.SingleRewardType.SHARE;
        this.buyLifeNode.getChildByName("buyLifeBtn").getChildByName("shareIcon").active = rewardType == Constant_1.default.SingleRewardType.SHARE;
    };
    SingleFailScript.prototype.update = function (dt) {
        if (this.isInCountdown) {
            this.countdownTime = this.countdownTime - dt;
            if (this.countdownTime > 0) {
                this.changeTimeLabel("" + Math.ceil(this.countdownTime));
            }
            else {
                this.isInCountdown = false;
                this.countdownTime = 0;
                this.buyLifeNode.active = false;
                this.backNode.active = true;
            }
        }
    };
    SingleFailScript.prototype.changeTimeLabel = function (time) {
        if (this.buyLifeNode.getChildByName("timeLabel").getComponent(cc.Label).string != time) {
            this.buyLifeNode.getChildByName("timeLabel").getComponent(cc.Label).string = time;
            cc.audioEngine.play(this.allSound[1], false, 1);
        }
    };
    SingleFailScript.prototype.setThrowScore = function (data) {
        var maxHeight = data.curHeight > data.maxHeight ? data.curHeight : data.maxHeight;
        this.backNode.getChildByName("scoreNode").getChildByName("curLabel").getComponent(cc.Label).string = MKUtils_1.default.formatHeightNumber(data.curHeight) + "m";
        this.backNode.getChildByName("scoreNode").getChildByName("maxLabel").getComponent(cc.Label).string = MKUtils_1.default.formatHeightNumber(maxHeight) + "m";
        this.backNode.getChildByName("scoreNode").getChildByName("gemLabel").getComponent(cc.Label).string = "+" + MKUtils_1.default.tranNumE(data.gem);
    };
    SingleFailScript.prototype.setData = function (data) {
        cc.log("SingleFail setData:", data);
        if (data) {
            this.data = data;
            if (data.type == 1) { //抛出银河系米数
                this.setThrowScore(data);
            }
            if (data.showBack) {
                this.isInCountdown = false;
                this.countdownTime = 0;
                this.buyLifeNode.active = false;
                this.backNode.active = true;
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], SingleFailScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Node)
    ], SingleFailScript.prototype, "buyLifeNode", void 0);
    __decorate([
        property(cc.Node)
    ], SingleFailScript.prototype, "backNode", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleFailScript.prototype, "allSound", void 0);
    SingleFailScript = __decorate([
        ccclass
    ], SingleFailScript);
    return SingleFailScript;
}(cc.Component));
exports.default = SingleFailScript;

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
        //# sourceMappingURL=SingleFailScript.js.map
        