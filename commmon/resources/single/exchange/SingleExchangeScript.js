(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/exchange/SingleExchangeScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '88f96OQRYlKtp8bAfyCDG/0', 'SingleExchangeScript', __filename);
// resources/single/exchange/SingleExchangeScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var singleGameProtocol_1 = require("../../../Script/network/gameProtocols/singleGameProtocol");
var DataManager_1 = require("../../../Script/data/DataManager");
var HttpHelper_1 = require("../../../Script/network/HttpHelper");
var PacketID_1 = require("../../../Script/network/PacketID");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var MKUtils_1 = require("../../../Script/common/MKUtils");
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
var SingleExchangeScript = /** @class */ (function (_super) {
    __extends(SingleExchangeScript, _super);
    function SingleExchangeScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.gemLabel = null;
        _this.close = null;
        _this.creditButton = null;
        _this.creditLabel = null;
        _this.curCreditLabel = null;
        _this.adButton = null;
        _this.data = null;
        _this.isExchange = 0; //是否在过程中
        return _this;
    }
    SingleExchangeScript.prototype.onLoad = function () {
        this.node.opacity = 0;
        this.initUI();
        this.getExchangeInfo();
    };
    SingleExchangeScript.prototype.start = function () { };
    SingleExchangeScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.close.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            // cc.audioEngine.play(this.allSound[0], false, 1)
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.close.node);
        this.creditButton.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            // cc.audioEngine.play(this.allSound[0], false, 1)
            if (this.data.Credit >= this.data.PayVredit) {
                this.exchangeGem(2);
            }
            else {
                MKUtils_1.default.errorTips("积分不足");
            }
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.creditButton.node);
        this.adButton.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            // cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic_1.default.getInstance().getReward(function () {
                this.exchangeGem(1);
            }.bind(this), function () {
            }.bind(this));
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.adButton.node);
    };
    SingleExchangeScript.prototype.refreshUI = function () {
        if (this.data) {
            this.gemLabel.string = "x" + this.data.Gem;
            this.creditLabel.string = "" + this.data.PayVredit + "积分";
            this.curCreditLabel.string = "剩余" + this.data.Credit + "积分";
        }
        else {
        }
    };
    SingleExchangeScript.prototype.getExchangeInfo = function () {
        var value = new singleGameProtocol_1.CSSingleExchangeInfo();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        cc.log("getExchangeInfo---", value);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_INFO_ID, this.getExchangeInfoSuccess.bind(this), this.getExchangeInfoFailed.bind(this));
    };
    SingleExchangeScript.prototype.getExchangeInfoSuccess = function (states, data) {
        if (data == null || data == undefined) {
            cc.log("getExchangeInfoSuccess---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleExchangeInfo();
        protocol.unPack(data);
        cc.log("getExchangeInfoSuccess---", protocol);
        this.data = protocol;
        this.refreshUI();
        this.node.opacity = 255;
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
    };
    SingleExchangeScript.prototype.getExchangeInfoFailed = function (states) {
        cc.log("getExchangeInfoFailed---");
    };
    SingleExchangeScript.prototype.exchangeGem = function (exchangeType) {
        if (this.isExchange > 0) {
            return;
        }
        this.isExchange = exchangeType;
        var value = new singleGameProtocol_1.CSSingleExchange();
        value.Code = DataManager_1.default.getInstance().getuserData().HttpCode;
        value.GameId = DataManager_1.default.getInstance().curGameID;
        value.ExchangeType = exchangeType;
        value.Platform = 4;
        cc.log("exchangeGem---", value);
        HttpHelper_1.HttpHelper.sendHttpData(value, PacketID_1.PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_ID, this.exchangeGemSuccess.bind(this), this.exchangeGemFailed.bind(this));
    };
    SingleExchangeScript.prototype.exchangeGemSuccess = function (states, data) {
        if (data == null || data == undefined) {
            this.isExchange = 0;
            cc.log("exchangeGemSuccess---data null");
            return;
        }
        var protocol = new singleGameProtocol_1.SCSingleExchange();
        protocol.unPack(data);
        cc.log("exchangeGemSuccess---", protocol);
        DataManager_1.default.getInstance().setWbAdCount(protocol.WbAdCount);
        this.data.Credit = protocol.Credit;
        DataManager_1.default.getInstance().getuserData().setUserCreditNum(protocol.Credit);
        this.isExchange = 0;
        this.refreshUI();
        SingleGameLogic_1.default.getInstance().addGem(protocol.Gem);
        SingleGameLogic_1.default.getInstance().showReward(protocol.Gem);
    };
    SingleExchangeScript.prototype.exchangeGemFailed = function (states) {
        this.isExchange = 0;
        cc.log("exchangeGemFailed---");
    };
    __decorate([
        property(cc.Sprite)
    ], SingleExchangeScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Label)
    ], SingleExchangeScript.prototype, "gemLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleExchangeScript.prototype, "close", void 0);
    __decorate([
        property(cc.Button)
    ], SingleExchangeScript.prototype, "creditButton", void 0);
    __decorate([
        property(cc.Label)
    ], SingleExchangeScript.prototype, "creditLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SingleExchangeScript.prototype, "curCreditLabel", void 0);
    __decorate([
        property(cc.Button)
    ], SingleExchangeScript.prototype, "adButton", void 0);
    SingleExchangeScript = __decorate([
        ccclass
    ], SingleExchangeScript);
    return SingleExchangeScript;
}(cc.Component));
exports.default = SingleExchangeScript;

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
        //# sourceMappingURL=SingleExchangeScript.js.map
        