(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/home/scripte/scence/NetErrorTips.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '35a5bSdPZlG2JbMBgD0Bd4C', 'NetErrorTips', __filename);
// home/scripte/scence/NetErrorTips.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataManager_1 = require("../../../Script/data/DataManager");
var MKSound_1 = require("../../../Script/common/MKSound");
var MKUtils_1 = require("../../../Script/common/MKUtils");
var configsFile_1 = require("../../../Script/data/configsFile");
// Learn TypeScript:
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NetErrorTips = /** @class */ (function (_super) {
    __extends(NetErrorTips, _super);
    function NetErrorTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lableHome = null;
        _this.lableGames = null;
        _this.netWeihu = null;
        _this.netError = null;
        _this.netHomeSubGameServerTips = null;
        _this.btnHome = null;
        _this.btnAudio = null;
        _this.netWeihuback = null;
        _this.showType = 2; //显示类型
        return _this;
    }
    NetErrorTips.prototype.WX_ThreeKingFun_gfetgyt6723482h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    NetErrorTips.prototype.onLoad = function () {
        this.btnHome.node.on(cc.Node.EventType.TOUCH_END, this.onBtnHome, this);
        this.netWeihuback.node.scaleX = MKUtils_1.default.getShowScale().x;
        this.netWeihuback.node.scaleY = MKUtils_1.default.getShowScale().y;
    };
    NetErrorTips.prototype.WX_ThreeKingFun_frgt4838h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    NetErrorTips.prototype.start = function () {
        this.initNetLayers();
        if (this.showType == 1) { //大厅 维护公告
            this.netWeihu.active = true;
            this.lableHome.node.active = true;
            var maintenance = DataManager_1.default.getInstance().getMaintenance();
            if (maintenance.length > 0) {
                this.lableHome.string = maintenance;
            }
        }
        else if (this.showType == 2) { //单个游戏维护公告
            if (configsFile_1.Sina_Config.SmallGameId <= 1) { //在大厅点击
                this.netHomeSubGameServerTips.active = true;
                this.schedule(this.hideSelf, 0, 0, 2);
            }
            else {
                this.netWeihu.active = true;
                this.lableGames.node.active = true;
            }
        }
        else if (this.showType == 3) { //网络错误
            this.netError.active = true;
        }
    };
    NetErrorTips.prototype.WX_ThreeKingFun_g4qw4348eg25h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    NetErrorTips.prototype.hideSelf = function () {
        this.node.destroy();
    };
    NetErrorTips.prototype.initNetLayers = function () {
        this.netError.active = false;
        this.netWeihu.active = false;
        this.netHomeSubGameServerTips.active = false;
        this.lableGames.node.active = false;
        this.lableHome.node.active = false;
    };
    NetErrorTips.prototype.WX_ThreeKingFun_feqg4t6837925h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    NetErrorTips.prototype.setShowType = function (type) {
        this.showType = type;
    };
    NetErrorTips.prototype.WX_ThreeKingFun_ferg99f46eg384t925h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    NetErrorTips.prototype.onBtnHome = function () {
        MKSound_1.default.play_wx_ThreeKing_SFX(this.btnAudio);
        cc.log("onBtnHome");
        var sence = cc.director.getScene();
        if (sence.name != "Home") {
            cc.director.loadScene("Home");
        }
        this.node.destroy();
    };
    NetErrorTips.prototype.WX_ThreeKingFun_gtehgt4357h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    __decorate([
        property(cc.Label)
    ], NetErrorTips.prototype, "lableHome", void 0);
    __decorate([
        property(cc.Label)
    ], NetErrorTips.prototype, "lableGames", void 0);
    __decorate([
        property(cc.Node)
    ], NetErrorTips.prototype, "netWeihu", void 0);
    __decorate([
        property(cc.Node)
    ], NetErrorTips.prototype, "netError", void 0);
    __decorate([
        property(cc.Node)
    ], NetErrorTips.prototype, "netHomeSubGameServerTips", void 0);
    __decorate([
        property(cc.Button)
    ], NetErrorTips.prototype, "btnHome", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NetErrorTips.prototype, "btnAudio", void 0);
    __decorate([
        property(cc.Sprite)
    ], NetErrorTips.prototype, "netWeihuback", void 0);
    NetErrorTips = __decorate([
        ccclass
    ], NetErrorTips);
    return NetErrorTips;
}(cc.Component));
exports.default = NetErrorTips;

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
        //# sourceMappingURL=NetErrorTips.js.map
        