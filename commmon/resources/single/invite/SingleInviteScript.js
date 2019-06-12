(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/single/invite/SingleInviteScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a60eb2X2wJN+pp6jmENtXI7', 'SingleInviteScript', __filename);
// resources/single/invite/SingleInviteScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MKUtils_1 = require("../../../Script/common/MKUtils");
var SingleGameLogic_1 = require("../../../Script/logic/GamesLogic/SingleGameLogic");
var DataManager_1 = require("../../../Script/data/DataManager");
var SDKManager_1 = require("../../../Script/logic/SDKManager");
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
var SingleInviteScript = /** @class */ (function (_super) {
    __extends(SingleInviteScript, _super);
    function SingleInviteScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blackBg = null;
        _this.closeBtn = null;
        _this.inviteBtn = null;
        _this.playerScrollView = null;
        _this.taskScrollView = null;
        _this.playerItemPrefab = null;
        _this.taskItemPrefab = null;
        _this.allSound = [];
        return _this;
    }
    SingleInviteScript.prototype.WX_ThreeKingFun_4freg327t8nhh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteScript.prototype.onLoad = function () {
        this.initUI();
        SingleGameLogic_1.default.getInstance().getInviteInfo(function (data) {
            this.refreshView(data);
        }.bind(this));
        MKUtils_1.default.playBlackBgAct(this.blackBg.node);
        MKUtils_1.default.playScaleAni(this.node.getChildByName("baseNode"));
        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(function () {
            SDKManager_1.default.getInstance().createBannerAd(2);
        }, this.node)));
    };
    SingleInviteScript.prototype.WX_ThreeKingFun_ferg99925h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteScript.prototype.onDestroy = function () {
    };
    SingleInviteScript.prototype.start = function () {
    };
    SingleInviteScript.prototype.WX_ThreeKingFun_tgbheht5h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteScript.prototype.initUI = function () {
        this.blackBg.node.setContentSize(MKUtils_1.default.getShowSize());
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        }.bind(this), this);
        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            SDKManager_1.default.getInstance().createBannerAd(0);
            this.node.removeFromParent();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.closeBtn.node);
        this.inviteBtn.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.play(this.allSound[0], false, 1);
            SDKManager_1.default.getInstance().shareAppMessage();
        }.bind(this), this);
        MKUtils_1.default.btnEffect1(this.inviteBtn.node);
    };
    SingleInviteScript.prototype.WX_ThreeKingFun_fethgrejytuyjh = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteScript.prototype.refreshView = function (data) {
        var players = [];
        for (var i = 0; i < 30; i++) {
            var playerInfo = data.PlayerList[i] || null;
            var item = this.createPlayerItem(playerInfo);
            this.playerScrollView.content.addChild(item);
            players.push(item);
        }
        if (players.length > 0) {
            this.playerScrollView.content.setContentSize(players[0].getContentSize().width * 30, this.playerScrollView.content.getContentSize().height);
        }
        var items = [];
        for (var i = 0; i < data.TaskList.length; i++) {
            var item = cc.instantiate(this.taskItemPrefab);
            item.getComponent("SingleInviteTaskItem").setData(data.TaskList[i]);
            this.taskScrollView.content.addChild(item);
            items.push(item);
        }
        if (items.length > 0) {
            this.taskScrollView.content.setContentSize(this.taskScrollView.content.getContentSize().width, items[0].getContentSize().height * data.TaskList.length);
        }
    };
    SingleInviteScript.prototype.WX_ThreeKingFun_teghthy6rwt = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    SingleInviteScript.prototype.createPlayerItem = function (data) {
        var item = cc.instantiate(this.playerItemPrefab);
        if (data) {
            item.getChildByName("levelLabel").active = true;
            if (DataManager_1.default.getInstance().curGameID == 45) {
                item.getChildByName("levelLabel").getComponent(cc.Label).string = "" + data.MaxLevel + "m";
            }
            else {
                item.getChildByName("levelLabel").getComponent(cc.Label).string = "第" + data.MaxLevel + "关";
            }
            var headUrl = data.Photo;
            if (headUrl && headUrl != "") {
                var image_1 = SDKManager_1.default.getInstance().createImage();
                image_1.onload = function () {
                    var texture = new cc.Texture2D();
                    texture.initWithElement(image_1);
                    texture.handleLoadedTexture();
                    var head = new cc.Node();
                    var headSprite = head.addComponent(cc.Sprite);
                    headSprite.spriteFrame = new cc.SpriteFrame(texture);
                    head.setScale(110 / head.getContentSize().width);
                    item.getChildByName("headNode").addChild(head);
                };
                image_1.src = headUrl;
            }
            else {
                item.getChildByName("defaultHead").active = true;
            }
        }
        item.getChildByName("levelLabel").zIndex = 2;
        return item;
    };
    SingleInviteScript.prototype.WX_ThreeKingFun_gtehgrwh485h = function () {
        var aaa = 1451;
        var vrbgv = 258;
        var fff = 3;
        cc.log("aaa + bbb = ");
        return aaa + fff + fff + vrbgv;
    };
    __decorate([
        property(cc.Sprite)
    ], SingleInviteScript.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleInviteScript.prototype, "closeBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], SingleInviteScript.prototype, "inviteBtn", void 0);
    __decorate([
        property(cc.ScrollView)
    ], SingleInviteScript.prototype, "playerScrollView", void 0);
    __decorate([
        property(cc.ScrollView)
    ], SingleInviteScript.prototype, "taskScrollView", void 0);
    __decorate([
        property(cc.Prefab)
    ], SingleInviteScript.prototype, "playerItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], SingleInviteScript.prototype, "taskItemPrefab", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], SingleInviteScript.prototype, "allSound", void 0);
    SingleInviteScript = __decorate([
        ccclass
    ], SingleInviteScript);
    return SingleInviteScript;
}(cc.Component));
exports.default = SingleInviteScript;

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
        //# sourceMappingURL=SingleInviteScript.js.map
        