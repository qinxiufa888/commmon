(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/logic/LogicController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60d00ro38VN5b9UQPfh9sK+', 'LogicController', __filename);
// Script/logic/LogicController.ts

/**
 * Author: Ma yuan
 * Date: 2018.11.1
 * CopyRight:
 * 大厅通用
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../Event/Event");
var EvenID_1 = require("../event/EvenID");
var Protocol_1 = require("../network/Protocol");
var HttpHelper_1 = require("../network/HttpHelper");
var PacketID_1 = require("../network/PacketID");
var configsFile_1 = require("../data/configsFile");
var DataManager_1 = require("../data/DataManager");
var md5_1 = require("../../libs/md5/md5");
var ScoketManager_1 = require("./ScoketManager");
var HeartBeat_1 = require("./HeartBeat");
var GamesCommonLogic_1 = require("./GamesCommonLogic");
var MKUtils_1 = require("../common/MKUtils");
var Constant_1 = require("../common/Constant");
var SDKManager_1 = require("./SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LogicController = /** @class */ (function (_super) {
    __extends(LogicController, _super);
    function LogicController() {
        var _this = _super.call(this) || this;
        _this.m_socket = null;
        _this.m_hearBeat = null;
        _this.m_gameLogin = null;
        _this.m_isDPReConnect = false; //是否需要重连龙虎斗游戏
        _this.m_reconnectNum = 0;
        _this.m_reconnectMax = 3;
        _this.m_schedule = null;
        _this.haveGetSignInfo = false; //是否已经请求过签到数据
        _this.haveDealSign = false; //是否已经处理过签到功能，签到和救济金不同时显示
        _this.socketErrorNodeName = "SocketConnectError";
        _this.m_socket = ScoketManager_1.default.getInstance();
        _this.m_hearBeat = new HeartBeat_1.default();
        _this.m_gameLogin = GamesCommonLogic_1.default.getInstance();
        _this.m_schedule = cc.director.getScheduler();
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_TCP_CONNECT_SUCCESS, _this.tcpConnectSuccess, _this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_TCP_CLOSED, _this.onTcpClose, _this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_TCP_CONNECT_ERROR, _this.showNetError, _this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_HEART_BEAT_TIMEOUT, _this.showNetError, _this);
        Event_1.default.getInstance().addEventListener((PacketID_1.PacketID._SINA_PACKET_SC_EnterGameID).toString(), _this.onEnterGame, _this);
        Event_1.default.getInstance().addEventListener((PacketID_1.PacketID._SINA_PACKET_SC_CutLineID).toString(), _this.onServerCutLine, _this);
        Event_1.default.getInstance().addEventListener((PacketID_1.PacketID._SINA_PACKET_SC_NoticePlayersOnlineRetID).toString(), _this.onNoticePayersOnlineRetID, _this);
        Event_1.default.getInstance().addEventListener((PacketID_1.PacketID._SINA_PACKET_SC_RotateNoticeID).toString(), _this.onRotateNotice, _this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SHOW_BROADCAST, _this.showBroad.bind(_this), _this);
        return _this;
    }
    LogicController_1 = LogicController;
    LogicController.getInstance = function () {
        if (!this.singleton) {
            this.singleton = new LogicController_1();
        }
        return this.singleton;
    };
    LogicController.prototype.WX_ThreeKingFun_we43s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    // -------------------------登录-------------------------
    LogicController.prototype.sendHttplogin = function () {
        var params = this.getLoginParams();
        var csLogin = new Protocol_1.CSLogin();
        csLogin.Code = 0;
        csLogin.GameID = configsFile_1.Sina_Config.GameAppID;
        csLogin.GameVersion = "4";
        csLogin.VersionName = "";
        csLogin.Devices = params["Devices"] || "";
        csLogin.Passwd = "";
        csLogin.IMEI = params["IMEI"] || "";
        csLogin.sourse = 1; //0:默认socket， 1 websocket 
        csLogin.GameType = params["GameType"] || 1;
        csLogin.ChannelID = params["ChannelID"] || "1001";
        csLogin.PlatformID = params["PlatformID"] || 1;
        csLogin.Token = params["Token"] || "";
        csLogin.UnionID = params["UnionID"] || "";
        csLogin.Account = params["Account"] || this.getDefaultId();
        var str = "versionName=" + csLogin.VersionName + "&channelId=" + csLogin.ChannelID + "&mobileInfo=" + csLogin.Devices + "&platform=" + csLogin.PlatformID + "&account=" + csLogin.Account;
        csLogin.Md5msg = md5_1.Md5.hashStr(str) + "";
        cc.log("sendHttplogin --- start, ", csLogin.Account);
        cc.log("sendHttplogin --- csLogin ", csLogin);
        HttpHelper_1.HttpHelper.sendHttpData(csLogin, PacketID_1.PacketID._SINA_PACKET_CS_Login_ID, this.onLoginSuccess.bind(this), this.onLoginFailed.bind(this));
    };
    LogicController.prototype.getDefaultId = function () {
        var randomId = "";
        if (configsFile_1.Sina_Config.SINA_DEBUG_ACCOUNT) {
            randomId = "" + MKUtils_1.default.getCurOsTime() + "" + MKUtils_1.default.randomNM(1, 1000);
        }
        return configsFile_1.Sina_Config.SINA_WINACCOUNT + randomId;
    };
    LogicController.prototype.WX_ThreeKingFun_wewqs = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.getLoginParams = function () {
        var params = {};
        if (configsFile_1.Sina_Config.GameType == Constant_1.default.GameType.WB_TASK || configsFile_1.Sina_Config.GameType == Constant_1.default.GameType.WB_WYX || configsFile_1.Sina_Config.GameType == Constant_1.default.GameType.WB_WALLET) {
            var urlParams = MKUtils_1.default.getUrlParams();
            params["GameType"] = parseInt(urlParams["gameType"]);
            params["ChannelID"] = urlParams["channelid"];
            params["PlatformID"] = parseInt(urlParams["platformId"]);
            params["Token"] = urlParams["access_token"];
            params["UnionID"] = urlParams["uid"];
            params["Account"] = urlParams["uid"];
        }
        else if (configsFile_1.Sina_Config.GameType >= Constant_1.default.GameType.WX_XYX) {
            var loginParams = SDKManager_1.default.getInstance().getLoginParams();
            var loginConfig = SDKManager_1.default.getInstance().getLoginConfig()[configsFile_1.Sina_Config.SmallGameId];
            params["GameType"] = loginConfig.GameType;
            params["ChannelID"] = loginConfig.ChannelID;
            params["PlatformID"] = 5;
            params["Token"] = loginParams["access_token"];
            params["UnionID"] = loginParams["openId"];
            params["Account"] = loginParams["openId"];
            params["Devices"] = SDKManager_1.default.getInstance().getNickName();
            params["IMEI"] = SDKManager_1.default.getInstance().getAvatarUrl();
        }
        cc.log("getLoginParams --- ", params);
        return params;
    };
    LogicController.prototype.WX_ThreeKingFun_w323s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.onLoginSuccess = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onLoginSuccess data null");
            return;
        }
        var scLogin = new Protocol_1.SCLoginRet();
        scLogin.unPack(data);
        cc.log("onLoginSuccess = ", scLogin);
        console.log("login success status:", scLogin.StatusID);
        configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS = scLogin.Address;
        cc.log("Sina_Config.SINA_TCP_SERVER_ADDRESS = ", configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS);
        if (scLogin.Address == "39.96.166.45:10001") { //正式服
            configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS = "gate1.qp.games.weibo.com:10001";
        }
        else if (scLogin.Address == "39.96.162.9:10001") { //正式服
            configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS = "gate2.qp.games.weibo.com:10001";
        }
        else if (scLogin.Address == "27.221.32.136:10001") { //测试服
            configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS = "g1.qp.games.weibo.com:10001";
        }
        else if (scLogin.Address == "27.221.32.137:10001") { //测试服
            configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS = "g2.qp.games.weibo.com:10001";
        }
        cc.log("Sina_Config.SINA_TCP_SERVER_ADDRESS new = ", configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS);
        DataManager_1.default.getInstance().setUserData(scLogin);
        DataManager_1.default.getInstance().setMaintenance(scLogin.Maintenance);
        if (scLogin.StatusID == 0) {
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_LOGIN_SUCCESS);
        }
        else {
            this.checkManintence();
        }
    };
    LogicController.prototype.WX_ThreeKingFun_wens3s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.onLoginFailed = function (states) {
        cc.log("onLoginFailed --- ", states);
        this.showCommonTips("网络异常\r\n 请检查网络后重试", function () {
            this.sendHttplogin();
        }.bind(this), "重试", true);
    };
    // -------------------------socket-------------------------
    LogicController.prototype.connectTcp = function () {
        cc.log("connectTcp --- start ", configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS);
        this.unschedule(this.connectTcpOverTime);
        this.scheduleOnce(this.connectTcpOverTime, 5);
        this.m_socket.Connect(configsFile_1.Sina_Config.SINA_TCP_SERVER_ADDRESS);
    };
    //发送进入游戏。
    LogicController.prototype.tcpConnectSuccess = function () {
        cc.log("tcp Connect Success");
        this.unschedule(this.connectTcpOverTime);
        this.stopReconnect();
        this.m_reconnectNum = 0;
        this.hideWaitingTips();
        DataManager_1.default.getInstance().setNetState(true);
        this.sendEnterGame();
    };
    LogicController.prototype.WX_ThreeKingFun_webbs = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.connectTcpOverTime = function (dt) {
        cc.log("connect Tcp Over Time, ", dt);
        this.unschedule(this.connectTcpOverTime);
        this.hideWaitingTips();
        if (cc.director.getScene().getChildByName(this.socketErrorNodeName)) {
            return;
        }
        this.showCommonTips("啊哦，网络开了小差\r\n重试或检查网络", function () {
            this.showWaitingTips();
            this.connectTcp();
        }.bind(this), "重试", true, this.socketErrorNodeName);
    };
    LogicController.prototype.onTcpClose = function () {
        cc.log("on Tcp Close");
        DataManager_1.default.getInstance().setNetState(false);
        this.m_hearBeat.stopHeartBeat();
        //大厅、龙虎斗等自动重连3次，失败则弹框
        //对战小游戏直接弹框提示重连
        //切水果单机小游戏不处理
        var curGameID = DataManager_1.default.getInstance().curGameID;
        if (curGameID <= 1) {
            this.startTcpReconnect();
        }
        else {
            var gameConfig = DataManager_1.default.getInstance().getGameConfig(curGameID);
            if (gameConfig) {
                var enterType = gameConfig["enterType"];
                if (enterType == Constant_1.default.GameEnterType.MATCH) {
                    this.showNetError();
                }
                else if (enterType == Constant_1.default.GameEnterType.DIRECT) {
                    this.m_isDPReConnect = true;
                    this.startTcpReconnect();
                }
                else if (enterType == Constant_1.default.GameEnterType.SINGEL) {
                    // this.startTcpReconnect()
                }
            }
            else {
                this.startTcpReconnect();
            }
        }
    };
    LogicController.prototype.WX_ThreeKingFun_weww3s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //tcp重连
    LogicController.prototype.startTcpReconnect = function () {
        cc.log("start Tcp Reconnect");
        this.stopReconnect();
        this.schedule(this.reconnectTcp, 0.5, this.m_reconnectMax, 0);
    };
    LogicController.prototype.reconnectTcp = function (dt) {
        cc.log("reconnect Tcp");
        this.m_reconnectNum++;
        if (this.m_reconnectNum >= (this.m_reconnectMax - 1)) {
            this.unschedule(this.reconnectTcp);
            this.showNetError();
        }
        else {
            this.connectTcp();
        }
    };
    LogicController.prototype.WX_ThreeKingFun_we4ggg3s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.stopReconnect = function () {
        this.unschedule(this.reconnectTcp);
    };
    LogicController.prototype.showNetError = function () {
        cc.log("show Net Error");
        DataManager_1.default.getInstance().setNetState(false);
        this.m_hearBeat.stopHeartBeat();
        this.hideWaitingTips();
        if (this.isInSmallGame(Constant_1.default.GameEnterType.SINGEL)) {
            return;
        } //单机小游戏不需要弹网络异常
        if (cc.director.getScene().getChildByName(this.socketErrorNodeName)) {
            return;
        }
        this.showCommonTips("啊哦，网络开了小差\r\n重试或检查网络", function () {
            this.retryConnect();
        }.bind(this), "重试", true, this.socketErrorNodeName);
    };
    LogicController.prototype.retryConnect = function () {
        var sceneName = cc.director.getScene().name;
        if (sceneName == "Loading" || sceneName == "Home" || this.isInSmallGame(Constant_1.default.GameEnterType.DIRECT)) {
            this.showWaitingTips();
            this.connectTcp();
        }
        else {
            cc.director.loadScene("Home");
        }
    };
    LogicController.prototype.WX_ThreeKingFun_we4sww3s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.isInSmallGame = function (type) {
        var curGameID = DataManager_1.default.getInstance().curGameID;
        if (curGameID > 1) {
            var gameConfig = DataManager_1.default.getInstance().getGameConfig(curGameID);
            if (gameConfig) {
                var enterType = gameConfig["enterType"];
                return enterType == type;
            }
        }
        return false;
    };
    LogicController.prototype.checkTcpConnect = function () {
        if (!DataManager_1.default.getInstance().getNetState()) {
            this.showNetError();
        }
    };
    // -------------------------enter game-------------------------
    LogicController.prototype.sendEnterGame = function () {
        var value = new Protocol_1.CSEnterGame();
        value.GameID = configsFile_1.Sina_Config.GameAppID;
        value.Key = DataManager_1.default.getInstance().getuserData().HttpCode;
        ScoketManager_1.default.getInstance().send(value.pack(), PacketID_1.PacketID._SINA_PACKET_CS_EnterGameID);
    };
    LogicController.prototype.WX_ThreeKingFun_we4eww3s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.onEnterGame = function (data) {
        cc.log("on Enter Game");
        DataManager_1.default.getInstance().setUserData2(data);
        this.m_hearBeat.startHeartBeat();
        //重连龙凤斗
        if (this.m_isDPReConnect) {
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SEND_DP_NETERROR_RECONNECT);
            this.m_isDPReConnect = false;
            return;
        }
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_ENTER_GAME_SUCCESS);
    };
    // -------------------------game list-------------------------
    LogicController.prototype.sendGetGameList = function () {
        cc.log("send Get Game List");
        var value = new Protocol_1.CSGameList();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_GAMELISTID, this.onGetGameList);
    };
    LogicController.prototype.WX_ThreeKingFun_wenddd43s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.onGetGameList = function (states, data) {
        cc.log("on Get Game List");
        if (data == null || data == undefined) {
            return;
        }
        var value = new Protocol_1.SCGameListRet();
        value.unPack(data);
        cc.log("server game list --- ", value);
        DataManager_1.default.getInstance().setGameLst(value.gameList);
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_GET_GAME_LIST_SUCCESS);
    };
    // -------------------------online-------------------------
    //服务器维护踢人消息
    LogicController.prototype.onServerCutLine = function (data) {
        cc.log("LogicController   onServerCutLine");
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SERVER_CUT_LINE);
    };
    LogicController.prototype.onNoticePayersOnlineRetID = function (data) {
        cc.log("LogicController  onNoticePayersOnlineRetID");
        var value = new Protocol_1.SCNoticePlayersOnline();
    };
    LogicController.prototype.WX_ThreeKingFun_we43bffss = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    // -------------------------common-------------------------
    // 显示维护信息/网络错误
    LogicController.prototype.showNetTips = function (type) {
        cc.loader.loadRes("home/prefab/NetTip", function (err, prefab) {
            if (err) {
                cc.log("home/prefab/NetTip load error:" + err);
                return;
            }
            var itPre = cc.instantiate(prefab);
            var objIt = itPre.getComponent("NetErrorTips");
            if (objIt) {
                objIt.setShowType(type);
            }
            cc.director.getScene().addChild(itPre);
        });
    };
    //commonTips
    LogicController.prototype.showCommonTips = function (tips, callback, btnTips, btnVisible, nodeName) {
        if (callback === void 0) { callback = null; }
        if (btnTips === void 0) { btnTips = ""; }
        if (btnVisible === void 0) { btnVisible = true; }
        if (nodeName === void 0) { nodeName = ""; }
        cc.loader.loadRes("home/prefab/ComTips", function (err, prefab) {
            if (err) {
                cc.log("home/prefab/ComTips load error:" + err);
                return;
            }
            var commonTips = cc.instantiate(prefab);
            var objIt = commonTips.getComponent("ComTips");
            if (objIt) {
                objIt.setShowPar(tips, callback, btnTips, btnVisible);
            }
            cc.director.getScene().addChild(commonTips, 9999, nodeName);
        });
    };
    //等待动画
    LogicController.prototype.showWaitingTips = function () {
        cc.log("show Waiting Tips");
        var node = cc.director.getScene().getChildByName("WAITING_TIPS");
        if (!node) {
            cc.loader.loadRes("home/prefab/Reconnect", function (err, prefab) {
                if (err) {
                    cc.log('载入prefab/Reconnect预制资源失败, 原因:' + err);
                    return;
                }
                var tipsNode = cc.instantiate(prefab);
                if (tipsNode) {
                    cc.director.getScene().addChild(tipsNode, 10000, "WAITING_TIPS");
                }
            });
        }
    };
    LogicController.prototype.WX_ThreeKingFun_weeww43s = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.hideWaitingTips = function () {
        cc.log("hide Waiting Tips");
        var node = cc.director.getScene().getChildByName("WAITING_TIPS");
        if (node) {
            node.removeFromParent();
        }
    };
    //维护处理
    LogicController.prototype.checkManintence = function () {
        var stateId = DataManager_1.default.getInstance().getuserData().StatusID;
        if (stateId != 0) {
            if (stateId == 43) {
                this.showNetTips(1);
            }
            else {
                this.showCommonTips("登陆失败\r\n 请重试或检查网络", null, "确定", false);
            }
            return true;
        }
        return false;
    };
    // -------------------------sign-------------------------
    LogicController.prototype.setHaveDealSign = function (have) {
        this.haveDealSign = have;
    };
    LogicController.prototype.getHaveDealSign = function () {
        return this.haveDealSign;
    };
    LogicController.prototype.WX_ThreeKingFun_ewwwws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //发送签到信息请求
    LogicController.prototype.sendGetSignInfo = function () {
        if (!MKUtils_1.default.isCreditChannel()) {
            return;
        }
        if (this.haveGetSignInfo) {
            return;
        }
        this.haveGetSignInfo = true;
        cc.log("send Get Sign Info");
        var commonConfig = DataManager_1.default.getInstance().getCommonConfig();
        if (commonConfig && commonConfig["OpenSign"] != undefined) {
            cc.log("checksign --- OpenSign:", commonConfig["OpenSign"]);
        }
        if (commonConfig && commonConfig["OpenSign"] != undefined && commonConfig["OpenSign"] > 0) {
            cc.log("get sign info");
            var value = new Protocol_1.CSSignInfo();
            value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
            value.appId = configsFile_1.Sina_Config.GameAppID;
            HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID.BASIC_SIGN_INFO, this.onGetSignListInfo);
        }
        else {
            cc.log("not open sign");
        }
    };
    //签到ACK 
    LogicController.prototype.onGetSignListInfo = function (states, data) {
        if (data == null || data == undefined) {
            return;
        }
        var value = new Protocol_1.SCSignInfo();
        value.unPack(data);
        cc.log("onGetSignListInfo1", value);
        if (value.StatusID == 1) {
            // 已经签过了直接弹转盘
            cc.log("onGetSignListInfo3");
            LogicController_1.getInstance().sendGetWheelInfo();
        }
        DataManager_1.default.getInstance().setSignInfo(value);
        cc.log("onGetSignListInfo2", value);
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_GET_SIGN_LIST_SUCCESS);
    };
    LogicController.prototype.WX_ThreeKingFun_ewwtwws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //当天签到
    LogicController.prototype.sendDailySign = function () {
        if (!MKUtils_1.default.isCreditChannel()) {
            return;
        }
        cc.log("LogicController sendDailySign");
        var value = new Protocol_1.CSDailySign();
        var user = DataManager_1.default.getInstance().getuserData();
        value.Code = user.HttpCode;
        value.appId = configsFile_1.Sina_Config.GameAppID;
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID.BASIC_SIGN_IN, this.onDailySign);
    };
    //当天签到返回
    LogicController.prototype.onDailySign = function (states, data) {
        cc.log("LogicController onDailySign");
        var value = new Protocol_1.SCDailySign();
        if (data == null || data == undefined) {
            return;
        }
        value.unPack(data);
        var signInfo = DataManager_1.default.getInstance().getSignInfo();
        signInfo.hasGet = 1;
        if (value.itemsList.length > 0) {
            //DataManager.getInstance().  
            if (value.itemsList[0].itemId == 1006) {
                var creditNum = DataManager_1.default.getInstance().userData.getUserCreditNum();
                DataManager_1.default.getInstance().userData.setUserCreditNum(creditNum + value.itemsList[0].itemCt);
                Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_REFRESH_COIN);
            }
        }
    };
    LogicController.prototype.WX_ThreeKingFun_ew32wwws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    // -------------------------大转盘-------------------------
    //假数据
    LogicController.prototype.testData = function () {
        var value = new Protocol_1.SCBigWheelInfo();
        value.count = 3;
        var value1 = new Protocol_1.BigWheelVo();
        value1.index = 1;
        value1.type = 1;
        value1.gameId = 0;
        value1.content = 888;
        var value2 = new Protocol_1.BigWheelVo();
        value2.index = 2;
        value2.type = 1;
        value2.gameId = 0;
        value2.content = 10;
        var value3 = new Protocol_1.BigWheelVo();
        value3.index = 3;
        value3.type = 2;
        value3.gameId = 0;
        value3.content = 0;
        var value4 = new Protocol_1.BigWheelVo();
        value4.index = 4;
        value4.type = 1;
        value4.gameId = 0;
        value4.content = 5;
        var value5 = new Protocol_1.BigWheelVo();
        value5.index = 5;
        value5.type = 3;
        value5.gameId = 0;
        value5.content = 0;
        var value6 = new Protocol_1.BigWheelVo();
        value6.index = 6;
        value6.type = 1;
        value6.gameId = 0;
        value6.content = 20;
        var value7 = new Protocol_1.BigWheelVo();
        value7.index = 7;
        value7.type = 2;
        value7.gameId = 0;
        value7.content = 0;
        var value8 = new Protocol_1.BigWheelVo();
        value8.index = 8;
        value8.type = 1;
        value8.gameId = 0;
        value8.content = 5;
        value.list.push(value1);
        value.list.push(value2);
        value.list.push(value3);
        value.list.push(value4);
        value.list.push(value5);
        value.list.push(value6);
        value.list.push(value7);
        value.list.push(value8);
        DataManager_1.default.getInstance().setWheelInfo(value);
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_GET_WHEEL_LIST_SUCCESS);
    };
    //假数据
    LogicController.prototype.testData2 = function () {
        var value = new Protocol_1.SCBigWheelGain();
        value.count = 2;
        value.index = 3;
        value.type = 2;
        value.gameId = 38;
        value.content = 5;
        DataManager_1.default.getInstance().setWheelGainInfo(value);
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_GET_WHEEL_GAIN_LIST_SUCCESS);
        cc.log("xx:CMD_GET_WHEEL_GAIN_LIST_SUCCESS");
    };
    //发送转盘信息请求
    LogicController.prototype.sendGetWheelInfo = function () {
        if (!MKUtils_1.default.isCreditChannel()) {
            return;
        }
        cc.log("send Get Wheel Info");
        var commonConfig = DataManager_1.default.getInstance().getCommonConfig();
        if (commonConfig && commonConfig["OpenWheel"] != undefined) {
            cc.log("checksign --- OpenWheel:", commonConfig["OpenWheel"]);
        }
        if (commonConfig && commonConfig["OpenWheel"] != undefined && commonConfig["OpenWheel"] > 0) {
            cc.log("get wheel info");
            var value = new Protocol_1.CSBigWheelInfo();
            value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
            HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_BIGWHEEL_INFO, this.onWheelListInfo);
        }
        else {
            cc.log("not open wheel");
        }
    };
    LogicController.prototype.WX_ThreeKingFun_ewwwhdsws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //转盘内容信息get
    LogicController.prototype.onWheelListInfo = function (states, data) {
        if (data == null || data == undefined) {
            return;
        }
        var value = new Protocol_1.SCBigWheelInfo();
        value.unPack(data);
        cc.log("212968:" + value.count);
        if (value.count == 0) {
            return;
        }
        DataManager_1.default.getInstance().setWheelInfo(value);
        cc.log("onGetWheelListInfo", value);
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_GET_WHEEL_LIST_SUCCESS);
    };
    //点击抽奖
    LogicController.prototype.sendWheelGain = function () {
        cc.log("212968:sendWheelGain-----------------------------");
        if (!MKUtils_1.default.isCreditChannel()) {
            return;
        }
        cc.log("212968:sendWheelGain1-----------------------------");
        cc.log("send Get Sign Info");
        var value = new Protocol_1.CSBigWheelGain();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        cc.log("212968:HttpCode-----------------------------:" + value.Code);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_BIGWHEEL_GAIN, this.onWheelGain);
    };
    LogicController.prototype.WX_ThreeKingFun_ewwwbbws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //抽奖返回
    LogicController.prototype.onWheelGain = function (states, data) {
        cc.log("onGetWheelGainInfo0");
        if (data == null || data == undefined) {
            return;
        }
        var value = new Protocol_1.SCBigWheelGain();
        cc.log("onGetWheelGainInfo1", value);
        value.unPack(data);
        cc.log("onGetWheelGainInfo2", value);
        DataManager_1.default.getInstance().setWheelGainInfo(value);
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_GET_WHEEL_GAIN_LIST_SUCCESS);
    };
    // -------------------------救济金-------------------------
    LogicController.prototype.checkRescues = function () {
        var commonConfig = DataManager_1.default.getInstance().getCommonConfig();
        if (commonConfig && commonConfig["RescuesMinCredit"] != undefined) {
            cc.log("checkRescues --- minCredit:", commonConfig["RescuesMinCredit"]);
        }
        if (commonConfig && commonConfig["RescuesMinCredit"] != undefined && MKUtils_1.default.isCreditChannel() && DataManager_1.default.getInstance().userData.getUserCreditNum() < commonConfig["RescuesMinCredit"]) {
            var value = new Protocol_1.CSRescuesInfo();
            value.code = DataManager_1.default.getInstance().getuserData().HttpCode;
            value.appId = configsFile_1.Sina_Config.GameAppID;
            cc.log("checkRescues---", value);
            HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_RESCUES_INFO_ID, this.onRescuesInfo.bind(this));
        }
        else {
            cc.log("212968:LogicController.getInstance().sendGetWheelInfo()");
            LogicController_1.getInstance().sendGetWheelInfo();
        }
    };
    LogicController.prototype.WX_ThreeKingFun_ewwwnnws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.onRescuesInfo = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onRescuesInfo---data null");
            return;
        }
        var protocol = new Protocol_1.SCRescuesInfo();
        protocol.unPack(data);
        cc.log("onRescuesInfo---", protocol);
        if (protocol.remainCt > 0 && protocol.giveCount > 0) {
            this.getRescues();
        }
    };
    LogicController.prototype.getRescues = function () {
        var value = new Protocol_1.CSRescuesGoin();
        value.code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.appId = configsFile_1.Sina_Config.GameAppID;
        cc.log("getRescues---", value);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_RESCUES_GOIN_ID, this.onGetRescues.bind(this));
    };
    LogicController.prototype.WX_ThreeKingFun_ewwrewws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    LogicController.prototype.onGetRescues = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("onGetRescues---data null");
            return;
        }
        var protocol = new Protocol_1.SCRescuesGoin();
        protocol.unPack(data);
        cc.log("onGetRescues---", protocol);
        if (protocol.stateId == 0) {
            DataManager_1.default.getInstance().userData.setUserCreditNum(DataManager_1.default.getInstance().userData.getUserCreditNum() + protocol.gainMoney);
            Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_REFRESH_COIN);
            var prefabUrl = "rescues/rescues";
            cc.loader.loadRes(prefabUrl, function (errorMessage, loadedResource) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                var prefab = cc.instantiate(loadedResource);
                prefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
                cc.director.getScene().addChild(prefab, 9);
                var touchSprite = prefab.getChildByName("touchSprite");
                touchSprite.setContentSize(MKUtils_1.default.getShowSize());
                var numLabel = prefab.getChildByName("resuesBg").getChildByName("numLabel").getComponent(cc.Label);
                numLabel.string = "+" + protocol.gainMoney + "积分";
                touchSprite.on(cc.Node.EventType.TOUCH_END, function (e) {
                    cc.log("领取救济金");
                    LogicController_1.getInstance().sendGetWheelInfo(); // 救济金领取后请求转盘
                    prefab.removeFromParent();
                    prefab = null;
                }.bind(this), this);
                MKUtils_1.default.playScaleAni(prefab.getChildByName("resuesBg"));
                var moneySound = prefab.getComponent(cc.AudioSource);
                cc.audioEngine.play(moneySound.clip, false, 1);
            }.bind(this));
        }
    };
    // -------------------------通知-------------------------
    LogicController.prototype.onRotateNotice = function (data) {
        DataManager_1.default.getInstance().broadCast = data;
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SHOW_BROADCAST);
    };
    LogicController.prototype.showBroad = function () {
        if (MKUtils_1.default.isWXGameFun()) {
            return;
        }
        if (DataManager_1.default.getInstance().curGameID == 44) {
        }
        else {
            if (DataManager_1.default.getInstance().getHomeShowBroad()) {
                return;
            }
            MKUtils_1.default.showBroad(cc.v2(360, MKUtils_1.default.getShowSize().height - 30));
        }
    };
    LogicController.prototype.WX_ThreeKingFun_ewewwwws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //最爱游戏同步
    LogicController.prototype.miniLoveGameSyn = function (loveStr) {
        var value = new Protocol_1.CSMiniGameLove();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.Uid = DataManager_1.default.getInstance().getuserData().Account;
        value.LoveStr = loveStr;
        cc.log("miniLoveGameSyn---", value);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_MINI_LOVE_GAME_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("miniLoveGameSyn---data null");
                return;
            }
            var protocol = new Protocol_1.SCMiniGameLove();
            protocol.unPack(data);
            cc.log("miniLoveGameSyn---", protocol);
        }.bind(this), function (states) {
        }.bind(this));
    };
    //积分同步
    LogicController.prototype.creditSyn = function () {
        cc.log("creditSyn start");
        // if (!MKUtils.isCreditChannel()) {
        //     cc.log("not isCreditChannel")
        //     return
        // }
        var value = new Protocol_1.CSCredit();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_CREDIT, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("creditSyn---data null");
                return;
            }
            var protocol = new Protocol_1.SCCredit();
            protocol.unPack(data);
            cc.log("creditSyn success---", protocol);
            if (protocol && protocol.StateId == 0) {
                DataManager_1.default.getInstance().getuserData().setUserCreditNum(protocol.Count);
                Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_REFRESH_COIN);
            }
        }.bind(this), function (states) {
            cc.log("creditSyn failed");
        }.bind(this));
    };
    var LogicController_1;
    LogicController = LogicController_1 = __decorate([
        ccclass
    ], LogicController);
    return LogicController;
}(cc.Component));
exports.default = LogicController;

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
        //# sourceMappingURL=LogicController.js.map
        