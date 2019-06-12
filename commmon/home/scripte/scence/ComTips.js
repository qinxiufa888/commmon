(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/home/scripte/scence/ComTips.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '180cfe9RzZOHp0JbFAY11dM', 'ComTips', __filename);
// home/scripte/scence/ComTips.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKSound_1 = require("../../../Script/common/MKSound");
var MKUtils_1 = require("../../../Script/common/MKUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ComTips = /** @class */ (function (_super) {
    __extends(ComTips, _super);
    function ComTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labTips = null;
        _this.labBtnTips = null;
        _this.btnAudio = null;
        _this.bg = null;
        _this.btnOK = null;
        //确定按钮回调事件
        _this.callBackFunc = null;
        _this.strTips = "";
        _this.strBtnTips = "";
        _this.btnVisible = true;
        return _this;
    }
    ComTips.prototype.WX_ThreeKingFun_ffgregt925h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    ComTips.prototype.setShowPar = function (tips, callBackFunc, strBtnTips, btnVisible) {
        if (callBackFunc === void 0) { callBackFunc = null; }
        if (strBtnTips === void 0) { strBtnTips = ""; }
        if (btnVisible === void 0) { btnVisible = true; }
        this.strTips = tips;
        this.strBtnTips = strBtnTips;
        this.callBackFunc = callBackFunc;
        this.btnVisible = btnVisible;
    };
    ComTips.prototype.WX_ThreeKingFun_fgtegt5h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    ComTips.prototype.start = function () {
        this.bg.node.scaleX = MKUtils_1.default.getShowScale().x;
        this.bg.node.scaleY = MKUtils_1.default.getShowScale().y;
    };
    ComTips.prototype.WX_ThreeKingFun_ferg9fregt9925h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    ComTips.prototype.WX_ThreeKingFun_fegtewgt25h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    ComTips.prototype.onLoad = function () {
        this.labTips.string = this.strTips;
        if (this.strBtnTips.length > 0) {
            this.labBtnTips.string = this.strBtnTips;
        }
        this.btnOK.node.active = this.btnVisible;
    };
    ComTips.prototype.WX_ThreeKingFun_gtegt5h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    ComTips.prototype.onBtnOK = function () {
        MKSound_1.default.play_wx_ThreeKing_SFX(this.btnAudio);
        if (this.callBackFunc != null) {
            this.callBackFunc();
        }
        this.node.destroy();
    };
    ComTips.prototype.WX_ThreeKingFun_fregfgetghtgth = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    __decorate([
        property(cc.Label)
    ], ComTips.prototype, "labTips", void 0);
    __decorate([
        property(cc.Label)
    ], ComTips.prototype, "labBtnTips", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], ComTips.prototype, "btnAudio", void 0);
    __decorate([
        property(cc.Sprite)
    ], ComTips.prototype, "bg", void 0);
    __decorate([
        property(cc.Button)
    ], ComTips.prototype, "btnOK", void 0);
    ComTips = __decorate([
        ccclass
    ], ComTips);
    return ComTips;
}(cc.Component));
exports.default = ComTips;

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
        //# sourceMappingURL=ComTips.js.map
        