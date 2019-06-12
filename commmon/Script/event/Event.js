(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/event/Event.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b5f98KkKnJMgY40pIIsv40y', 'Event', __filename);
// Script/event/Event.ts

/**
 * Author: Ma yuan
 * Date: 2018.10.24
 * CopyRight:
 * 事件通知机制
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispath = /** @class */ (function () {
    function EventDispath() {
        this.NotificationCenter = new cc.EventTarget();
    }
    EventDispath.prototype.addEventListener = function (type, callback, target) {
        this.NotificationCenter.on(type, callback, target);
    };
    EventDispath.prototype.send = function (eventID, arg1) {
        this.NotificationCenter.emit(eventID, arg1);
    };
    EventDispath.prototype.removeEventListenersByEvent = function (type, callback, target) {
        this.NotificationCenter.off(type, callback, target);
    };
    EventDispath.prototype.removeEventListeners = function (target) {
        this.NotificationCenter.targetOff(target);
    };
    EventDispath.getInstance = function () {
        if (!this.singleton) {
            this.singleton = new EventDispath();
        }
        return this.singleton;
    };
    return EventDispath;
}());
exports.default = EventDispath;

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
        //# sourceMappingURL=Event.js.map
        