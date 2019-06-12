(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/arms/SingleArmsScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1f5bTxvnlOn4vlSj50HUF9', 'SingleArmsScript', __filename);
// resources/single/arms/SingleArmsScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var Constant_1 = require("../../../Script/common/Constant");
var DataManager_1 = require("../../../Script/data/DataManager");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var singleGameProtocol_1 = require("../../../Script/network/gameProtocols/singleGameProtocol");
var PacketID_1 = require("../../../Script/network/PacketID");
var HttpHelper_1 = require("../../../Script/network/HttpHelper");
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
var SingleArmsScript = /** @class */ (function (_super) {
    __extends(SingleArmsScript, _super);
    function SingleArmsScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.bgLeft = null;
        _this.bgRight = null;
        _this.closeBtn = null;
        _this.curTools = null;
        _this.curToolsIcon = null;
        _this.useGemBtn = null;
        _this.adBtn = null;
        _this.armsPageView = null;
        _this.finishLevelImg = null;
        _this.gridBgSpriteFrame = null;
        _this.gridHaveSpriteFrame = null;
        _this.gridLockSpriteFrame = null;
        _this.gridSelectSpriteFrame = null;
        _this.allSound = [];
        _this.iconScale = 1;
        _this.iconRotation = 0;
        _this.colNum = 4;
        _this.spaceX = 150;
        _this.spaceY = 150;
        _this.firstPosX = -255;
        _this.firstPosY = 255;
        _this.selectOffsetPos = cc.v2(3, 3);
        _this.armsJson = null;
        _this.armsNodes = {};
        _this.haveArmsIds = [];
        _this.isInUnlockNewArms = false; //在解锁新武器的过程中
        _this.adUseCount = 0; //广告获取道具已经使用的次数
        _this.adUseMaxCount = 3;
        _this.curPageIndex = -1; //当前页面
        return _this;
    }
    SingleArmsScript.prototype.onLoad = function () {
        this.initData();
        this.initUI();
        this.getArmsData();
        this.bindEvent();
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function () {
            SDKManager_1.default.getInstance().createBannerAd(1);
        }, this.node)));
    };
    SingleArmsScript.prototype.start = function () { };
    SingleArmsScript.prototype.onDestroy = function () {
        this.unbind();
    };
    SingleArmsScript.prototype.bindEvent = function () {
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE, this.refreshCurArms, this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE, this.refreshRewardType, this);
    };
    SingleArmsScript.prototype.unbind = function () {
        Event_1.default.getInstance().removeEventListeners(this);
    };
    SingleArmsScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.closeBtn.node);
        this.armsPageView.node.on("scroll-ended", function () {
            this.pageChange(this.armsPageView.getCurrentPageIndex());
        }.bind(this), this);
        this.useGemBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            this.useGemUnlockArms();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.useGemBtn.node);
        this.useGemBtn.node.active = false;
        this.adBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            this.adUnlockArms();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.adBtn.node);
        this.adBtn.node.active = false;
        this.curToolsIcon.node.active = false;
        this.refreshCurArms();
        this.refreshRewardType();
    };
    SingleArmsScript.prototype.refreshRewardType = function () {
        var rewardType = SingleGameLogic_1.default.getInstance().curGetRewardType;
        this.adBtn.node.getChildByName("adIcon").active = rewardType != Constant_1.default.SingleRewardType.SHARE;
        this.adBtn.node.getChildByName("shareIcon").active = rewardType == Constant_1.default.SingleRewardType.SHARE;
    };
    SingleArmsScript.prototype.initData = function () {
        this.armsJson = this.getArmsJson();
        this.addFinishLevelArms();
        this.haveArmsIds.push(SingleGameLogic_1.default.getInstance().curArmsId);
        cc.log("this.armsJson = ", this.armsJson);
    };
    SingleArmsScript.prototype.addFinishLevelArms = function () {
        if (this.armsJson && this.armsJson["armsType"]) {
            var maxLevel = SingleGameLogic_1.default.getInstance().curGameMaxLevel;
            for (var i = 0; i < this.armsJson["armsType"].length; i++) {
                var jsonData = this.armsJson["armsType"][i];
                if (jsonData["type"] == 2) {
                    for (var j = 0; j < jsonData["ids"].length; j++) {
                        if (jsonData["ids"][j]["level"] < maxLevel) {
                            this.haveArmsIds.push(jsonData["ids"][j]["id"]);
                        }
                    }
                }
            }
        }
    };
    SingleArmsScript.prototype.getArmsJson = function () {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var gameJson = DataManager_1.default.getInstance().getGameJsonById(gameId);
        if (gameJson) {
            return gameJson["arms"];
        }
        else {
            return null;
        }
    };
    SingleArmsScript.prototype.createArmsPage = function () {
        var _this = this;
        if (this.armsJson && this.armsJson["armsType"]) {
            var lastPageIdsConfig = this.armsJson["armsType"][this.armsJson["armsType"].length - 1]["ids"];
            var lastArmsId = lastPageIdsConfig[lastPageIdsConfig.length - 1]["id"];
            var lastArmsConfig = this.armsJson["allArms"][lastArmsId];
            var lastArmsSpriteFrame = cc.loader.getRes(lastArmsConfig["img"], cc.SpriteFrame);
            var lastArmsIsLoad = (lastArmsSpriteFrame && lastArmsSpriteFrame != null);
            for (var i = 0; i < this.armsJson["armsType"].length; i++) {
                var jsonData = this.armsJson["armsType"][i];
                var page = new cc.Node();
                var _loop_1 = function (j) {
                    var armsId = jsonData["ids"][j]["id"];
                    var armsConfig = this_1.armsJson["allArms"][armsId];
                    var grid = new cc.Node();
                    var gridSprite = grid.addComponent(cc.Sprite);
                    gridSprite.spriteFrame = this_1.gridBgSpriteFrame;
                    page.addChild(grid);
                    grid.setPosition(this_1.getPosByIndex(j));
                    var armsIcon = new cc.Node();
                    armsIcon.rotation = this_1.iconRotation;
                    armsIcon.scale = this_1.iconScale;
                    var armsIconSprite = armsIcon.addComponent(cc.Sprite);
                    grid.addChild(armsIcon, 3, "armsIcon");
                    var delay = lastArmsIsLoad ? 0 : (i * 0.8 + j * 0.05);
                    armsIcon.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
                        MKUtils_1.default.loadSpriteFrame(armsConfig["img"], function (spriteFrame) {
                            armsIconSprite.spriteFrame = spriteFrame;
                        }.bind(_this));
                    }, armsIcon)));
                    this_1.armsNodes[armsId] = grid;
                    this_1.refreshArmsById(armsId);
                    grid.on(cc.Node.EventType.TOUCH_END, function (e) {
                        this.clickArms(armsId);
                        cc.audioEngine.play(this.allSound[0], false, 1);
                    }.bind(this_1), this_1);
                };
                var this_1 = this;
                for (var j = 0; j < jsonData["ids"].length; j++) {
                    _loop_1(j);
                }
                page.setContentSize(this.armsPageView.node.getContentSize());
                this.armsPageView.addPage(page);
            }
            this.pageChange(0);
        }
    };
    SingleArmsScript.prototype.getPosByIndex = function (index) {
        return cc.v2(this.firstPosX + (index % this.colNum) * (this.spaceX), this.firstPosY - (Math.floor(index / this.colNum) * (this.spaceY)));
    };
    SingleArmsScript.prototype.pageChange = function (curIndex) {
        if (this.curPageIndex == curIndex || curIndex < 0) {
            return;
        }
        this.curPageIndex = curIndex;
        this.refreshPage();
    };
    SingleArmsScript.prototype.refreshPage = function () {
        var curPageArmsJson = this.armsJson["armsType"][this.curPageIndex];
        this.useGemBtn.node.active = false;
        this.adBtn.node.active = false;
        this.finishLevelImg.node.active = false;
        if ((!curPageArmsJson) || (!curPageArmsJson["type"])) {
            return;
        }
        if (curPageArmsJson["type"] == 1) {
            this.useGemBtn.node.active = true;
            this.adBtn.node.active = true;
            this.useGemBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + curPageArmsJson["gem"];
            this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "剩余" + (this.adUseMaxCount - this.adUseCount) + "次";
            MKUtils_1.default.btnScaleAct(this.adBtn.node, 1);
        }
        else if (curPageArmsJson["type"] == 2) {
            this.finishLevelImg.node.active = true;
        }
        else if (curPageArmsJson["type"] == 3) {
            this.useGemBtn.node.active = true;
            this.adBtn.node.active = true;
            var needGem = curPageArmsJson["gem"] * Math.pow(2, this.getUnlockArmsNum(this.curPageIndex));
            this.useGemBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + needGem;
            this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + this.getPageAdCount(this.curPageIndex) + "/" + curPageArmsJson["ad"];
            MKUtils_1.default.btnScaleAct(this.adBtn.node, 1);
        }
    };
    SingleArmsScript.prototype.getPageAdCount = function (index) {
        return parseInt(cc.sys.localStorage.getItem(this.getPageAdCountItemName(index))) || 0;
    };
    SingleArmsScript.prototype.setPageAdCount = function (index, count) {
        cc.sys.localStorage.setItem(this.getPageAdCountItemName(index), count);
    };
    SingleArmsScript.prototype.getPageAdCountItemName = function (index) {
        return "Arms_ad_count_" + DataManager_1.default.getInstance().getuserData().PlayerID + "_" + DataManager_1.default.getInstance().curGameID + "_" + index;
    };
    SingleArmsScript.prototype.clickArms = function (armsId) {
        if (this.isInUnlockNewArms) {
            return;
        }
        cc.log("click --- ", armsId);
        if (SingleGameLogic_1.default.getInstance().curArmsId != armsId) {
            if (this.haveArms(armsId)) {
                this.useArms(armsId);
                SingleGameLogic_1.default.getInstance().changeArmsSyn(armsId);
                MKUtils_1.default.errorTips("武器装备成功！");
            }
            else {
                MKUtils_1.default.errorTips("此武器未解锁！");
            }
        }
    };
    SingleArmsScript.prototype.useArms = function (armsId) {
        var lastId = SingleGameLogic_1.default.getInstance().curArmsId;
        SingleGameLogic_1.default.getInstance().curArmsId = armsId;
        this.refreshArmsById(lastId);
        this.refreshArmsById(SingleGameLogic_1.default.getInstance().curArmsId);
    };
    SingleArmsScript.prototype.refreshArmsById = function (armsId) {
        if (this.armsNodes[armsId]) {
            var gridLock = this.armsNodes[armsId].getChildByName("gridLock");
            if (this.haveArms(armsId)) {
                this.armsNodes[armsId].getComponent(cc.Sprite).spriteFrame = this.gridHaveSpriteFrame;
                if (gridLock) {
                    gridLock.removeFromParent();
                }
            }
            else {
                this.armsNodes[armsId].getComponent(cc.Sprite).spriteFrame = this.gridBgSpriteFrame;
                if (!gridLock) {
                    var gridLock_1 = new cc.Node();
                    var gridLockSprite = gridLock_1.addComponent(cc.Sprite);
                    gridLockSprite.sizeMode = cc.Sprite.SizeMode.RAW;
                    gridLockSprite.trim = false;
                    gridLockSprite.spriteFrame = this.gridLockSpriteFrame;
                    this.armsNodes[armsId].addChild(gridLock_1, 5, "gridLock");
                    if (gridLock_1.opacity) {
                        gridLock_1.opacity = 125;
                    }
                }
            }
            var armsSelect = this.armsNodes[armsId].getChildByName("armsSelect");
            if (SingleGameLogic_1.default.getInstance().curArmsId == armsId) {
                if (!armsSelect) {
                    var select = new cc.Node();
                    var selectSprite = select.addComponent(cc.Sprite);
                    selectSprite.spriteFrame = this.gridSelectSpriteFrame;
                    this.armsNodes[armsId].addChild(select, 2, "armsSelect");
                    select.setPosition(this.selectOffsetPos);
                }
            }
            else {
                if (armsSelect) {
                    armsSelect.removeFromParent();
                    armsSelect = null;
                }
            }
        }
    };
    SingleArmsScript.prototype.haveArms = function (armsId) {
        for (var i = 0; i < this.haveArmsIds.length; i++) {
            if (armsId == this.haveArmsIds[i]) {
                return true;
            }
        }
        return false;
    };
    SingleArmsScript.prototype.refreshCurArms = function () {
        if (!this.armsJson) {
            return;
        }
        var curArmsId = SingleGameLogic_1.default.getInstance().curArmsId;
        var armsConfig = this.armsJson["allArms"][curArmsId];
        if (!armsConfig) {
            return;
        }
        MKUtils_1.default.loadSpriteFrame(armsConfig["img"], function (spriteFrame) {
            this.curToolsIcon.spriteFrame = spriteFrame;
            this.curToolsIcon.node.active = true;
        }.bind(this));
    };
    //抽武器
    SingleArmsScript.prototype.useGemUnlockArms = function () {
        if (this.isInUnlockNewArms) {
            return;
        }
        var curPageArmsJson = this.armsJson["armsType"][this.curPageIndex];
        if (curPageArmsJson["type"] == 1 || curPageArmsJson["type"] == 3) {
            var needGem_1 = curPageArmsJson["gem"];
            if (curPageArmsJson["type"] == 3) {
                needGem_1 = curPageArmsJson["gem"] * Math.pow(2, this.getUnlockArmsNum(this.curPageIndex));
            }
            if (SingleGameLogic_1.default.getInstance().gemNum >= needGem_1) {
                this.unlockNewArms(this.curPageIndex, function (unlockArmsId) {
                    cc.log("unlockNewArms success");
                    SingleGameLogic_1.default.getInstance().gemNum = SingleGameLogic_1.default.getInstance().gemNum - needGem_1;
                    Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_REFRESH_GEM);
                    this.armsSyn(unlockArmsId, SingleGameLogic_1.default.getInstance().gemNum, this.adUseCount);
                }.bind(this));
            }
            else {
                MKUtils_1.default.errorTips("宝石数量不足");
            }
        }
    };
    SingleArmsScript.prototype.adUnlockArms = function () {
        if (this.isInUnlockNewArms) {
            return;
        }
        var curPageArmsJson = this.armsJson["armsType"][this.curPageIndex];
        if (curPageArmsJson["type"] == 1) {
            if (this.adUseCount < this.adUseMaxCount) {
                SingleGameLogic_1.default.getInstance().getReward(function () {
                    this.unlockNewArms(this.curPageIndex, function (unlockArmsId) {
                        cc.log("unlockNewArms success");
                        this.adUseCount = this.adUseCount + 1;
                        this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "剩余" + (this.adUseMaxCount - this.adUseCount) + "次";
                        this.armsSyn(unlockArmsId, SingleGameLogic_1.default.getInstance().gemNum, this.adUseCount);
                    }.bind(this));
                }.bind(this), function () {
                }.bind(this), 2);
            }
            else {
                MKUtils_1.default.errorTips("今日次数已用完！");
            }
        }
        else if (curPageArmsJson["type"] == 3) {
            SingleGameLogic_1.default.getInstance().getReward(function () {
                this.setPageAdCount(this.curPageIndex, this.getPageAdCount(this.curPageIndex) + 1);
                if (this.getPageAdCount(this.curPageIndex) >= curPageArmsJson["ad"]) {
                    this.setPageAdCount(this.curPageIndex, 0);
                    this.unlockNewArms(this.curPageIndex, function (unlockArmsId) {
                        cc.log("unlockNewArms success");
                        this.armsSyn(unlockArmsId, SingleGameLogic_1.default.getInstance().gemNum, this.adUseCount);
                    }.bind(this));
                }
                this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + this.getPageAdCount(this.curPageIndex) + "/" + curPageArmsJson["ad"];
            }.bind(this), function () {
            }.bind(this), 2);
        }
    };
    SingleArmsScript.prototype.unlockNewArms = function (pageIndex, successCallback) {
        var _this = this;
        if (this.isInUnlockNewArms) {
            return;
        }
        this.isInUnlockNewArms = true;
        var lockIds = [];
        var curPageArmsJson = this.armsJson["armsType"][pageIndex];
        for (var i = 0; i < curPageArmsJson["ids"].length; i++) {
            var armsId = curPageArmsJson["ids"][i]["id"];
            if (!this.haveArms(armsId)) {
                lockIds.push(armsId);
            }
        }
        if (lockIds.length > 0) {
            var randomIndex = MKUtils_1.default.randomNM(0, lockIds.length - 1);
            var unlockArmsId_1 = lockIds[randomIndex];
            lockIds.splice(randomIndex, 1);
            var actNum = Math.floor(lockIds.length * 2 / 3);
            var spaceTime = 0.15;
            for (var i = 0; i < actNum; i++) {
                var index = MKUtils_1.default.randomNM(0, lockIds.length - 1);
                if (this.armsNodes[lockIds[index]]) {
                    this.armsNodes[lockIds[index]].runAction(cc.sequence(cc.delayTime(i * spaceTime), cc.scaleTo(0.15, 1.2), cc.scaleTo(0.15, 1)));
                }
                lockIds.splice(index, 1);
            }
            this.node.runAction(cc.sequence(cc.delayTime(actNum * spaceTime + 0.3), cc.callFunc(function () {
                _this.haveArmsIds.push(unlockArmsId_1);
                _this.useArms(unlockArmsId_1);
                _this.isInUnlockNewArms = false;
                successCallback(unlockArmsId_1);
                _this.refreshPage();
                cc.audioEngine.play(_this.allSound[1], false, 1);
            }, this.node)));
        }
        else {
            this.isInUnlockNewArms = false;
            MKUtils_1.default.errorTips("本页武器已经全部获得了");
        }
    };
    SingleArmsScript.prototype.getUnlockArmsNum = function (pageIndex) {
        var unlockIds = [];
        var curPageArmsJson = this.armsJson["armsType"][pageIndex];
        for (var i = 0; i < curPageArmsJson["ids"].length; i++) {
            var armsId = curPageArmsJson["ids"][i]["id"];
            if (this.haveArms(armsId)) {
                unlockIds.push(armsId);
            }
        }
        var num = unlockIds.length;
        if (pageIndex == 0) {
            num -= 1;
        }
        if (num < 0) {
            num = 0;
        }
        return num;
    };
    //获取数据
    SingleArmsScript.prototype.getArmsData = function () {
        var value = new singleGameProtocol_1.CSSingleGameSkin();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("getArmsData---", value);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SKIN_ID, this.getArmsDataSuccess.bind(this), this.getArmsDataFailed.bind(this));
    };
    SingleArmsScript.prototype.getArmsDataSuccess = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("getArmsDataSuccess---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameSkin();
        protocol.unPack(data);
        cc.log("getArmsDataSuccess---", protocol);
        for (var i = 0; i < protocol.SkinList.length; i++) {
            this.haveArmsIds.push(protocol.SkinList[i]);
        }
        this.adUseCount = protocol.Count;
        this.createArmsPage();
    };
    SingleArmsScript.prototype.getArmsDataFailed = function (states) {
        cc.log("getArmsDataFailed---");
    };
    //抽武器同步
    SingleArmsScript.prototype.armsSyn = function (armsId, gem, adUseCount) {
        var value = new singleGameProtocol_1.CSSingleGameLottery();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.Skin = armsId;
        value.GemStone = gem;
        value.Count = adUseCount;
        cc.log("armsSyn---", value);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LOTTERY_ID, this.armsSynSuccess.bind(this), this.armsSynFailed.bind(this));
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE);
    };
    SingleArmsScript.prototype.armsSynSuccess = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("armsSynSuccess---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameLottery();
        protocol.unPack(data);
        cc.log("armsSynSuccess---", protocol);
    };
    SingleArmsScript.prototype.armsSynFailed = function (states) {
        cc.log("getArmsDataFailed---");
    };
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "bgLeft", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "bgRight", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "closeBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "curTools", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "curToolsIcon", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "useGemBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "adBtn", void 0);
    __decorate([
        property(cc.PageView)
    ], SingleArmsScript.prototype, "armsPageView", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleArmsScript.prototype, "finishLevelImg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleArmsScript.prototype, "gridBgSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleArmsScript.prototype, "gridHaveSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleArmsScript.prototype, "gridLockSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SingleArmsScript.prototype, "gridSelectSpriteFrame", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleArmsScript.prototype, "allSound", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "iconScale", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "iconRotation", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "colNum", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "spaceX", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "spaceY", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "firstPosX", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "firstPosY", void 0);
    __decorate([
        property
    ], SingleArmsScript.prototype, "selectOffsetPos", void 0);
    SingleArmsScript = __decorate([
        ccclass
    ], SingleArmsScript);
    return SingleArmsScript;
}(cc.Component));
exports.default = SingleArmsScript;

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
        //# sourceMappingURL=SingleArmsScript.js.map
        