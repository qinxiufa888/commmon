(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/logic/GamesCommonLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5e380hoRTdLAZ/o8CTvdJEy', 'GamesCommonLogic', __filename);

Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../Event/Event");
var configsFile_1 = require("../data/configsFile");
var DataManager_1 = require("../data/DataManager");
var EvenID_1 = require("../event/EvenID");

var PacketID_1 = require("../network/PacketID");
var Constant_1 = require("../common/Constant");
var SingleGameLogic_1 = require("./GamesLogic/SingleGameLogic");
var Protocol_1 = require("../network/Protocol");
var ScoketManager_1 = require("./ScoketManager");
var MKUtils_1 = require("../common/MKUtils");
var HttpHelper_1 = require("../network/HttpHelper");
var SDKManager_1 = require("./SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamesCommonLogic = /** @class */ (function (_super) {
    __extends(GamesCommonLogic, _super);
    function GamesCommonLogic() {
        var _this = _super.call(this) || this;
        _this.curIsInStartGameScene = false; //true代表在匹配界面或者在加载中
        _this.haveGetMakeTeamData = false;
        _this.curIsAdEnterGame = false; //是否广告免费进入游戏
        _this.onlyOne = null;
        Event_1.default.getInstance().addEventListener((PacketID_1.PacketID._SINA_PACKET_SC_CREDIT).toString(), _this.onGetUserCreditCountAck, _this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SHOW_OTHER_EXIT, _this.upDataExitStatus, _this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_SHOW_OTHER_TO_SELF, _this.upDataOtherToSelfStatus, _this);
        return _this;
    }
    GamesCommonLogic_1 = GamesCommonLogic;
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbffbfg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    GamesCommonLogic.prototype.enterSmallGame = function () {
        var curGameID = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(curGameID);
        if (!config) {
            cc.log("Error! not found config, gameid:", curGameID);
            return;
        }
        DataManager_1.default.getInstance().curGameType = config["gameType"];
        if (config["jsonData"] && config["jsonData"] != "") {
            DataManager_1.default.getInstance().loadGameJson(config["jsonData"], this.loadJsonSuccess.bind(this));
        }
        else {
            this.loadJsonSuccess();
        }
    };
    GamesCommonLogic.prototype.loadJsonSuccess = function () {
        cc.log("loadJsonSuccess---enter game");
        SingleGameLogic_1.default.getInstance().refreshRewardType();
        var curGameID = DataManager_1.default.getInstance().curGameID;
        var config = DataManager_1.default.getInstance().getGameConfig(curGameID);
        var enterType = config["enterType"];
        if (enterType == Constant_1.default.GameEnterType.MATCH) {
            if (!DataManager_1.default.getInstance().isWheelEnterState() && MKUtils_1.default.isCreditChannel()) {
                cc.director.loadScene("integralScene");
            }
            else {
                this.sendFindPlayer(curGameID);
            }
        }
        else if (enterType == Constant_1.default.GameEnterType.DIRECT) {
            cc.director.loadScene(config["gameType"]);
            DataManager_1.default.getInstance().addGameCount(curGameID);
        }
        else if (enterType == Constant_1.default.GameEnterType.SINGEL) {
            SingleGameLogic_1.default.getInstance().sendStart(curGameID);
            DataManager_1.default.getInstance().addGameCount(curGameID);
        }
    };
    GamesCommonLogic.prototype.enterGameWBAdvert = function (successCallback, failCallback) {
        var value = new Protocol_1.CSEnterGameAdvert();
        value.code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.Platform = 4;
        cc.log("enterGameWBAdvert---", value);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_ENTER_GAME_ADVERT_ID, function (states, data) {
            if (data == null || data == undefined) {
                cc.log("enterGameWBAdvert---data null");
                if (failCallback) {
                    failCallback();
                }
                return;
            }
            var protocol = new Protocol_1.SCEnterGameAdvert();
            protocol.unPack(data);
            cc.log("enterGameWBAdvertSuccess---", protocol);
            if (protocol.StateId == 0) {
                DataManager_1.default.getInstance().setWbAdCount(protocol.WbAdCount);
                if (successCallback) {
                    successCallback();
                }
            }
            else {
                if (failCallback) {
                    failCallback();
                }
            }
        }.bind(this), function () {
            cc.log("enterGameWBAdvertFailed---");
            if (failCallback) {
                failCallback();
            }
        }.bind(this));
    };
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbbb = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    GamesCommonLogic.prototype.sendFindPlayer = function (gameId) {
        cc.log("send Find Player");
        var SmallGameFindPlayerPacketIds = {
        // 11:PacketID._SINA_PACKET_CS_BrickEnterGameID,
        // 12:PacketID._SINA_PACKET_CS_SquEnterGameID,
        // 13:PacketID._SINA_PACKET_CS_MineEnterGameID,
        // 14:PacketID._SINA_PACKET_CS_GameLink_FindPlayerID,
        // 15:PacketID._SINA_PACKET_CS_JungleEnterGameID,
        // 16:PacketID._SINA_PACKET_CS_Game2048_Find_PlayerID,
        // 17:PacketID._SINA_PACKET_CS_GameSaveChef_FindPlayerID,
        // 18:PacketID._SINA_PACKET_CS_SixFindPlayerID,
        // 19:PacketID._SINA_PACKET_CS_GameSushi_FindPlayerID,
        // 33:PacketID._SINA_PACKET_CS_CircleFindPlayerID,
        // 34:PacketID._SINA_PACKET_CS_TURN_FINDPLAYERID,
        // // 35:tnt,
        // 36:PacketID._SINA_PACKET_CS_HuntFindPlayerID,
        // 37:PacketID._SINA_PACKET_CS_GameTetris_FindPlayerID,
        // 38:PacketID._SINA_PACKET_CS_GameLink_FindPlayerID,
        // // 39:DPScene,
        // // 40:CityCarScene,
        // 41:PacketID._SINA_PACKET_CS_FORWARD_FIND_PLAYER,
        // 42:fruit,
        // 43:hitPeas,
        };
        var findPlayer = new Protocol_1.CSFindPlayer();
        var msgID = SmallGameFindPlayerPacketIds[gameId];
        if (!msgID) {
            cc.log("did not found game PacketId, ", gameId);
        }
        cc.log("LogicController sendFindPlayer gameType is", gameId + "  MsgID is", msgID);
        this.scheduleOnce(this.findPlayerTimeOut, 5);
        ScoketManager_1.default.getInstance().send(findPlayer.pack(), msgID);
        DataManager_1.default.getInstance().addGameCount(gameId);
    };
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbffbd = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    GamesCommonLogic.prototype.findPlayerTimeOut = function () {
        DataManager_1.default.getInstance().isLoading = false;
    };
    GamesCommonLogic.prototype.upDataOtherToSelfStatus = function () {
        DataManager_1.default.getInstance().setSeveceID(EvenID_1.EventIDS.CMD_SHOW_OTHER_TO_SELF);
    };
    GamesCommonLogic.prototype.upDataExitStatus = function () {
        DataManager_1.default.getInstance().setSeveceID(EvenID_1.EventIDS.CMD_SHOW_OTHER_EXIT);
    };
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbffmff2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    GamesCommonLogic.prototype.setGameServerState = function (data, _thisGame) {
        DataManager_1.default.getInstance().setSeveceID("");
        //server 正常
        this.onlyOne = _thisGame;
        cc.log("setGameServerState---data = ", data);
        if (data == 0) {
            //do 显示雷达界面
            this.curIsInStartGameScene = true;
            cc.director.loadScene("StartGameScene");
        }
        else {
            cc.loader.loadRes("home/prefab/NetTip", function (err, prefab) {
                var comTips = cc.instantiate(prefab);
                var objIt = comTips.getComponent("NetErrorTips");
                if (objIt) {
                    objIt.setShowType(2);
                }
                cc.director.getScene().addChild(comTips);
                DataManager_1.default.getInstance().setIsLoading(false);
            });
        }
    };
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbdssg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    GamesCommonLogic.prototype.getHeader = function () {
        if (!this.onlyOne) {
            return;
        }
        var arrayMethod = [];
        var fun1 = this.onlyOne.onSendContinueGame;
        var fun2 = this.onlyOne.onSendFindPlayer;
        var fun3 = this.onlyOne.onSendExit;
        var fun4 = this.onlyOne.onSendPeace;
        var fun5 = this.onlyOne.onSendLoss;
        arrayMethod.push(fun1, fun2, fun3, fun4, fun5);
        return arrayMethod;
    };
    GamesCommonLogic.prototype.setGameData = function (value) {
        DataManager_1.default.getInstance().setSeveceID("");
        var userData = DataManager_1.default.getInstance().getPlayerData();
        userData.playerName = DataManager_1.default.getInstance().userData.Name;
        userData.playerHeadPath = DataManager_1.default.getInstance().userData.HeadImgPath;
        userData.playerAge = value.SelfAge;
        userData.playerCity = value.SelfCity;
        userData.playerSex = value.SelfSex;
        userData.otherName = value.OtherPlayerName;
        userData.otherHead = configsFile_1.Sina_Config.HEAD_URL + value.OtherPlayerHead;
        userData.otherAge = value.OtherAge;
        userData.otherCity = value.OtherCity;
        userData.otherSex = value.OtherPlayerSex;
        if (!DataManager_1.default.getInstance().getWheelEnterState() && MKUtils_1.default.isCreditChannel() && !GamesCommonLogic_1.getInstance().curIsAdEnterGame) {
            //组队成功 客户端 扣积分
            this.userCreditNum();
        }
        GamesCommonLogic_1.getInstance().curIsAdEnterGame = false;
        cc.log("value setGameData =", value);
        var gameType = DataManager_1.default.getInstance().curGameType;
        if (this.curIsInStartGameScene) {
            var secne = cc.director.getScene();
            if (secne.name == "StartGameScene") {
                Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_SHOW_VS_LAYER);
            }
            else {
                this.haveGetMakeTeamData = true;
            }
        }
        else {
            cc.director.loadScene(gameType, this.LoadCallback);
        }
    };
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbndsg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    GamesCommonLogic.prototype.LoadCallback = function () {
        DataManager_1.default.getInstance().setIsLoading(false);
    };
    //客户端更新 积分信息
    GamesCommonLogic.prototype.userCreditNum = function () {
        var gameInfo = DataManager_1.default.getInstance().getGameItemInfo(DataManager_1.default.getInstance().curGameID);
        cc.log("gameInfo is ", gameInfo);
        if (gameInfo) {
            var creditNum = DataManager_1.default.getInstance().userData.getUserCreditNum();
            cc.log("进入游戏带入的积分数量 = ", creditNum);
            DataManager_1.default.getInstance().userData.setUserCreditNum(creditNum - gameInfo.decCredit);
            cc.log("进入游戏消耗报名费之后积分数量 = ", DataManager_1.default.getInstance().userData.getUserCreditNum());
        }
    };
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbffbss2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    GamesCommonLogic.prototype.onGetUserCreditCountAck = function (data) {
        cc.log("onGetUserCreditCountAck ");
        var temp = {};
        // temp.count = data.count; //积分数量
        // temp.channelFlag = data.channelFlag;// 渠道标志
        // temp.state = data.state; //state 0:积分充足  144：积分不足
        var plData = DataManager_1.default.getInstance().playerData;
        plData.creditState = data.state;
        cc.log("onGetUserCreditCountAck data = ", data);
    };
    GamesCommonLogic.prototype.WX_ThreeKingFun_wbffswg2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //创建玩家头像，parent：头像父节点，diameter：头像直径，headUrl：头像url
    GamesCommonLogic.prototype.createHead = function (parent, diameter, headUrl) {
        // cc.log("createHead---diameter:", diameter, ", headUrl:", headUrl)
        if (!parent || parent == null) {
            cc.log("head parent is null error");
            return;
        }
        var oldHead = parent.getChildByName("sinaCommonHeadNode");
        if (oldHead) {
            oldHead.removeFromParent();
            oldHead = null;
        }
        var fullUrl = headUrl;
        if (fullUrl.indexOf("http") < 0) {
            fullUrl = configsFile_1.Sina_Config.HEAD_URL + headUrl;
        }
        fullUrl = SDKManager_1.default.getInstance().isWxHeaUrl(fullUrl);
        // cc.log("fullUrl:", fullUrl)
        var prefabUrl = "head/Head";
        cc.loader.loadRes(prefabUrl, function (error, headPrefab) {
            if (error) {
                cc.log('载入head预制资源失败, 原因:' + error);
                return;
            }
            var headNode = cc.instantiate(headPrefab);
            headNode.name = "sinaCommonHeadNode";
            parent.addChild(headNode, 1);
            headNode.setPosition(0, 0);
            headNode.setScale(diameter / headNode.getContentSize().width);
            if (headUrl && headUrl != "" && headUrl != " ") {
                var headIcon_1 = headNode.getChildByName("headIcon");
                headIcon_1.active = false;
                var headIconBg_1 = headNode.getChildByName("headIconbg"); //解决微薄透明图问题
                headIconBg_1.active = false;
                cc.loader.load(fullUrl, function (err, tex) {
                    headIcon_1.active = true;
                    headIconBg_1.active = true;
                    if (err) {
                        cc.log("load head img error, ", err);
                        return;
                    }
                    if (!(tex instanceof cc.Texture2D)) {
                        cc.log("load head img type error!");
                        return;
                    }
                    headIcon_1.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                    headIcon_1.setScale(headNode.getContentSize().width / headIcon_1.getComponent(cc.Sprite).spriteFrame.getOriginalSize().width);
                });
            }
        });
    };
    GamesCommonLogic.getInstance = function () {
        if (!this.singleton) {
            this.singleton = new GamesCommonLogic_1();
        }
        return this.singleton;
    };
    var GamesCommonLogic_1;
    GamesCommonLogic = GamesCommonLogic_1 = __decorate([
        ccclass
    ], GamesCommonLogic);
    return GamesCommonLogic;
}(cc.Component));
exports.default = GamesCommonLogic;

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
        //# sourceMappingURL=GamesCommonLogic.js.map
        