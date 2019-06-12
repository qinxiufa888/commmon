(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/data/UserData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '15f74OyLPNIv4q1fCGujE2E', 'UserData', __filename);
// Script/data/UserData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UserData = /** @class */ (function () {
    function UserData() {

    }
    UserData.prototype.setUserCreditNum = function (num) {
        this.credit = num;
    };
    UserData.prototype.getUserCreditNum = function () {
        return this.credit;
    };
    UserData.prototype.WX_ThreeKingFun_qinb44b32 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    return UserData;
}());
exports.UserData = UserData;

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
        //# sourceMappingURL=UserData.js.map
        