(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/logic/WBManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9fd07yCRrlMl7iFGnANv4Vy', 'WBManager', __filename);
// Script/logic/WBManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
// import * as video from "../../resources/wbGame/ad/video"
var DataManager_1 = require("../data/DataManager");
var configsFile_1 = require("../data/configsFile");
var Constant_1 = require("../common/Constant");
var WBManager = /** @class */ (function () {
    function WBManager() {
        this.videoAd = null;
        this.firstPlay = true;
        this.uid = "";
        this.mid = "1";
        this.android = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    }
    WBManager.prototype.init = function () {
        this.uid = DataManager_1.default.getInstance().getuserData().Account;
        this.mid = "1";
        if (configsFile_1.Sina_Config.GameType == Constant_1.default.GameType.WB_WALLET) {
            this.mid = "1";
        }
        else if (configsFile_1.Sina_Config.GameType == Constant_1.default.GameType.WB_TASK) {
            this.mid = "2";
        }
        cc.log("WB Ad init, mid:", this.mid, ", uid:", this.uid);
        // this.videoAd = video.createRewardeVideo({uid:this.uid, mid:this.mid})
    };
    WBManager.prototype.playVideoAd = function (successCallback, failCallback) {
        // cc.audioEngine.pauseAll()
        // if (!this.videoAd) {
        //     this.videoAd = video.createRewardeVideo({uid:this.uid, mid:this.mid})
        // }
        // this.videoAd.load().then(function(){
        //     this.videoAd.show()
        //     if (this.firstPlay) {
        //         this.videoAd.video.play()
        //         this.firstPlay = false
        //     }
        //     this.videoAd.onClose((status) => {
        //         cc.log("wb video ad onClose --- status ", status)
        //         cc.audioEngine.resumeAll()
        //         if (status && status.isEnded) {
        //             if (successCallback) {
        //                 successCallback()
        //             }
        //         } else {
        //             MKUtils.errorTips("视频广告观看失败")
        //             if (failCallback) {
        //                 failCallback()
        //             }
        //         }
        //     })
        // }.bind(this)).catch(
        //     err => console.log(err.message)
        // )
    };
    WBManager.getInstance = function () {
        if (!this.wbManager) {
            this.wbManager = new WBManager();
        }
        return this.wbManager;
    };
    WBManager.wbManager = null;
    return WBManager;
}());
exports.default = WBManager;

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
        //# sourceMappingURL=WBManager.js.map
        