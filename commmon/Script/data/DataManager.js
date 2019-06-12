(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/data/DataManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e50d21ERNZFaYrqfCyQPscU', 'DataManager', __filename);
// Script/data/DataManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var configsFile_1 = require("./configsFile");
var configsFile_2 = require("./configsFile");
var UserData_1 = require("./UserData");
var Protocol_1 = require("../network/Protocol");
var GameData_1 = require("../../home/Common/common_Script/GameData");
var GameData_2 = require("../../home/Common/common_Script/GameData");
var Event_1 = require("../event/Event");
var EvenID_1 = require("../event/EvenID");
var MKUtils_1 = require("../common/MKUtils");
var Constant_1 = require("../common/Constant");
var LogicController_1 = require("../logic/LogicController");
var DataManager = /** @class */ (function () {
    function DataManager() {
        this.configs = {};
        this.userData = null;
        this.playerData = null;
        this.curGameType = ""; //当前游戏sence名称
        this.curGameID = 0; //当前游戏ID  0游戏大厅
        this.resultData = null;
        this.mMaintence = ""; //维护公告
        this.showVSLayer = false;
        this.netState = true; //网络状态
        this.isLoading = false; //是否进入游戏过程中
        this.gameLoad = {}; //是否进入游戏过程中
        this.gameJson = {}; //单个游戏json配置
        this.seveceID = "";
        this.signInfo = null;
        this.wheelInfo = null;
        this.wheelGainInfo = null;
        this.hotGameID = 38; //热门游戏
        this.broadCast = null;
        this.isWheelEnter = false; //是否转盘进入游戏
        this.isHomeShowBroad = false; //是否正在展示大厅广播
        this.configs = {};
        this.userData = new UserData_1.UserData();
        this.gameLst = new Array();
        this.playerData = new GameData_1.PlayerData();
        this.resultData = new GameData_2.GameResultData();
        this.signInfo = new Protocol_1.SCSignInfo();
        this.wheelInfo = new Protocol_1.SCBigWheelInfo();
        this.wheelGainInfo = new Protocol_1.SCBigWheelGain();
    }
    DataManager.prototype.initData = function () {
        cc.log("DataManager --- initData");
        this.initGameType();
        this.initSmallGameId();
        var arr = Object.keys(configsFile_1.Configs);
        for (var i = 0; i < arr.length; i++) {
            var jsonFile = configsFile_1.Configs[arr[i]];
            this.loadConfig(jsonFile);
        }
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44b = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.initGameType = function () {
        var gameType = MKUtils_1.default.getUrlParamByName("gameType");
        if (gameType) {
            gameType = parseInt(gameType);
            if (gameType == 8) {
                configsFile_2.Sina_Config.GameType = Constant_1.default.GameType.WB_WALLET;
            }
            else if (gameType == 9) {
                configsFile_2.Sina_Config.GameType = Constant_1.default.GameType.WB_WYX;
            }
            else if (gameType == 10) {
                configsFile_2.Sina_Config.GameType = Constant_1.default.GameType.WB_TASK;
            }
        }
        cc.log("initGameType --- Sina_Config.GameType:", configsFile_2.Sina_Config.GameType);
    };
    DataManager.prototype.initSmallGameId = function () {
        var smallGameID = MKUtils_1.default.getUrlParamByName("gameId");
        if (smallGameID) {
            smallGameID = parseInt(smallGameID);
            configsFile_2.Sina_Config.SmallGameId = smallGameID;
        }
        cc.log("initSmallGameId --- Sina_Config.SmallGameId:", configsFile_2.Sina_Config.SmallGameId);
    };
    DataManager.prototype.downCommonConfig = function (successCallback) {
        DataManager.getInstance().loadGameJson("commonConfig", function () {
            cc.log("downCommonConfig success");
            if (successCallback) {
                successCallback();
            }
        }.bind(this));
    };
    DataManager.prototype.getCommonConfig = function () {
        return DataManager.getInstance().getGameJson("commonConfig");
    };
    DataManager.prototype.getCommonConfigByItem = function (item) {
        var commonConfig = DataManager.getInstance().getCommonConfig();
        if (commonConfig && commonConfig[item] != undefined) {
            return commonConfig[item];
        }
        else {
            return null;
        }
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44bv = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    // 读取配置表
    DataManager.prototype.loadConfig = function (name, folder) {
        var _this = this;
        var fileName = name;
        var data = this.configs[fileName];
        if (data != undefined) {
            return;
        }
        if (!folder)
            folder = "home/configs/";
        var jsonFile = folder + fileName;
        cc.loader.loadRes(jsonFile, function (error, jsonData) {
            if (error) {
                cc.log(error);
            }
            else {
                //cc.log("loadConfig json data = ", jsonData);
                _this.configs[name] = jsonData.json;
                _this.checkFinishConfig();
            }
        });
    };
    DataManager.prototype.checkFinishConfig = function () {
        var arr = Object.keys(configsFile_1.Configs);
        for (var i = 0; i < arr.length; i++) {
            var jsonFile = configsFile_1.Configs[arr[i]];
            if (!this.configs[jsonFile]) {
                return false;
            }
        }
        DataManager.getInstance().downCommonConfig(function () {
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_LOAD_CONFIG_SUCCESS);
        }.bind(this));
        return true;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44b2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //下载小游戏的json文件
    DataManager.prototype.loadGameJson = function (name, callback) {
        if (this.gameJson[name]) {
            callback();
            return;
        }
        var fullUrl = configsFile_2.Sina_Config.JSON_SERVER_URL + name + ".json";
        cc.loader.load(fullUrl, function (error, jsonData) {
            if (error) {
                cc.log("loadGameConfig ERROR! name:", name, ", ", error);
            }
            else {
                cc.log("loadConfig json data = ", jsonData);
                this.gameJson[name] = jsonData;
                cc.log("loadConfig json success! name:", name, ", json:", this.gameJson[name]);
                callback();
            }
        }.bind(this));
    };
    DataManager.prototype.getGameJson = function (name) {
        return this.gameJson[name];
    };
    DataManager.prototype.getGameJsonById = function (gameId) {
        var config = DataManager.getInstance().getGameConfig(gameId);
        if (config && config["jsonData"] && config["jsonData"] != "") {
            return this.getGameJson(config["jsonData"]);
        }
        return null;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44bnn = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.getGameConfig = function (gameId) {
        return this.configs[configsFile_1.Configs.GameLst][gameId];
    };
    DataManager.prototype.setIsLoading = function (value) {
        this.isLoading = value;
    };
    DataManager.prototype.getIsLoading = function () {
        return this.isLoading;
    };
    DataManager.prototype.setNetState = function (state) {
        this.netState = state;
    };
    DataManager.prototype.getNetState = function () {
        return this.netState;
    };
    DataManager.prototype.getuserData = function () {
        return this.userData;
    };
    DataManager.prototype.setHomeShowBroad = function (info) {
        this.isHomeShowBroad = info;
    };
    DataManager.prototype.getHomeShowBroad = function () {
        return this.isHomeShowBroad;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb454b = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.setWheelEnterState = function () {
        this.isWheelEnter = true;
    };
    DataManager.prototype.isWheelEnterState = function () {
        return this.isWheelEnter;
    };
    DataManager.prototype.getWheelEnterState = function () {
        var temp = this.isWheelEnter;
        this.isWheelEnter = false;
        return temp;
    };
    DataManager.prototype.setUserData = function (scLogin) {
        this.userData.Account = scLogin.Account;
        this.userData.Address = scLogin.Address;
        this.userData.Gender = scLogin.Gender;
        this.userData.HeadImgPath = scLogin.HeadImgPath;
        this.userData.Name = scLogin.Name;
        this.userData.Password = scLogin.Password;
        this.userData.StatusID = scLogin.StatusID;
        this.userData.PlatformID = scLogin.PlatformID;
        this.userData.HttpCode = scLogin.HttpCode;
        this.userData.playerFlag = scLogin.playerFlag;
        this.userData.credit = scLogin.credit;
        this.userData.wbAdCount = parseInt(scLogin.Password);
        cc.log("setUserData --- ", this.userData);
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44hhb = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.setUserData2 = function (enterGame) {
        this.userData.StatusID = enterGame.StatusID;
        this.userData.GiftNum = enterGame.GiftNum;
        this.userData.Level = enterGame.Level;
        this.userData.CoinNum = enterGame.CoinNum;
        this.userData.NowExp = enterGame.NowExp;
        this.userData.NextExp = enterGame.NextExp;
        this.userData.Title = enterGame.Title;
    };
    DataManager.prototype.setWbAdCount = function (count) {
        this.userData.wbAdCount = count;
        cc.log("setWbAdCount --- ", this.userData.wbAdCount);
    };
    DataManager.prototype.getWbAdCount = function () {
        return this.userData.wbAdCount;
    };
    DataManager.prototype.getGameItemInfo = function (gameID) {
        for (var i = 0; i < this.gameLst.length; i++) {
            if (gameID == this.gameLst[i].ID) {
                return this.gameLst[i];
            }
        }
        return null;
    };
    //判断是否有新游戏标签
    DataManager.prototype.getIsNew = function (gameID) {
        for (var i = 0; i < Constant_1.default.NewGameIds.length; i++) {
            if (gameID == Constant_1.default.NewGameIds[i]) {
                return true;
            }
        }
        return false;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44mjb = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //判断是否有火爆游戏标签
    DataManager.prototype.getIsHot = function (gameID) {
        for (var i = 0; i < Constant_1.default.HotGameIds.length; i++) {
            if (gameID == Constant_1.default.HotGameIds[i]) {
                return true;
            }
        }
        return false;
    };
    DataManager.prototype.setGameLst = function (lst) {
        this.gameLst = lst;
        var showGameIds;
        if (configsFile_2.Sina_Config.GameType == Constant_1.default.GameType.WB_TASK || configsFile_2.Sina_Config.GameType == Constant_1.default.GameType.WB_WALLET) {
            showGameIds = Constant_1.default.ShowGameIds_WBTASK;
        }
        else {
            showGameIds = Constant_1.default.ShowGameIds_OTHER;
        }
        var len = this.gameLst.length;
        for (var i = len - 1; i >= 0; i--) {
            var haveId = false;
            for (var j = 0; j < showGameIds.length; j++) {
                if (this.gameLst[i].ID == showGameIds[j]) {
                    haveId = true;
                    break;
                }
            }
            if (!haveId) {
                this.gameLst.splice(i, 1);
            }
        }
        this.refreshOnlineNum();
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44324b = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.refreshOnlineNum = function () {
        for (var i = 0; i < this.gameLst.length; i++) {
            if (this.gameLst[i].onlineNum <= 0) {
                var config = this.getGameConfig(this.gameLst[i].ID);
                if (config && config["onlineIds"] && config["onlineIds"] != "") {
                    var onlineIds = config["onlineIds"].split("_");
                    var onlineNum = 0;
                    var addNum = 0;
                    for (var j = 0; j < onlineIds.length; j++) {
                        var gameInfo = this.getGameInfo(parseInt(onlineIds[j]));
                        if (gameInfo != null) {
                            onlineNum = onlineNum + gameInfo.onlineNum;
                            addNum = addNum + 1;
                        }
                    }
                    if (addNum > 0) {
                        onlineNum = Math.floor(onlineNum / addNum);
                    }
                    onlineNum = onlineNum + MKUtils_1.default.randomNM(0, 200);
                    if (onlineNum <= 0) {
                        onlineNum = 0;
                    }
                    this.gameLst[i].onlineNum = onlineNum;
                    cc.log("onlineNum---", this.gameLst[i].ID, ", ", this.gameLst[i].onlineNum);
                }
            }
        }
    };
    DataManager.prototype.getGameInfo = function (id) {
        for (var i = 0; i < this.gameLst.length; i++) {
            if (id == this.gameLst[i].ID) {
                return this.gameLst[i];
            }
        }
        return null;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb4qq4b = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.setSignInfo = function (info) {
        this.signInfo = info;
    };
    DataManager.prototype.getSignInfo = function () {
        return this.signInfo;
    };
    DataManager.prototype.setWheelInfo = function (info) {
        this.wheelInfo = info;
    };
    DataManager.prototype.getWheelInfo = function () {
        return this.wheelInfo;
    };
    DataManager.prototype.setWheelGainInfo = function (info) {
        this.wheelGainInfo = info;
    };
    DataManager.prototype.getWheelGainInfo = function () {
        return this.wheelGainInfo;
    };
    DataManager.prototype.WX_ThreeKingFun_qin234b44b = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.getGameLst = function () {
        return this.gameLst;
    };
    DataManager.prototype.getPlayerData = function () {
        return this.playerData;
    };
    DataManager.prototype.setPlayerData = function (data) {
        this.playerData = data;
    };
    DataManager.prototype.getResultData = function () {
        return this.resultData;
    };
    DataManager.prototype.setResultData = function (data) {
        this.resultData = data;
    };
    DataManager.prototype.setMaintenance = function (data) {
        this.mMaintence = data;
    };
    DataManager.prototype.getMaintenance = function () {
        return this.mMaintence;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44ewwb = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.setSeveceID = function (value) {
        cc.log("收到数据，保存等待处理---", value);
        this.seveceID = value;
    };
    DataManager.prototype.getSeveceID = function () {
        return this.seveceID;
    };
    DataManager.prototype.setHotGameID = function (ID) {
        this.hotGameID = ID;
    };
    DataManager.prototype.getHotGameID = function () {
        return this.hotGameID;
    };
    //获取我的最爱游戏id，第一个为次数最多的，第23分别为最近玩的游戏
    DataManager.prototype.getLoveIds = function () {
        var ids = [];
        var maxCountId = this.getMaxGameCountId();
        if (maxCountId > 0) {
            ids.push(maxCountId);
            var lastIds = this.readLastGameIds();
            for (var i = 0; i < lastIds.length; i++) {
                if (lastIds[i] != maxCountId) {
                    ids.push(lastIds[i]);
                    if (ids.length >= 3) {
                        break;
                    }
                }
            }
        }
        if (ids.length < 3) {
            ids = [];
        }
        return ids;
    };
    DataManager.prototype.WX_ThreeKingFun_qinbrw44b = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //记录游戏玩的次数
    DataManager.prototype.addGameCount = function (id) {
        this.recordLastGameId(id);
        var gameCount = this.readGameCountData();
        var haveWrite = false;
        for (var i = 0; i < gameCount.length; i++) {
            if (gameCount[i].id == id) {
                gameCount[i].count = gameCount[i].count + 1;
                haveWrite = true;
                break;
            }
        }
        if (!haveWrite) {
            gameCount.push({ id: id, count: 1 });
        }
        this.writeGameCountData(gameCount);
        var maxCountId = this.getMaxGameCountId();
        if (maxCountId > 0) {
            LogicController_1.default.getInstance().miniLoveGameSyn("" + maxCountId);
        }
    };
    DataManager.prototype.getMaxGameCountId = function () {
        var gameCount = this.readGameCountData();
        var maxId = 0;
        var maxCount = 0;
        for (var i = 0; i < gameCount.length; i++) {
            if (gameCount[i].count > maxCount) {
                maxId = gameCount[i].id;
                maxCount = gameCount[i].count;
            }
        }
        return maxId;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44hgb = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.writeGameCountData = function (gameCount) {
        var str = "";
        for (var i = 0; i < gameCount.length; i++) {
            var id = gameCount[i].id;
            var count = gameCount[i].count;
            str = str + id + "_" + count;
            if (i != gameCount.length - 1) {
                str = str + ",";
            }
        }
        cc.log("writeGameCountData ", str, ", ", gameCount);
        cc.sys.localStorage.setItem("SmallGameCountData", str);
    };
    DataManager.prototype.readGameCountData = function () {
        var str = cc.sys.localStorage.getItem("SmallGameCountData");
        if (!str) {
            str = "";
        }
        var gameCountStr = str.split(",");
        var gameCount = [];
        for (var i = 0; i < gameCountStr.length; i++) {
            if (gameCountStr[i] && gameCountStr[i] != "") {
                var id = parseInt(gameCountStr[i].split("_")[0]);
                var count = parseInt(gameCountStr[i].split("_")[1]);
                gameCount.push({ id: id, count: count });
            }
        }
        cc.log("readGameCountData gameCount:", gameCount);
        return gameCount;
    };
    //记录最近玩过的游戏id
    DataManager.prototype.recordLastGameId = function (id) {
        var lastIds = this.readLastGameIds();
        for (var i = 0; i < lastIds.length; i++) {
            if (id == lastIds[i]) {
                lastIds.splice(i, 1);
                break;
            }
        }
        lastIds.splice(0, 0, id);
        this.writeLastGameIds(lastIds);
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44nhhhb = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.writeLastGameIds = function (lastIds) {
        var str = "";
        for (var i = 0; i < lastIds.length; i++) {
            var id = lastIds[i];
            str = str + id;
            if (i != lastIds.length - 1) {
                str = str + ",";
            }
        }
        cc.log("writeLastGameIds ", str, ", ", lastIds);
        cc.sys.localStorage.setItem("SmallGameLastPlayIds", str);
        if (!MKUtils_1.default.isWXGame()) {
            MKUtils_1.default.setCookie("SmallGameLastPlayIds", str);
        }
    };
    DataManager.prototype.WX_ThreeKingFun_qinnnb44b = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.prototype.readLastGameIds = function () {
        var str = cc.sys.localStorage.getItem("SmallGameLastPlayIds");
        if (!str) {
            str = "";
        }
        var lastIdsStr = str.split(",");
        var lastIds = [];
        for (var i = 0; i < lastIdsStr.length; i++) {
            if (lastIdsStr[i] && lastIdsStr[i] != "") {
                var id = parseInt(lastIdsStr[i]);
                if (id && id > 0) {
                    lastIds.push(id);
                }
            }
        }
        cc.log("readLastGameIds gameCount:", lastIds);
        return lastIds;
    };
    DataManager.prototype.WX_ThreeKingFun_qinb44bew = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    DataManager.getInstance = function () {
        if (!this.ins) {
            this.ins = new DataManager();
        }
        return this.ins;
    };
    return DataManager;
}());
exports.default = DataManager;

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
        //# sourceMappingURL=DataManager.js.map
        