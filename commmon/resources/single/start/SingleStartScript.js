(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/start/SingleStartScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'caae0AZYgtA6Id/ZDdMdFaW', 'SingleStartScript', __filename);
// resources/single/start/SingleStartScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var configsFile_1 = require("../../../Script/data/configsFile");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var DataManager_1 = require("../../../Script/data/DataManager");
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
var SingleStartScript = /** @class */ (function (_super) {
    __extends(SingleStartScript, _super);
    function SingleStartScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.title = null;
        _this.startBtn = null;
        _this.rank = null;
        _this.rankBg = null;
        _this.signBtn = null;
        _this.getGemBtn = null;
        _this.armsBtn = null;
        _this.juiceBtn = null;
        _this.levelLabel = null;
        _this.curArms = null;
        _this.gemNode = null;
        _this.backNode = null;
        _this.miniProgress = null;
        _this.allSound = [];
        _this.cacheSpriteFrame = [];
        _this.cachePrefab = [];
        _this.startCallback = null;
        _this.clickNum = 0; //点击5次显示版本号
        _this.downGameProgress = 0; //下载游戏界面进度
        _this.downFinishEnterGame = false; //下载完是否直接进入游戏
        return _this;
        // update (dt) {}
    }
    SingleStartScript.prototype.onLoad = function () {
    };
    SingleStartScript.prototype.onDestroy = function () {
        this.unbind();
    };
    SingleStartScript.prototype.bindEvent = function () {
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_REFRESH_GEM, this.refreshGemNum, this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE, this.refreshCurArms, this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_SHOW_SIDE_RANK, this.showSideRank, this);
    };
    SingleStartScript.prototype.unbind = function () {
        Event_1.default.getInstance().removeEventListeners(this);
    };
    SingleStartScript.prototype.start = function () {
        var _this = this;
        var showScale = MKUtils_1.default.getShowScale();
        var maxScale = showScale.x > showScale.y ? showScale.x : showScale.y;
        this.bg.node.setScale(maxScale);
        this.rank.setPosition(-1 * MKUtils_1.default.getShowSize().width / 2, this.rank.getPosition().y);
        this.bg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("wx start game");
            cc.audioEngine.play(this.allSound[0], false, 1);
            if (this.downGameProgress >= 1) {
                cc.director.loadScene(DataManager_1.default.getInstance().curGameType);
            }
            else {
                MKUtils_1.default.errorTips("加载中...", 5, true);
                this.downFinishEnterGame = true;
            }
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.startBtn.node);
        this.rank.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("open rank");
            cc.audioEngine.play(this.allSound[0], false, 1);
            var wxDisplay = this.rank.getChildByName("wxDisplay");
            if (wxDisplay) {
                wxDisplay.removeFromParent();
            }
            this.rank.active = false;
            SingleGameLogic_1.default.getInstance().showAllRank(SDKManager_1.default.getInstance().getWXGameItemName(configsFile_1.Sina_Config.SmallGameId));
        }.bind(this), this);
        this.showSideRank();
        this.signBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("签到奖励");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().checkSign(true);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.signBtn.node);
        this.getGemBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("领钻石");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().openInvite();
            this.getGemBtn.node.getChildByName("tip").active = false;
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.getGemBtn.node);
        this.getGemBtn.node.active = MKUtils_1.default.isWXGameFun();
        MKUtils_1.default.btnScaleAct(this.getGemBtn.node);
        this.armsBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("换武器");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().openArmsDialog();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.armsBtn.node);
        MKUtils_1.default.btnScaleAct(this.armsBtn.node);
        this.juiceBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("果汁店");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().checkOffline(true);
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.juiceBtn.node);
        this.gemNode.getChildByName("gemBg").on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.log("添加宝石");
            cc.audioEngine.play(this.allSound[0], false, 1);
            SingleGameLogic_1.default.getInstance().openInvite();
        }.bind(this), this);
        if (!MKUtils_1.default.isWXGameFun()) {
            this.gemNode.setPosition(-1 * this.gemNode.getPosition().x, this.gemNode.getPosition().y);
        }
        if (this.backNode) {
            this.backNode.on(cc.Node.EventType.TOUCH_END, function (e) {
                cc.log("back");
                cc.audioEngine.play(this.allSound[0], false, 1);
                cc.director.loadScene("Home");
            }.bind(this), this);
            MKUtils_1.default.btnEffect1(this.backNode);
            this.backNode.active = !MKUtils_1.default.isWXGameFun();
        }
        this.curArms.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
            _this.curArms.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 30)), cc.moveBy(0.6, cc.v2(0, -30)))));
        }, this.curArms.node)));
        this.refreshAll();
        SingleGameLogic_1.default.getInstance().checkActive();
        this.bindEvent();
        this.setVersion();
        SDKManager_1.default.getInstance().authSettingUserInfo();
        cc.director.preloadScene(DataManager_1.default.getInstance().curGameType, function (completedCount, totalCount, item) {
            if (totalCount > 0) {
                this.downGameProgress = (completedCount / totalCount);
                // cc.log("down game progress --- ", this.downGameProgress)
            }
        }.bind(this), function () {
            this.downGameProgress = 1;
            if (this.downFinishEnterGame) {
                cc.director.loadScene(DataManager_1.default.getInstance().curGameType);
            }
        }.bind(this));
        if (this.miniProgress) {
            this.miniProgress.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                cc.log("跳转小游戏");
                cc.audioEngine.play(this.allSound[0], false, 1);
                SDKManager_1.default.getInstance().toMiniProgram(0);
            }.bind(this), this);
            MKUtils_1.default.btnEffect1(this.miniProgress.node);
            MKUtils_1.default.btnScaleAct(this.miniProgress.node);
            this.miniProgress.node.active = MKUtils_1.default.isWXGameFun();
        }
        SDKManager_1.default.getInstance().createBannerAd(0);
        if (MKUtils_1.default.isWxReview()) {
            this.juiceBtn.node.active = false;
            this.getGemBtn.node.active = false;
            this.armsBtn.node.active = false;
        }
    };
    SingleStartScript.prototype.setVersion = function () {
        this.title.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.clickNum = this.clickNum + 1;
            if (this.clickNum % 10 == 0) {
                MKUtils_1.default.errorTips("" + DataManager_1.default.getInstance().getuserData().PlayerID + ", " + configsFile_1.Sina_Config.VERSION_NAME);
            }
        }.bind(this), this);
    };
    SingleStartScript.prototype.showSideRank = function () {
        if (!MKUtils_1.default.isWXGameFun()) {
            this.rank.active = false;
            return;
        }
        this.rank.active = true;
        var wxDisplay = this.rank.getChildByName("rankNode").getChildByName("wxDisplay");
        if (wxDisplay) {
            wxDisplay.removeFromParent();
        }
        var display = new cc.Node();
        display.setContentSize(720, 1280);
        display.addComponent(cc.WXSubContextView);
        this.rank.getChildByName("rankNode").addChild(display, 1, "wxDisplay");
        SDKManager_1.default.getInstance().showSideRank(SDKManager_1.default.getInstance().getWXGameItemName(configsFile_1.Sina_Config.SmallGameId));
    };
    SingleStartScript.prototype.setStartCallback = function (callback) {
        this.startCallback = callback;
    };
    SingleStartScript.prototype.refreshLevel = function () {
        var gameId = DataManager_1.default.getInstance().curGameID;
        if (gameId == 42) {
            this.levelLabel.string = "第" + SingleGameLogic_1.default.getInstance().level + "关";
        }
        else if (gameId == 45) {
            this.levelLabel.string = "" + MKUtils_1.default.formatHeightNumber(SingleGameLogic_1.default.getInstance().curGameMaxLevel) + "m";
        }
    };
    SingleStartScript.prototype.refreshCurArms = function () {
        var armsConfig = SingleGameLogic_1.default.getInstance().getArmsJsonConfig(SingleGameLogic_1.default.getInstance().curArmsId);
        if (armsConfig) {
            MKUtils_1.default.loadSpriteFrame(armsConfig["img"], function (spriteFrame) {
                this.curArms.spriteFrame = spriteFrame;
            }.bind(this));
        }
    };
    SingleStartScript.prototype.refreshGemNum = function () {
        this.gemNode.getChildByName("numLabel").getComponent(cc.Label).string = MKUtils_1.default.tranNumE(SingleGameLogic_1.default.getInstance().gemNum);
    };
    SingleStartScript.prototype.refreshAll = function () {
        this.showSideRank();
        this.refreshGemNum();
        this.refreshLevel();
        this.refreshCurArms();
        this.refreshInviteBtnTip();
    };
    SingleStartScript.prototype.refreshInviteBtnTip = function () {
        SingleGameLogic_1.default.getInstance().getInviteInfo(function (data) {
            var show = false;
            if (data) {
                for (var i = 0; i < data.TaskList.length; i++) {
                    if (data.TaskList[i].Flag == 1) {
                        show = true;
                    }
                }
            }
            this.getGemBtn.node.getChildByName("tip").active = show;
        }.bind(this));
    };
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "bg", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "title", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "startBtn", void 0);
    __decorate([
        property(cc.Node)
    ], SingleStartScript.prototype, "rank", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "rankBg", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "signBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "getGemBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "armsBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "juiceBtn", void 0);
    __decorate([
        property(cc.Label)
    ], SingleStartScript.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "curArms", void 0);
    __decorate([
        property(cc.Node)
    ], SingleStartScript.prototype, "gemNode", void 0);
    __decorate([
        property(cc.Node)
    ], SingleStartScript.prototype, "backNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleStartScript.prototype, "miniProgress", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleStartScript.prototype, "allSound", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleStartScript.prototype, "cacheSpriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], SingleStartScript.prototype, "cachePrefab", void 0);
    SingleStartScript = __decorate([
        ccclass
    ], SingleStartScript);
    return SingleStartScript;
}(cc.Component));
exports.default = SingleStartScript;

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
        //# sourceMappingURL=SingleStartScript.js.map
        