(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/logic/BDManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '36b249fiMVHLbA9VvWr5zoA', 'BDManager', __filename);
// Script/logic/BDManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var configsFile_1 = require("../data/configsFile");
var Constant_1 = require("../common/Constant");
var MKUtils_1 = require("../common/MKUtils");
var LogicController_1 = require("./LogicController");
var DataManager_1 = require("../data/DataManager");
var SingleGameLogic_1 = require("./GamesLogic/SingleGameLogic");
var BaseSdk_1 = require("../common/BaseSdk");
var BDManager = /** @class */ (function (_super) {
    __extends(BDManager, _super);
    function BDManager() {
        var _this = _super.call(this) || this;
        _this.listenseIsOpen = false;
        _this.hideTime = 0; //游戏切后台时间
        _this.isShare = false; //当前是否在转发过程中
        _this.shareSuccessCallback = null; //转发成功回调
        _this.shareFailCallback = null; //转发失败回调
        _this.loginCode = "";
        _this.loginParams = {};
        _this.avatarUrl = "";
        _this.nickName = "";
        //广告
        _this.bannerAd = [];
        _this.bannerAdHeightScale = 0.18;
        _this.rewardVideoAd = null;
        _this.videoAdSuccessCallback = null; //转发成功回调
        _this.videoAdFailCallback = null; //转发失败回调
        _this.bannerAdIdConfig = {

        };
        _this.rewardVideoAdIdConfig = {

        };
        _this.shareConfig = {

        };
        _this.loginConfig = {

        };
        _this.miniProgressIdConfig = [
            "wxb1f253874a3a8e8c" //猜成语之王
        ];
        var showSize = MKUtils_1.default.getShowSize();
        if ((showSize.height / showSize.width) <= (1290 / 720)) {
            _this.bannerAdHeightScale = 0.16;
        }
        console.log("wx bannerAdHeightScale:", _this.bannerAdHeightScale);
        return _this;
    }
    //注册监听事件
    BDManager.prototype.startListener = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx startListener");
        if (!this.listenseIsOpen) {
            this.listenseIsOpen = true;
            swan.onShow(function (res) {
                console.log("swan.onShow, time:", MKUtils_1.default.getCurOsMillisecond(), ", res:", res);
                // MKUtils.errorTips("onshow --- " + MKUtils.getCurOsMillisecond())
                BDManager.getInstance().checkShareResult();
            }.bind(this));
            swan.onHide(function () {
                // MKUtils.errorTips("onhide --- " + MKUtils.getCurOsMillisecond())
                console.log("swan.onHide, time:", MKUtils_1.default.getCurOsMillisecond());
                BDManager.getInstance().hideTime = MKUtils_1.default.getCurOsMillisecond();
            }.bind(this));
        }
    };
    BDManager.prototype.WX_ThreeKingFun_sjee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.getLoginConfig = function () {
        return this.loginConfig;
    };
    BDManager.prototype.getWXGameItemName = function (id) {
        if (Constant_1.default.WXGameItemName[id]) {
            return Constant_1.default.WXGameItemName[id];
        }
        return null;
    };
    //登录
    BDManager.prototype.login = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx login start");
        swan.login({
            success: function (res) {
                cc.log("wx login success, res:", res);
                if (res.code) {
                    BDManager.getInstance().showShareMenu();
                    BDManager.getInstance().loginCode = res.code;
                    BDManager.getInstance().checkUserInfo();
                }
                else {
                    cc.log("wx login failed, errMsg:" + res.errMsg);
                }
            }
        });
    };
    BDManager.prototype.WX_ThreeKingFun_sjtttee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //登录成功后从服务器获取uid等数据
    BDManager.prototype.getLoginData = function () {
        var xhr = cc.loader.getXMLHttpRequest();
        var url = configsFile_1.Sina_Config.WX_XYX_LOGIN_URL + "?code=" + BDManager.getInstance().loginCode + "&gamdid=" + configsFile_1.Sina_Config.SmallGameId;
        xhr.open("POST", url);
        xhr.onreadystatechange = function () {
            cc.log("getLoginData xhr.readyState=" + xhr.readyState + "xhr.status=" + xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    cc.log("getLoginData success response:", xhr.response);
                    this.loginParams = JSON.parse(xhr.response);
                    LogicController_1.default.getInstance().sendHttplogin();
                    BDManager.getInstance().initRewardVideoAd();
                }
            }
        }.bind(this);
        xhr.send();
    };
    BDManager.prototype.getLoginParams = function () {
        return this.loginParams;
    };
    BDManager.prototype.WX_ThreeKingFun_steejee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //启动参数
    BDManager.prototype.getLaunchOptionsSync = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx getLaunchOptionsSync");
        var res = swan.getLaunchOptionsSync();
        console.log("wx getLaunchOptionsSync res:", res);
        // let str = "---"
        // if (res.query["gameId"]) {
        //     str = str + "gameId:" + res.query["gameId"] + ", "
        // }
        // if (res.query["pid"]) {
        //     str = str + "pid:" + res.query["pid"] + ", "
        // }
        // if (res.shareTicket && res.shareTicket != "undefined") {
        //     str = str + "shareTicket:" + res.shareTicket + ", "
        // }
        return res;
    };
    BDManager.prototype.getInvitePid = function () {
        cc.log("wx getInvitePid");
        if (!MKUtils_1.default.isWXGame()) {
            return 0;
        }
        var res = swan.getLaunchOptionsSync();
        if (res.query["pid"]) {
            return res.query["pid"];
        }
        return 0;
    };
    BDManager.prototype.WX_ThreeKingFun_s533jee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //获取用户信息
    BDManager.prototype.checkUserInfo = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx checkUserInfo");
        swan.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo'] == true) {
                    console.log("用户已经授权");
                    BDManager.getInstance().getUserInfo();
                }
                else {
                    BDManager.getInstance().getLoginData();
                }
            }
        });
    };
    BDManager.prototype.authSettingUserInfo = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx authSettingUserInfo");
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.1")) {
            cc.log("当前微信版本过低，无法授权");
            return;
        }
        swan.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo'] == true) {
                    console.log("用户已经授权");
                }
                else {
                    swan.getSystemInfo({
                        success: function (res) {
                            console.log("swan.getSystemInfo", res);
                            var screenWidth = res.screenWidth;
                            var screenHeight = res.screenHeight;
                            var ratio = 1;
                            if (screenHeight / screenWidth >= 1280 / 720) {
                                ratio = screenWidth / 720;
                            }
                            else {
                                ratio = screenHeight / 1280;
                            }
                            // let imgWidth = 256
                            // let imgHeight = 102
                            // let btnPosY = -200
                            // let btnWidth = imgWidth * ratio
                            // let btnHeight = imgHeight * ratio
                            // let btnLeft = (screenWidth-btnWidth)/2
                            // let btnTop = screenHeight/2-btnPosY*ratio
                            var btnWidth = screenWidth;
                            var btnHeight = screenHeight;
                            var btnLeft = 0;
                            var btnTop = 0;
                            // let button = wx.createUserInfoButton({
                            //     type: 'image',
                            //     image: Sina_Config.WX_USERINFO_BTN_URL,
                            //     style: {
                            //         left: btnLeft,
                            //         top: btnTop,
                            //         width: btnWidth,
                            //         height: btnHeight,
                            //     }
                            // })
                            var button = swan.createUserInfoButton({
                                type: 'text',
                                text: "",
                                style: {
                                    left: btnLeft,
                                    top: btnTop,
                                    width: btnWidth,
                                    height: btnHeight,
                                    backgroundColor: "#00000000",
                                }
                            });
                            button.onTap(function (res) {
                                console.log("bd createUserInfoButton", res);
                                if (res.userInfo) {
                                    console.log("用户授权成功");
                                    BDManager.getInstance().avatarUrl = res.userInfo.avatarUrl;
                                    BDManager.getInstance().nickName = res.userInfo.nickName;
                                    SingleGameLogic_1.default.getInstance().wxUserInfo(BDManager.getInstance().nickName, BDManager.getInstance().avatarUrl);
                                }
                                else {
                                    console.log("用户拒绝授权");
                                }
                                button.destroy();
                            });
                        }
                    });
                }
            }
        });
    };
    BDManager.prototype.WX_ThreeKingFun_sjee43 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.getUserInfo = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("bd getUserInfo");
        swan.getUserInfo({
            success: function (res) {
                console.log("getUserInfo success, ", res);
                BDManager.getInstance().avatarUrl = res.userInfo.avatarUrl;
                BDManager.getInstance().nickName = res.userInfo.nickName;
                BDManager.getInstance().getLoginData();
            }
        });
    };
    BDManager.prototype.getAvatarUrl = function () {
        return this.avatarUrl;
    };
    BDManager.prototype.getNickName = function () {
        return this.nickName;
    };
    BDManager.prototype.WX_ThreeKingFun_sbnbdjee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //分享
    BDManager.prototype.showShareMenu = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        if (cc.sys.platform == cc.sys.WECHAT_GAME) { }
        var shareConfig = this.getShareConfig();
        if (!shareConfig) {
            return;
        }
        swan.showShareMenu({
            success: function (res) { cc.log("wx showShareMenu success, res:", res); },
            fail: function (res) { cc.log("wx showShareMenu failed, res:", res); }
        });
        swan.onShareAppMessage(function () {
            cc.log("用户点击了“转发”按钮");
            var shareConfig = this.getShareConfig();
            var queryStr = this.getShareQuery();
            return {
                title: shareConfig.title,
                imageUrlId: shareConfig.imageUrlId,
                imageUrl: shareConfig.imageUrl,
                query: queryStr
            };
        }.bind(this));
    };
    BDManager.prototype.WX_ThreeKingFun_sreejee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.shareAppMessage = function (successCallback, failCallback) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx shareAppMessage start");
        this.isShare = true;
        this.shareSuccessCallback = successCallback;
        this.shareFailCallback = failCallback;
        var shareConfig = this.getShareConfig();
        if (!shareConfig) {
            MKUtils_1.default.errorTips("分享失败");
            this.isShare = false;
            this.shareSuccessCallback = null;
            this.shareFailCallback = null;
            if (failCallback) {
                failCallback();
            }
        }
        var queryStr = this.getShareQuery();
        swan.shareAppMessage({
            title: shareConfig.title,
            imageUrl: shareConfig.imageUrl,
            query: queryStr
        });
    };
    BDManager.prototype.getShareConfig = function () {
        if (!this.shareConfig[configsFile_1.Sina_Config.SmallGameId]) {
            return null;
        }
        if (this.shareConfig[configsFile_1.Sina_Config.SmallGameId].length < 1) {
            return null;
        }
        var index = MKUtils_1.default.randomNM(0, this.shareConfig[configsFile_1.Sina_Config.SmallGameId].length - 1);
        return this.shareConfig[configsFile_1.Sina_Config.SmallGameId][index];
    };
    BDManager.prototype.getShareQuery = function () {
        var gameId = DataManager_1.default.getInstance().curGameID;
        var pid = DataManager_1.default.getInstance().getuserData().PlayerID;
        if (pid > 0) {
            return "gameId=" + gameId + "&pid=" + pid;
        }
        else {
            return "";
        }
    };
    BDManager.prototype.WX_ThreeKingFun_sje32e = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.checkShareResult = function () {
        if (this.isShare) {
            this.isShare = false;
            var curTime = MKUtils_1.default.getCurOsMillisecond();
            console.log("checkShareResult --- curTime:", curTime, ", hideTime:", this.hideTime);
            if (curTime - this.hideTime >= 2000 && this.hideTime > 0) {
                if (this.shareSuccessCallback) {
                    this.shareSuccessCallback();
                }
            }
            else {
                MKUtils_1.default.errorTips("分享失败");
                if (this.shareFailCallback) {
                    this.shareFailCallback();
                }
            }
            this.shareSuccessCallback = null;
            this.shareFailCallback = null;
        }
    };
    //排行榜
    BDManager.prototype.setUserScore = function (item, score) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        console.log("wx setUserScore item:", item, ", score:", score);
        if (!item) {
            return;
        }
        swan.postMessage({
            messageType: 1,
            item: item,
            score: score,
        });
    };
    BDManager.prototype.WX_ThreeKingFun_sjehhhe = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.showAllRank = function (item) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx showAllRank, item:", item);
        swan.postMessage({
            messageType: 2,
            item: item,
        });
    };
    BDManager.prototype.showSideRank = function (item) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx showSideRank, item:", item);
        swan.postMessage({
            messageType: 3,
            item: item,
        });
    };
    BDManager.prototype.showCenterRank = function (item, refresh) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx showSideRank, item:", item);
        var mType = refresh ? 4 : 5;
        swan.postMessage({
            messageType: mType,
            item: item,
        });
    };
    BDManager.prototype.WX_ThreeKingFun_sjeewe = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.showResultRank = function (item) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx showResultRank, item:", item);
        swan.postMessage({
            messageType: 6,
            item: item,
        });
    };
    BDManager.prototype.createImage = function () {
        return swan.createImage();
    };
    //手机振动
    BDManager.prototype.vibrateShort = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        cc.log("wx vibrateShort");
        swan.vibrateShort({
            success: function (res) { cc.log("wx vibrateShort success"); },
            fail: function (res) { cc.log("wx vibrateShort failed"); }
        });
    };
    BDManager.prototype.WX_ThreeKingFun_strerjee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //广告 Banner
    BDManager.prototype.createBannerAd = function (adIndex, topScale) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.4")) {
            cc.log("当前微信版本过低，请升级微信版本");
            return;
        }
        for (var i = 0; i < this.bannerAd.length; i++) {
            if (i != adIndex && this.bannerAd[i]) {
                this.bannerAd[i].hide();
            }
        }
        var adUnitId = BDManager.getInstance().getBannerAdId(adIndex);
        if (!adUnitId) {
            console.log("wx getBannerAdId error");
            return;
        }
        if (adUnitId == "") {
            console.log("wx getBannerAdId not show");
            return;
        }
        console.log("wx createBannerAd, adUnitId:", adUnitId);
        if (!this.bannerAd[adIndex]) {
            var sysInfo = swan.getSystemInfoSync();
            console.log("swan.getSystemInfoSync ", sysInfo);
            var screenWidth = sysInfo.screenWidth;
            var screenHeight = sysInfo.screenHeight;
            var adWidth = 300;
            var adLeft = (screenWidth - adWidth) / 2;
            topScale = topScale || BDManager.getInstance().bannerAdHeightScale;
            var adTop = screenHeight * (1 - topScale);
            if (screenHeight - adTop < 110) {
                adTop = screenHeight - 110;
            }
            BDManager.getInstance().bannerAd[adIndex] = swan.createBannerAd({
                adUnitId: adUnitId,
                style: {
                    left: adLeft,
                    top: adTop,
                    width: adWidth
                }
            });
            BDManager.getInstance().bannerAd[adIndex].onError(function (res) {
                console.log("wx bannerAd, error res:", res);
                if (res.errCode == 1000) {
                }
                else if (res.errCode == 1001) {
                }
            }.bind(this));
            BDManager.getInstance().bannerAd[adIndex].show();
        }
        else {
            this.bannerAd[adIndex].show();
        }
    };
    BDManager.prototype.WX_ThreeKingFun_sjegddde = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.destroyBannerAd = function (adIndex) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        if (this.bannerAd[adIndex]) {
            this.bannerAd[adIndex].destroy();
        }
        this.bannerAd[adIndex] = null;
    };
    BDManager.prototype.getBannerAdHeight = function () {
        return MKUtils_1.default.getShowSize().height * this.bannerAdHeightScale;
    };
    BDManager.prototype.WX_ThreeKingFun_sjeree = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.getBannerAdId = function (index) {
        var gameId = DataManager_1.default.getInstance().curGameID;
        if (!this.bannerAdIdConfig[gameId]) {
            return null;
        }
        if (this.bannerAdIdConfig[gameId].length > index) {
            return this.bannerAdIdConfig[gameId][index];
        }
        else {
            return this.bannerAdIdConfig[gameId][0];
        }
    };
    BDManager.prototype.WX_ThreeKingFun_smmjee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //激励视频广告
    BDManager.prototype.initRewardVideoAd = function () {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.4")) {
            SingleGameLogic_1.default.getInstance().rewardVideoAdEnable = false;
            return;
        }
        var adUnitId = BDManager.getInstance().getRewardVideoAdId(0);
        if (!adUnitId) {
            console.log("wx initRewardVideoAd failed!");
            return;
        }
        var videoAd = swan.createRewardedVideoAd({
            adUnitId: adUnitId
        });
        BDManager.getInstance().rewardVideoAd = videoAd;
        videoAd.onError(function (res) {
            console.log("wx videoAd, error1 res:", res);
        }.bind(this));
        videoAd.load();
    };
    BDManager.prototype.WX_ThreeKingFun_sjenff = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.playRewardVideoAd = function (adIndex, successCallback, failCallback) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.4")) {
            MKUtils_1.default.errorTips("当前微信版本过低，请升级");
            if (failCallback) {
                failCallback();
            }
            SingleGameLogic_1.default.getInstance().rewardVideoAdEnable = false;
            SingleGameLogic_1.default.getInstance().refreshRewardType();
            return;
        }
        console.log("wx playRewardVideoAd, adIndex:", adIndex);
        var adUnitId = BDManager.getInstance().getRewardVideoAdId(adIndex);
        if (!adUnitId) {
            MKUtils_1.default.errorTips("暂时不支持视频广告");
            if (failCallback) {
                failCallback();
            }
            SingleGameLogic_1.default.getInstance().refreshRewardType();
            return;
        }
        console.log("wx playRewardVideoAd, adUnitId:", adUnitId);
        BDManager.getInstance().videoAdSuccessCallback = successCallback;
        BDManager.getInstance().videoAdFailCallback = failCallback;
        var videoAd = swan.createRewardedVideoAd({
            adUnitId: adUnitId
        });
        BDManager.getInstance().rewardVideoAd = videoAd;
        videoAd.onError(function (res) {
            console.log("wx videoAd, error res:", res);
            videoAd.offError();
            videoAd.offClose();
            if (!BDManager.getInstance().rewardVideoAd) {
                return;
            }
            MKUtils_1.default.errorTips("今日视频广告次数已用完");
            SingleGameLogic_1.default.getInstance().rewardVideoAdEnable = false;
            if (BDManager.getInstance().videoAdFailCallback) {
                BDManager.getInstance().videoAdFailCallback();
            }
            SingleGameLogic_1.default.getInstance().refreshRewardType();
            BDManager.getInstance().videoAdFailCallback = null;
            BDManager.getInstance().videoAdSuccessCallback = null;
            BDManager.getInstance().rewardVideoAd = null;
        }.bind(this));
        videoAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            console.log("videoAd close res:", res);
            videoAd.offClose();
            videoAd.offError();
            if (!BDManager.getInstance().rewardVideoAd) {
                return;
            }
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                if (BDManager.getInstance().videoAdSuccessCallback) {
                    BDManager.getInstance().videoAdSuccessCallback();
                }
            }
            else {
                // 播放中途退出，不下发游戏奖励
                MKUtils_1.default.errorTips("视频广告观看失败");
                if (BDManager.getInstance().videoAdFailCallback) {
                    BDManager.getInstance().videoAdFailCallback();
                }
            }
            SingleGameLogic_1.default.getInstance().refreshRewardType();
            BDManager.getInstance().videoAdFailCallback = null;
            BDManager.getInstance().videoAdSuccessCallback = null;
            BDManager.getInstance().rewardVideoAd = null;
        });
        videoAd.show().catch(function (err) {
            videoAd.load().then(function () { return videoAd.show(); });
        });
    };
    BDManager.prototype.WX_ThreeKingFun_sjederwee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.getRewardVideoAdId = function (index) {
        index = index || 0;
        var gameId = configsFile_1.Sina_Config.SmallGameId;
        if (!this.rewardVideoAdIdConfig[gameId]) {
            return null;
        }
        if (this.rewardVideoAdIdConfig[gameId].length > index) {
            return this.rewardVideoAdIdConfig[gameId][index];
        }
        else {
            return this.rewardVideoAdIdConfig[gameId][0];
        }
    };
    //适配不同版本
    BDManager.prototype.compareVersion = function (v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    };
    BDManager.prototype.WX_ThreeKingFun_sjreeee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.prototype.wxSDKVersionIsBig = function (version) {
        if (!MKUtils_1.default.isWXGame()) {
            return false;
        }
        var curVersion = swan.getSystemInfoSync().SDKVersion;
        return BDManager.getInstance().compareVersion(curVersion, version) >= 0;
    };
    //小游戏跳转
    BDManager.prototype.toMiniProgram = function (appIndex) {
        if (!MKUtils_1.default.isWXGame()) {
            return;
        }
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.2.0")) {
            MKUtils_1.default.errorTips("当前微信版本过低，请升级");
            return;
        }
        console.log("wx navigateToMiniProgram appId:", appIndex);
        var appId = BDManager.getInstance().miniProgressIdConfig[appIndex];
        if (!appId) {
            MKUtils_1.default.errorTips("跳转失败");
            return;
        }
        swan.navigateToMiniProgram({
            appKey: appId,
            success: function (res) {
                console.log("wx navigateToMiniProgram success, res:", res);
            },
            fail: function (res) {
                console.log("wx navigateToMiniProgram fail, res:", res);
            }
        });
    };
    BDManager.prototype.isWxHeaUrl = function (fullUrl) {
        var isWXHeadUrl = (fullUrl.indexOf("https://wx.") >= 0);
        if (isWXHeadUrl) {
            fullUrl = fullUrl + "?.jpg";
        }
        return fullUrl;
    };
    BDManager.prototype.WX_ThreeKingFun_sjrreee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    BDManager.getInstance = function () {
        if (!this.bdManager) {
            this.bdManager = new BDManager();
        }
        return this.bdManager;
    };
    BDManager.bdManager = null;
    return BDManager;
}(BaseSdk_1.default));
exports.default = BDManager;

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
        //# sourceMappingURL=BDManager.js.map
        