(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/home/scripte/scence/Logo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8faaflwJDdP24ftn5jmQXAy', 'Logo', __filename);
// home/scripte/scence/Logo.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataManager_1 = require("../../../Script/data/DataManager");
var LogicController_1 = require("../../../Script/logic/LogicController");
var configsFile_1 = require("../../../Script/data/configsFile");
var Event_1 = require("../../../Script/event/Event");
var EvenID_1 = require("../../../Script/event/EvenID");
var GamesCommonLogic_1 = require("../../../Script/logic/GamesCommonLogic");
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var SDKManager_1 = require("../../../Script/logic/SDKManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Logo = /** @class */ (function (_super) {
    __extends(Logo, _super);
    function Logo() {
        var _this = _super.call(this) || this;
        _this.writeBg = null;
        _this.wbLoading = null;
        _this.wxLoading = null;
        return _this;
    }
    Logo.prototype.WX_ThreeKingFun_gethgryyh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    Logo.prototype.onLoad = function () {
        cc.log("Logo onLoad");
        this.writeBg.node.setContentSize(MKUtils_1.default.getShowSize());
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_LOAD_CONFIG_SUCCESS, this.initDataSuccess.bind(this), this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_LOGIN_SUCCESS, this.loginSuccess.bind(this), this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_ENTER_GAME_SUCCESS, this.tcpConnectSuccess.bind(this), this);
        Event_1.default.getInstance().addEventListener(EvenID_1.EventIDS.CMD_GET_GAME_LIST_SUCCESS, this.getGameListSuccess.bind(this), this);
        this.wbLoading.active = !MKUtils_1.default.isWXGameFun();
        this.wxLoading.active = MKUtils_1.default.isWXGameFun();
        if (MKUtils_1.default.isWXGameFun) {
            var loadingLabel_1 = this.wxLoading.getChildByName("loadingLabel");
            var index_1 = 1;
            loadingLabel_1.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                var loadingStr = "";
                for (var i = 0; i < index_1; i++) {
                    loadingStr = loadingStr + ".";
                }
                loadingLabel_1.getComponent(cc.Label).string = "正在加载中" + loadingStr;
                index_1 = index_1 + 1;
                if (index_1 > 3) {
                    index_1 = 1;
                }
            }, loadingLabel_1))));
        }
        if (configsFile_1.Sina_Config.DeveloperMode) {
            var editbox = MKUtils_1.default.findNode_wx_ThreeKing_ByName(this.node, "editbox");
            var enterBtn = MKUtils_1.default.findNode_wx_ThreeKing_ByName(this.node, "enterBtn");
            enterBtn.active = true;
            editbox.active = true;
            enterBtn.on(cc.Node.EventType.TOUCH_END, function (e) {
                cc.sys.localStorage.setItem("loginName", configsFile_1.Sina_Config.SINA_WINACCOUNT);
                LogicController_1.default.getInstance().sendHttplogin();
            }.bind(this), this);
            // 初始名称
            var loginName = cc.sys.localStorage.getItem("loginName");
            if (loginName) {
                editbox.getComponent(cc.EditBox).string = loginName;
                configsFile_1.Sina_Config.SINA_WINACCOUNT = loginName;
            }
            else {
                editbox.getComponent(cc.EditBox).string = configsFile_1.Sina_Config.SINA_WINACCOUNT;
            }
        }
    };
    Logo.prototype.WX_ThreeKingFun_gteght653475h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    Logo.prototype.start = function () {
        cc.log("Logo start");
        cc.loader.loadRes("home/prefab/ComTips");
        cc.loader.loadRes("home/prefab/Reconnect");
        cc.loader.loadRes("public/prefabs/tipsNode");
        DataManager_1.default.getInstance().initData();
    };
    Logo.prototype.WX_ThreeKingFun_fgtregt2ehg748tr5h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    Logo.prototype.onDestroy = function () {
        Event_1.default.getInstance().removeEventListeners(this);
    };
    Logo.prototype.WX_ThreeKingFun_ftehgthrgr5h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    Logo.prototype.editBox2 = function (text, editbox, customEventData) {
        configsFile_1.Sina_Config.SINA_WINACCOUNT = text;
        //cc.log("Logo editBox2");
    };
    //initData login socket getGamelist startGame
    Logo.prototype.initDataSuccess = function () {
        if (MKUtils_1.default.isWXGame()) {
            SDKManager_1.default.getInstance().startListener();
            SDKManager_1.default.getInstance().login();
        }
        else {
            if (configsFile_1.Sina_Config.DeveloperMode) {
            }
            else {
                LogicController_1.default.getInstance().sendHttplogin();
            }
        }
    };
    Logo.prototype.WX_ThreeKingFun_fgetq4e38h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    Logo.prototype.loginSuccess = function () {
        if (MKUtils_1.default.isWXGame()) {
            this.startGame();
        }
        else {
            SDKManager_1.default.getInstance().wbInit();
            LogicController_1.default.getInstance().connectTcp();
        }
    };
    Logo.prototype.tcpConnectSuccess = function () {
        LogicController_1.default.getInstance().sendGetGameList();
    };
    Logo.prototype.WX_ThreeKingFun_gtrehy99925h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    Logo.prototype.getGameListSuccess = function () {
        this.startGame();
    };
    Logo.prototype.startGame = function () {
        if (configsFile_1.Sina_Config.SmallGameId <= 1) {
            cc.loader.loadResDir("home", function (completedCount, totalCount, item) {
            }, function (error, res) {
                cc.director.loadScene("Home");
            });
        }
        else {
            var gameInfo = DataManager_1.default.getInstance().getGameConfig(configsFile_1.Sina_Config.SmallGameId);
            if (gameInfo) {
                DataManager_1.default.getInstance().curGameID = configsFile_1.Sina_Config.SmallGameId;
                SingleGameLogic_1.default.getInstance().inviteBind();
                GamesCommonLogic_1.default.getInstance().enterSmallGame();
            }
            else {
                cc.log("Logo did not find game info, id:", configsFile_1.Sina_Config.SmallGameId);
            }
        }
    };
    Logo.prototype.WX_ThreeKingFun_frfrtgtetg5h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    __decorate([
        property(cc.Sprite)
    ], Logo.prototype, "writeBg", void 0);
    __decorate([
        property(cc.Node)
    ], Logo.prototype, "wbLoading", void 0);
    __decorate([
        property(cc.Node)
    ], Logo.prototype, "wxLoading", void 0);
    Logo = __decorate([
        ccclass
    ], Logo);
    return Logo;
}(cc.Component));
exports.default = Logo;

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
        //# sourceMappingURL=Logo.js.map
        