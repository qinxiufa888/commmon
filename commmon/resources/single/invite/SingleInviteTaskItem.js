(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/invite/SingleInviteTaskItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '263beQ9welAGJBF7Zh5hFij', 'SingleInviteTaskItem', __filename);
// resources/single/invite/SingleInviteTaskItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var DataManager_1 = require("../../../Script/data/DataManager");
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
var SingleInviteTaskItem = /** @class */ (function (_super) {
    __extends(SingleInviteTaskItem, _super);
    function SingleInviteTaskItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gemNumLabel = null;
        _this.nameLabel = null;
        _this.proLabel = null;
        _this.getButton = null;
        _this.allSound = [];
        _this.taskData = null;
        return _this;
    }
    SingleInviteTaskItem.prototype.WX_ThreeKingFun_4ghryuh5347hh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteTaskItem.prototype.onLoad = function () {
        this.initUI();
    };
    SingleInviteTaskItem.prototype.WX_ThreeKingFun_gtg43574h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteTaskItem.prototype.start = function () { };
    SingleInviteTaskItem.prototype.WX_ThreeKingFun_45rg64tgh48 = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteTaskItem.prototype.initUI = function () {
        this.getButton.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            if (this.getButton.interactable && this.taskData && this.taskData.Flag == 1) {
                this.getButton.interactable = false;
                SingleGameLogic_1.default.getInstance().getInviteReward(this.taskData.TypeId, function (data) {
                    this.getButton.interactable = false;
                }.bind(this), function () {
                    this.getButton.interactable = true;
                });
            }
            else {
                MKUtils_1.default.errorTips("没有新的奖励，暂不可领取");
            }
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.getButton.node);
    };
    SingleInviteTaskItem.prototype.WX_ThreeKingFun_eg46743867hh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteTaskItem.prototype.setData = function (data) {
        this.taskData = data;
        this.gemNumLabel.string = "x" + data.Count;
        this.nameLabel.string = this.getTaskInfo(data.TypeId);
        this.proLabel.string = "" + data.NowCount + "/" + data.Max;
        this.getButton.interactable = data.Flag == 1;
    };
    SingleInviteTaskItem.prototype.WX_ThreeKingFun_56434fr3gteh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteTaskItem.prototype.getTaskInfo = function (typeId) {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var gameJson = DataManager_1.default.getInstance().getGameJsonById(gameId);
        if (gameJson && gameJson["inviteTaskConfig"]) {
            return gameJson["inviteTaskConfig"][typeId] || "";
        }
        else {
            return "";
        }
    };
    SingleInviteTaskItem.prototype.WX_ThreeKingFun_frg4t838g7te = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    __decorate([
        property(cc.Label)
    ], SingleInviteTaskItem.prototype, "gemNumLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SingleInviteTaskItem.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SingleInviteTaskItem.prototype, "proLabel", void 0);
    __decorate([
        property(cc.Button)
    ], SingleInviteTaskItem.prototype, "getButton", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleInviteTaskItem.prototype, "allSound", void 0);
    SingleInviteTaskItem = __decorate([
        ccclass
    ], SingleInviteTaskItem);
    return SingleInviteTaskItem;
}(cc.Component));
exports.default = SingleInviteTaskItem;

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
        //# sourceMappingURL=SingleInviteTaskItem.js.map
        