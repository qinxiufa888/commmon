(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/reward/SingleRewardScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '58765t2tbVJB5XRiycPrw6q', 'SingleRewardScript', __filename);
// resources/single/reward/SingleRewardScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
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
var SingleRewardScript = /** @class */ (function (_super) {
    __extends(SingleRewardScript, _super);
    function SingleRewardScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.light = null;
        _this.numLabel = null;
        _this.sureBtn = null;
        _this.star = [];
        _this.rewardIcon = null;
        _this.allSound = [];
        return _this;
    }
    SingleRewardScript.prototype.onLoad = function () {
        this.initUI();
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
        cc.audioEngine.play(this.allSound[1], false, 1);
    };
    SingleRewardScript.prototype.WX_ThreeKingFun_e214fregt1ac = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleRewardScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.sureBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            this.node.removeFromParent();
            SingleGameLogic_1.default.getInstance().checkActive();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.sureBtn.node);
        this.light.node.runAction(cc.repeatForever(cc.rotateBy(5, 360)));
        for (var i = 0; i < this.star.length; i++) {
            this.star[i].node.runAction(cc.repeatForever(cc.rotateBy(3, 360)));
        }
    };
    SingleRewardScript.prototype.WX_ThreeKingFun_564ygrt = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleRewardScript.prototype.start = function () { };
    SingleRewardScript.prototype.setNum = function (num) {
        this.numLabel.string = "x" + num;
    };
    SingleRewardScript.prototype.WX_ThreeKingFun_e25yt64h = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleRewardScript.prototype.setArms = function (armsId) {
        this.rewardIcon.node.rotation = 0;
        this.rewardIcon.node.active = false;
        this.numLabel.string = "新武器";
        var armsConfig = SingleGameLogic_1.default.getInstance().getArmsJsonConfig(armsId);
        MKUtils_1.default.loadSpriteFrame(armsConfig["img"], function (spriteFrame) {
            this.rewardIcon.node.active = true;
            this.rewardIcon.node.scale = 0.7;
            this.rewardIcon.spriteFrame = spriteFrame;
        }.bind(this));
    };
    SingleRewardScript.prototype.WX_ThreeKingFun_gtrh48647fjr1ac = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SingleRewardScript.prototype.WX_ThreeKingFun_471ferghrtynhh = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    __decorate([
        property(cc.Sprite)
    ], SingleRewardScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleRewardScript.prototype, "light", void 0);
    __decorate([
        property(cc.Label)
    ], SingleRewardScript.prototype, "numLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleRewardScript.prototype, "sureBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleRewardScript.prototype, "star", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleRewardScript.prototype, "rewardIcon", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleRewardScript.prototype, "allSound", void 0);
    SingleRewardScript = __decorate([
        ccclass
    ], SingleRewardScript);
    return SingleRewardScript;
}(cc.Component));
exports.default = SingleRewardScript;

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
        //# sourceMappingURL=SingleRewardScript.js.map
        