(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/logic/GamesLogic/SingleGameLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f12daIm4O9Lbo3eBbw7VsyW', 'SingleGameLogic', __filename);
// Script/logic/GamesLogic/SingleGameLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PacketID_1 = require("../../network/PacketID");
var Event_1 = require("../../Event/Event");
var DataManager_1 = require("../../data/DataManager");
var EvenID_1 = require("../../event/EvenID");
var singleGameProtocol_1 = require("../../network/gameProtocols/singleGameProtocol");
var HttpHelper_1 = require("../../network/HttpHelper");
var MKUtils_1 = require("../../common/MKUtils");
var Constant_1 = require("../../common/Constant");
var SDKManager_1 = require("../SDKManager");
var SingleGameLogic = /** @class */ (function () {
    function SingleGameLogic() {
        this.singleGameStart = null;
        this.curGameId = 0;
        this.singleGameOrder = null;
        this.wxShareNum = 0; //微信分享剩余次数 
        this.startNode = null;
        this.curArmsId = 0; //当前使用武器的id
        this.curGameMaxLevel = 0; //当前游戏玩到的最高关卡
        this.gemNum = 0; //宝石数量
        this.level = 0; //当前关卡等级
        this.newArmsId = 0; //通关获得新的武器
        //看视频广告/转发
        this.curGetRewardType = Constant_1.default.SingleRewardType.AD; //领奖获取方式
        this.curRewardTypeIndex = -1;
        this.rewardVideoAdEnable = true;
        this.activeShowConfig = [
            Constant_1.default.SingleActiveType.SIGN,
            Constant_1.default.SingleActiveType.OFFLINE,
        ];
    }
    SingleGameLogic.getInstance = function () {
        if (!this.singleton) {
            this.singleton = new SingleGameLogic();
        }
        return this.singleton;
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2243g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //游戏开始
    SingleGameLogic.prototype.sendStart = function (gameId) {
        var value = new singleGameProtocol_1.CSSingleGameStart();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = gameId;
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_START_ID, this.onStart.bind(this));
        cc.log("sendStart---", gameId);
    };
    SingleGameLogic.prototype.onStart = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onStart---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameStart();
        protocol.unPack(data);
        this.singleGameStart = protocol;
        this.wxShareNum = this.singleGameStart.WxShareNum;
        this.curGameId = protocol.GameId;
        this.curGameMaxLevel = protocol.maxChapter;
        this.gemNum = protocol.Gemstone;
        this.level = protocol.Chapter > 0 ? protocol.Chapter : 0;
        this.curArmsId = protocol.CurArmsId;
        cc.log("onStart---", this.singleGameStart);
        cc.director.loadScene(DataManager_1.default.getInstance().curGameType + "Start");
    };
    SingleGameLogic.prototype.getStartData = function () {
        return this.singleGameStart;
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22465g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //同步数据
    SingleGameLogic.prototype.gameSyn = function (gameSynData) {
        this.level = gameSynData.Chapter;
        gameSynData.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        cc.log("gameSyn---", gameSynData);
        if (SingleGameLogic.getInstance().curGameMaxLevel < this.level) {
            SingleGameLogic.getInstance().curGameMaxLevel = this.level;
            SingleGameLogic.getInstance().checkLevelFinishArms();
        }
        HttpHelper_1.HttpHelper.sendHttpData(gameSynData, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SYN_ID, this.onGameSyn.bind(this), this.onGameSynFailed.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2bb2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.onGameSyn = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onGameSyn---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameSyn();
        protocol.unPack(data);
        this.curGameMaxLevel = protocol.maxChapter;
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_SNY_SUCCESS);
        cc.log("onGameSyn---", protocol);
    };
    SingleGameLogic.prototype.onGameSynFailed = function (states) {
        cc.log("onGameSynFailed---");
        MKUtils_1.default.errorTips("网络异常，进度无法保存哦");
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22nhg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //复活
    SingleGameLogic.prototype.buyLife = function (credit) {
        var value = new singleGameProtocol_1.CSSingleGameLife();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.CREDIT = credit;
        cc.log("buyLife---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LIFE_ID, this.onBuyLife.bind(this), this.onBuyLifeFailed.bind(this));
    };
    SingleGameLogic.prototype.onBuyLife = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onBuyLife---data null");
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_BUY_LIEF_FAIL);
            MKUtils_1.default.errorTips("复活失败");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameLife();
        protocol.unPack(data);
        cc.log("onBuyLife---", protocol);
        if (protocol.StateId == 0) {
            DataManager_1.default.getInstance().userData.setUserCreditNum(DataManager_1.default.getInstance().userData.getUserCreditNum() - protocol.CREDIT);
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_BUY_LIEF_SUCCESS);
        }
        else {
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_BUY_LIEF_FAIL);
            MKUtils_1.default.errorTips("复活失败");
        }
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224hsds2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.onBuyLifeFailed = function (states) {
        cc.log("onBuyLifeFailed--- net error", states);
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_BUY_LIEF_FAIL);
        MKUtils_1.default.errorTips("网络异常，复活失败");
    };
    //结算/失败
    SingleGameLogic.prototype.showFail = function (data) {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(gameId);
        if (config && config["fileName"] && config["fileName"] != "") {
            var prefabUrl = "smallgames/" + config["fileName"] + "/base/fail/SingleFail";
            MKUtils_1.default.loadPrefab(prefabUrl, function (prefab) {
                var dialog = cc.instantiate(prefab);
                dialog.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                cc.director.getScene().addChild(dialog, 10);
                dialog.getComponent("SingleFailScript").setData(data);
            }.bind(this));
        }
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22ds2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.showSuccess = function () {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(gameId);
        if (config && config["fileName"] && config["fileName"] != "") {
            var prefabUrl = "smallgames/" + config["fileName"] + "/base/success/SingleSuccess";
            MKUtils_1.default.loadPrefab(prefabUrl, function (prefab) {
                var dialog = cc.instantiate(prefab);
                dialog.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                cc.director.getScene().addChild(dialog, 10);
                //检查有没有新的武器
                dialog.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                    SingleGameLogic.getInstance().checkNewArms();
                })));
            }.bind(this));
        }
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22mhg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //通关奖励数量
    SingleGameLogic.prototype.getLevelRewardNum = function () {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var gameJson = DataManager_1.default.getInstance().getGameJsonById(gameId);
        if (gameJson && gameJson["levelSuccessRewardGemNum"]) {
            return gameJson["levelSuccessRewardGemNum"];
        }
        else {
            return 1;
        }
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22nbcg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //离线奖励/果汁店
    SingleGameLogic.prototype.getLevelReward = function (gemNum) {
        var value = new singleGameProtocol_1.CSSingleGameRes();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.Gem = gemNum;
        cc.log("getLevelReward---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LEVEL_REWARD_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("getLevelReward---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCSingleGameRes();
            protocol.unPack(data);
            cc.log("getLevelRewardsuccess---", protocol);
            SingleGameLogic.getInstance().showReward(gemNum);
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_START_NEXT_LEVEL);
        }.bind(this), function (states) {
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_START_NEXT_LEVEL);
            MKUtils_1.default.errorTips("网络异常，领取失败");
        }.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2ww2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //显示失误了
    SingleGameLogic.prototype.onOpenGameFailure = function (callFun, price) {
        var prefabUrl = "public/prefabs/GameFailure";
        cc.loader.loadRes(prefabUrl, function (errorMessage, loadedResource) {
            //检查资源加载
            if (errorMessage) {
                cc.log('载入预制资源失败, 原因:' + errorMessage);
                return;
            }
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log('你载入的不是预制资源!');
                return;
            }
            //开始实例化预制资源
            var prefab = cc.instantiate(loadedResource);
            prefab.setAnchorPoint(0.5, 0.5);
            prefab.setPosition(0, 0);
            var objIt = prefab.getComponent("GameFailure");
            if (objIt) {
                //传入 一个回调函数，一个复活消耗数量              
                //objIt.setfallbackFunction(function(){},100);    
                objIt.setfallbackFunction(callFun, price);
            }
            prefab.setPosition(360, 640);
            cc.director.getScene().addChild(prefab, 8, "SingleGameFailureDialog");
        }.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_wvd3g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //显示暂停
    SingleGameLogic.prototype.onOpenGamePause = function (callFun) {
        var prefabUrl = "public/prefabs/GamePause";
        cc.loader.loadRes(prefabUrl, function (errorMessage, loadedResource) {
            //检查资源加载
            if (errorMessage) {
                cc.log('载入预制资源失败, 原因:' + errorMessage);
                return;
            }
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log('你载入的不是预制资源!');
                return;
            }
            //开始实例化预制资源
            var prefab = cc.instantiate(loadedResource);
            prefab.setAnchorPoint(0.5, 0.5);
            prefab.setPosition(0, 0);
            var objIt = prefab.getComponent("GamePause");
            if (objIt) {
                objIt.setfallbackFunction(callFun);
            }
            prefab.setPosition(360, 640);
            cc.director.getScene().addChild(prefab, 100);
        }.bind(this));
    };
    //排行
    SingleGameLogic.prototype.getGameOrder = function (gameId) {
        var value = new singleGameProtocol_1.CSSingleGameOrder();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = gameId;
        cc.log("getGameOrder---", gameId);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_ORDER_ID, this.onGetGameOrder.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22vcx = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.onGetGameOrder = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onGetGameOrder---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameOrder();
        protocol.unPack(data);
        this.singleGameOrder = protocol;
        cc.log("onGetGameOrder---", this.singleGameOrder);
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w222453g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.getOrderData = function () {
        if (this.singleGameOrder != null && this.singleGameOrder.GameId == DataManager_1.default.getInstance().curGameID) {
            return this.singleGameOrder;
        }
        else {
            return null;
        }
    };
    //分享次数
    SingleGameLogic.prototype.getWXShareNum = function () {
        return this.wxShareNum;
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224543g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.useWXShareNum = function () {
        this.wxShareNum = this.wxShareNum - 1;
        var value = new singleGameProtocol_1.CSSingleGameSend();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("useWXShareNum---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SEND_ID, this.onUseWXShareNum.bind(this));
    };
    SingleGameLogic.prototype.onUseWXShareNum = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onUseWXShareNum---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameSend();
        protocol.unPack(data);
        this.wxShareNum = protocol.WxShareNum;
        cc.log("onUseWXShareNum---", protocol);
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2245ddg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.refreshRewardType = function () {
        if (MKUtils_1.default.isWXGameFun()) {
            var gameId = DataManager_1.default.getInstance().curGameID;
            var jsonData = DataManager_1.default.getInstance().getGameJsonById(gameId);
            if (jsonData && jsonData["rewardTypes"] && jsonData["rewardTypes"].length > 0) {
                var rewardTypeConfig = jsonData["rewardTypes"];
                this.curRewardTypeIndex = this.curRewardTypeIndex + 1;
                if (this.curRewardTypeIndex < 0) {
                    this.curRewardTypeIndex = 0;
                }
                if (this.curRewardTypeIndex >= rewardTypeConfig.length) {
                    this.curRewardTypeIndex = 0;
                }
                this.curGetRewardType = rewardTypeConfig[this.curRewardTypeIndex];
                if (this.curGetRewardType == Constant_1.default.SingleRewardType.SHARE && this.getWXShareNum() <= 0) {
                    this.curGetRewardType = Constant_1.default.SingleRewardType.AD;
                }
                if (this.curGetRewardType == Constant_1.default.SingleRewardType.AD && (!this.rewardVideoAdEnable) && this.getWXShareNum() > 0) {
                    this.curGetRewardType = Constant_1.default.SingleRewardType.SHARE;
                }
            }
            else {
                this.curGetRewardType = Constant_1.default.SingleRewardType.AD;
            }
        }
        else {
            this.curGetRewardType = Constant_1.default.SingleRewardType.AD;
        }
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE);
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2vv = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //领奖
    SingleGameLogic.prototype.getReward = function (successCallback, failCallback, adIndex) {
        // if (successCallback) { //test
        //     successCallback()
        //     return
        // }
        if (SingleGameLogic.getInstance().curGetRewardType == Constant_1.default.SingleRewardType.AD) {
            if (MKUtils_1.default.isWXGameFun()) {
                SDKManager_1.default.getInstance().playRewardVideoAd(adIndex, successCallback, failCallback);
            }
            else {
                SingleGameLogic.getInstance().refreshRewardType();
                if (DataManager_1.default.getInstance().getWbAdCount() > 0) {
                    SDKManager_1.default.getInstance().playVideoAd(successCallback, failCallback);
                }
                else {
                    MKUtils_1.default.errorTips("今日视频广告次数已用完");
                    if (failCallback) {
                        failCallback();
                    }
                }
            }
        }
        else if (SingleGameLogic.getInstance().curGetRewardType == Constant_1.default.SingleRewardType.SHARE) {
            if (MKUtils_1.default.isWXGameFun()) {
                if (SingleGameLogic.getInstance().getWXShareNum() > 0) {
                    SDKManager_1.default.getInstance().shareAppMessage(function () {
                        SingleGameLogic.getInstance().useWXShareNum();
                        if (successCallback) {
                            successCallback();
                        }
                        if (this.curGetRewardType == Constant_1.default.SingleRewardType.SHARE && this.getWXShareNum() <= 0) {
                            SingleGameLogic.getInstance().refreshRewardType();
                        }
                    }.bind(this), failCallback);
                }
                else {
                    MKUtils_1.default.errorTips("今日分享次数已用完");
                    if (failCallback) {
                        failCallback();
                    }
                }
            }
            else {
                if (failCallback) {
                    failCallback();
                }
            }
            SingleGameLogic.getInstance().refreshRewardType();
        }
        else {
            MKUtils_1.default.errorTips("功能暂未开放，敬请期待！");
            SingleGameLogic.getInstance().refreshRewardType();
            if (failCallback) {
                failCallback();
            }
        }
    };
    SingleGameLogic.prototype.addGem = function (num) {
        SingleGameLogic.getInstance().gemNum = SingleGameLogic.getInstance().gemNum + num;
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_REFRESH_GEM);
    };
    SingleGameLogic.prototype.subGem = function (num) {
        SingleGameLogic.getInstance().gemNum = SingleGameLogic.getInstance().gemNum - num;
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_REFRESH_GEM);
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224wq = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //打开武将库界面
    SingleGameLogic.prototype.openArmsDialog = function () {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(gameId);
        if (config && config["fileName"] && config["fileName"] != "") {
            var prefabUrl = "smallgames/" + config["fileName"] + "/base/arms/SingleArms";
            MKUtils_1.default.loadPrefab(prefabUrl, function (armsPrefab) {
                if (cc.director.getScene().getChildByName("SingleArms")) {
                    return;
                }
                var dialog = cc.instantiate(armsPrefab);
                dialog.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 100);
                cc.director.getScene().addChild(dialog, 10, "SingleArms");
            }.bind(this));
        }
    };
    SingleGameLogic.prototype.getNextArmsConfig = function (maxLevel) {
        if (!maxLevel) {
            maxLevel = SingleGameLogic.getInstance().curGameMaxLevel;
        }
        var gameId = DataManager_1.default.getInstance().curGameID;
        var gameJson = DataManager_1.default.getInstance().getGameJsonById(gameId);
        if (gameJson && gameJson["arms"]) {
            for (var i = 0; i < gameJson["arms"]["armsType"].length; i++) {
                var jsonData = gameJson["arms"]["armsType"][i];
                if (jsonData["type"] == 2) {
                    for (var j = 0; j < jsonData["ids"].length; j++) {
                        if (jsonData["ids"][j]["level"] >= maxLevel) {
                            return jsonData["ids"][j];
                        }
                    }
                }
            }
        }
        return 0;
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22w23g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.getArmsJsonConfig = function (armsId) {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var gameJson = DataManager_1.default.getInstance().getGameJsonById(gameId);
        if (gameJson && gameJson["arms"]) {
            return gameJson["arms"]["allArms"][armsId];
        }
        return null;
    };
    SingleGameLogic.prototype.checkLevelFinishArms = function () {
        var maxLevel = SingleGameLogic.getInstance().curGameMaxLevel;
        var gameId = DataManager_1.default.getInstance().curGameID;
        var gameJson = DataManager_1.default.getInstance().getGameJsonById(gameId);
        if (gameJson && gameJson["arms"]) {
            for (var i = 0; i < gameJson["arms"]["armsType"].length; i++) {
                var jsonData = gameJson["arms"]["armsType"][i];
                if (jsonData["type"] == 2) {
                    for (var j = 0; j < jsonData["ids"].length; j++) {
                        if (jsonData["ids"][j]["level"] == maxLevel - 1) {
                            SingleGameLogic.getInstance().newArmsId = jsonData["ids"][j]["id"];
                            return;
                        }
                    }
                }
            }
        }
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224eq3g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.checkNewArms = function () {
        if (SingleGameLogic.getInstance().newArmsId > 0) {
            SingleGameLogic.getInstance().changeArmsSyn(SingleGameLogic.getInstance().newArmsId);
            SingleGameLogic.getInstance().showRewardArms(SingleGameLogic.getInstance().newArmsId);
            SingleGameLogic.getInstance().newArmsId = 0;
        }
    };
    //更换武器
    SingleGameLogic.prototype.changeArmsSyn = function (armsId) {
        var value = new singleGameProtocol_1.CSSingleGameExchange();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.Skin = armsId;
        cc.log("changeArmsSyn---", value);
        SingleGameLogic.getInstance().curArmsId = armsId;
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_EXCHANGE_ID, this.changeArmsSynSuccess.bind(this), this.changeArmsSynFailed.bind(this));
    };
    SingleGameLogic.prototype.changeArmsSynSuccess = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("changeArmsSynSuccess---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameExchange();
        protocol.unPack(data);
        cc.log("changeArmsSynSuccess---", protocol);
    };
    SingleGameLogic.prototype.changeArmsSynFailed = function (states) {
        cc.log("changeArmsSynFailed---");
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22sw3g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //签到
    SingleGameLogic.prototype.getSignData = function (successCallback, failCallback) {
        var value = new singleGameProtocol_1.CSSingleGameCheckIn();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("getSignData---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKIN_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("getSignDataSuccess---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCSingleGameCheckIn();
            protocol.unPack(data);
            cc.log("getSignDataSuccess---", protocol);
            successCallback(protocol);
        }.bind(this), function (states) {
            if (failCallback) {
                failCallback(states);
            }
        }.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22bdd3g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.signReward = function () {
        var value = new singleGameProtocol_1.CSSingleGameCheckDay();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("signReward---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKDAY_ID, this.signRewardSuccess.bind(this));
    };
    SingleGameLogic.prototype.signRewardSuccess = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("signRewardSuccess---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameCheckDay();
        protocol.unPack(data);
        cc.log("signRewardSuccess---", protocol);
        this.addGem(protocol.Gem);
        this.showReward(protocol.Gem);
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224bdsg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.checkSign = function (mustOpen) {
        this.getSignData(function (protocol) {
            if (mustOpen || protocol.HasGet == 0) {
                var gameId = DataManager_1.default.getInstance().curGameID;
                var config = DataManager_1.default.getInstance().getGameConfig(gameId);
                if (config && config["fileName"] && config["fileName"] != "") {
                    var signPrefabUrl = "smallgames/" + config["fileName"] + "/base/sign/SingleSign";
                    MKUtils_1.default.loadPrefab(signPrefabUrl, function (armsPrefab) {
                        if (cc.director.getScene().getChildByName("SingleSign")) {
                            return;
                        }
                        var dialog = cc.instantiate(armsPrefab);
                        dialog.getComponent("SingleSignScript").setSignData(protocol);
                        dialog.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                        cc.director.getScene().addChild(dialog, 10, "SingleSign");
                    }.bind(this));
                }
            }
            else {
                SingleGameLogic.getInstance().checkActive();
            }
        }.bind(this));
    };
    //钻石奖励界面
    SingleGameLogic.prototype.showReward = function (num) {
        var prefabUrl = "single/reward/RewardDialog";
        MKUtils_1.default.loadPrefab(prefabUrl, function (prefab) {
            var node = cc.instantiate(prefab);
            node.getComponent("SingleRewardScript").setNum(num);
            node.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
            cc.director.getScene().addChild(node, 11, "SingleReward");
        }.bind(this));
    };
    SingleGameLogic.prototype.showRewardArms = function (armsId) {
        var prefabUrl = "single/reward/RewardDialog";
        MKUtils_1.default.loadPrefab(prefabUrl, function (prefab) {
            var node = cc.instantiate(prefab);
            node.getComponent("SingleRewardScript").setArms(armsId);
            node.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
            cc.director.getScene().addChild(node, 11, "SingleReward");
        }.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2ewq3g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //离线奖励/果汁店
    SingleGameLogic.prototype.getOfflineData = function (successCallback, failCallback) {
        var value = new singleGameProtocol_1.CSSingleGameOffLine();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("getOfflineData---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("getOfflineData---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCSingleGameOffLine();
            protocol.unPack(data);
            cc.log("getOfflineData---", protocol);
            successCallback(protocol);
        }.bind(this), function (states) {
            if (failCallback) {
                failCallback(states);
            }
        }.bind(this));
    };
    SingleGameLogic.prototype.offlineReward = function (flag) {
        var value = new singleGameProtocol_1.CSSingleGameClick();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.Flag = flag;
        cc.log("offlineReward---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_CLICK_ID, this.offlineRewardSuccess.bind(this));
    };
    SingleGameLogic.prototype.offlineRewardSuccess = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("offlineRewardSuccess---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleGameClick();
        protocol.unPack(data);
        cc.log("offlineRewardSuccess---", protocol);
        this.addGem(protocol.Gem);
        this.showReward(protocol.Gem);
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2bde = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.offlineDouble = function () {
        var value = new singleGameProtocol_1.CSSingleGameDouble();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("offlineDouble---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_DOUBLE_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("offlineDouble---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCSingleGameDouble();
            protocol.unPack(data);
            cc.log("offlineDouble---", protocol);
        }.bind(this));
    };
    //打开界面
    SingleGameLogic.prototype.checkOffline = function (mustOpen) {
        if (MKUtils_1.default.isWxReview()) {
            return;
        }
        this.getOfflineData(function (protocol) {
            if (mustOpen || protocol.Gem > 0) {
                var gameId = DataManager_1.default.getInstance().curGameID;
                var config = DataManager_1.default.getInstance().getGameConfig(gameId);
                if (config && config["fileName"] && config["fileName"] != "") {
                    var offlinPrefabUrl = "smallgames/" + config["fileName"] + "/base/offline/SingleOffline";
                    MKUtils_1.default.loadPrefab(offlinPrefabUrl, function (prefab) {
                        if (cc.director.getScene().getChildByName("SingleOffline")) {
                            return;
                        }
                        var dialog = cc.instantiate(prefab);
                        dialog.getComponent("SingleOfflineScript").setOfflineData(protocol);
                        dialog.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                        cc.director.getScene().addChild(dialog, 10, "SingleOffline");
                    }.bind(this));
                }
            }
            else {
                SingleGameLogic.getInstance().checkActive();
            }
        }.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224nddg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //主动弹出活动界面
    SingleGameLogic.prototype.checkActive = function () {
        if (this.activeShowConfig.length > 0) {
            var activeType = this.activeShowConfig[0];
            this.activeShowConfig.splice(0, 1);
            if (activeType == Constant_1.default.SingleActiveType.SIGN) {
                SingleGameLogic.getInstance().checkSign(false);
            }
            else if (activeType == Constant_1.default.SingleActiveType.OFFLINE) {
                SingleGameLogic.getInstance().checkOffline(false);
            }
            else {
                SingleGameLogic.getInstance().checkActive();
            }
        }
    };
    //邀请好友
    SingleGameLogic.prototype.openInvite = function () {
        if (!MKUtils_1.default.isWXGameFun()) {
            MKUtils_1.default.errorTips("功能暂未开放，敬请期待");
            return;
        }
        if (MKUtils_1.default.isWxReview()) {
            MKUtils_1.default.errorTips("功能暂未开放，敬请期待");
            return;
        }
        var gameId = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(gameId);
        if (config && config["fileName"] && config["fileName"] != "") {
            var prefabUrl = "smallgames/" + config["fileName"] + "/base/invite/SingleInvite";
            MKUtils_1.default.loadPrefab(prefabUrl, function (prefab) {
                if (cc.director.getScene().getChildByName("SingleInvite")) {
                    return;
                }
                var dialog = cc.instantiate(prefab);
                dialog.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                cc.director.getScene().addChild(dialog, 10, "SingleInvite");
            }.bind(this));
        }
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224vdd2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.getInviteInfo = function (successCallback) {
        var value = new singleGameProtocol_1.CSSingleGameInviteInfo();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("getInviteInfo---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_INFO_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("getInviteInfo---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCSingleGameInviteInfo();
            protocol.unPack(data);
            cc.log("getInviteInfo success---", protocol);
            successCallback(protocol);
        }.bind(this), function (states) {
        }.bind(this));
    };
    SingleGameLogic.prototype.inviteBind = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        var value = new singleGameProtocol_1.CSSingleGameInviteBind();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.InvitePid = SDKManager_1.default.getInstance().getInvitePid();
        cc.log("inviteBind---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_BIND_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("inviteBind---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCSingleGameInviteBind();
            protocol.unPack(data);
            cc.log("inviteBind success---", protocol);
        }.bind(this), function (states) {
        }.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w224ndfdg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleGameLogic.prototype.getInviteReward = function (typeId, successCallback, failCallback) {
        var value = new singleGameProtocol_1.CSSingleGameInviteDraw();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.TypeId = typeId;
        cc.log("getInviteReward---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_DRAW_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("getInviteReward---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCSingleGameInviteDraw();
            protocol.unPack(data);
            cc.log("getInviteReward success---", protocol);
            successCallback(protocol);
            this.showReward(protocol.Total);
            this.addGem(protocol.Total);
        }.bind(this), function (states) {
            if (failCallback) {
                failCallback();
            }
        }.bind(this));
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w2rrr3g2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //服务器存储微信用户信息
    SingleGameLogic.prototype.wxUserInfo = function (name, photo) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        var value = new singleGameProtocol_1.CSWXUserInfo();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.Name = name;
        value.Photo = photo;
        cc.log("wxUserInfo---", DataManager_1.default.getInstance().curGameID);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_WX_USERINFO_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("wxUserInfo---data null");
                return;
            }
            var protocol = new singleGameProtocol_1.SCWXUserInfo();
            protocol.unPack(data);
            cc.log("wxUserInfo success---", protocol);
        }.bind(this), function (states) {
        }.bind(this));
    };
    //排行榜
    SingleGameLogic.prototype.showAllRank = function (item) {
        cc.log("showAllRank, item:", item);
        var gameId = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(gameId);
        if (config && config["fileName"] && config["fileName"] != "") {
            var prefabUrl = "smallgames/" + config["fileName"] + "/base/rank/rankPrefab";
            cc.loader.loadRes(prefabUrl, function (errorMessage, loadedResource) {
                if (errorMessage) {
                    cc.log("load rankPrefab error : " + errorMessage);
                    return;
                }
                var prefab = cc.instantiate(loadedResource);
                prefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
                cc.director.getScene().addChild(prefab, 9);
                SDKManager_1.default.getInstance().showAllRank(item);
            }.bind(this));
        }
    };
    SingleGameLogic.prototype.WX_ThreeKingFun_w22bbb2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //邀请好友
    SingleGameLogic.prototype.openExchangeGem = function () {
        if (MKUtils_1.default.isWXGameFun()) {
            MKUtils_1.default.errorTips("功能暂未开放，敬请期待");
            return;
        }
        var gameId = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(gameId);
        if (config && config["fileName"] && config["fileName"] != "") {
            var prefabUrl = "smallgames/" + config["fileName"] + "/base/exchange/SingleExchange";
            MKUtils_1.default.loadPrefab(prefabUrl, function (prefab) {
                if (cc.director.getScene().getChildByName("SingleExchange")) {
                    return;
                }
                var dialog = cc.instantiate(prefab);
                dialog.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                cc.director.getScene().addChild(dialog, 10, "SingleExchange");
            }.bind(this));
        }
    };
    return SingleGameLogic;
}());
exports.default = SingleGameLogic;

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
        //# sourceMappingURL=SingleGameLogic.js.map
        