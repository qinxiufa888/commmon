(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/event/EvenID.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '04e4eBSMCxL/Y3s51PWuDg6', 'EvenID', __filename);
// Script/event/EvenID.ts

/**
 * Author: Ma yuan
 * Date: 2018.10.24
 * CopyRight:
 * 事件ID
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EventIDS = /** @class */ (function () {
    function EventIDS() {
    }
    EventIDS.prototype.WX_ThreeKingFun_w222 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    EventIDS.prototype.WX_ThreeKingFun_w22266 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    EventIDS.prototype.WX_ThreeKingFun_w22432 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    EventIDS.prototype.WX_ThreeKingFun_w22hy2 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    EventIDS.prototype.WX_ThreeKingFun_w22872 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    EventIDS.prototype.WX_ThreeKingFun_w24322 = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    //tcp
    EventIDS.CMD_TCP_CONNECT_SUCCESS = "CMD_TCP_CONNECT_SUCCESS"; //socket连接成功
    EventIDS.CMD_TCP_CLOSED = "CMD_TCP_CLOSED"; //socket断开
    EventIDS.CMD_TCP_CONNECT_ERROR = "CMD_TCP_CONNECT_ERROR"; //socket未连接
    EventIDS.CMD_HEART_BEAT_TIMEOUT = "CMD_HEART_BEAT_TIMEOUT"; //心跳超时
    EventIDS.CMD_LOGIN_SUCCESS = "CMD_LOGIN_SUCCESS"; //登录成功
    EventIDS.CMD_ENTER_GAME_SUCCESS = "CMD_ENTER_GAME_SUCCESS"; //发送entergame成功
    EventIDS.CMD_GET_GAME_LIST_SUCCESS = "CMD_GET_GAME_LIST_SUCCESS"; //读取游戏列表
    EventIDS.CMD_GET_SIGN_LIST_SUCCESS = "CMD_GET_SIGN_LIST_SUCCESS"; //读取签到数据
    EventIDS.CMD_GET_WHEEL_LIST_SUCCESS = "CMD_GET_WHEEL_LIST_SUCCESS"; //获取到转盘显示数据
    EventIDS.CMD_GET_WHEEL_GAIN_LIST_SUCCESS = "CMD_GET_WHEEL_GAIN_LIST_SUCCESS"; //获取到转盘中奖数据
    EventIDS.CMD_WHEEL_ACTION_END = "CMD_WHEEL_ACTION_END"; //获取到转盘中奖数据
    EventIDS.CMD_SHOW_GET_REWARD_LAYER = "CMD_SHOW_GET_REWARD_LAYER"; //打开通用获得界面
    EventIDS.CMD_CLOSE_WHEEL_LAYER = "CMD_CLOSE_WHEEL_LAYER"; //关闭转盘界面
    EventIDS.CMD_SHOW_VS_LAYER = "CMD_SHOW_VS_LAYER"; //显示VS界面
    EventIDS.CMD_SERVER_CUT_LINE = "CMD_SERVER_CUT_LINE"; //服务器停服维护踢人
    EventIDS.CMD_SERVER_SUBGAME_MAINTENCE = "CMD_SERVER_SUBGAME_MAINTENCE"; //进入小游戏失败，游戏服务维护
    EventIDS.CMD_SHOW_RESULT_LAYER = "CMD_SHOW_RESULT_LAYER"; //显示结算界面
    EventIDS.CMD_LOAD_CONFIG_SUCCESS = "CMD_LOAD_CONFIG_SUCCESS"; //加载config成功回调
    EventIDS.CMD_SHOW_BROADCAST = "CMD_SHOW_BROADCAST"; //显示走马灯
    EventIDS.CMD_SINGLE_GAME_BUY_LIEF_SUCCESS = "CMD_SINGLE_GAME_BUY_LIEF_SUCCESS"; //单机游戏购买复活成功
    EventIDS.CMD_SINGLE_GAME_BUY_LIEF_FAIL = "CMD_SINGLE_GAME_BUY_LIEF_FAIL"; //单机游戏购买复活失败
    EventIDS.CMD_SINGLE_GAME_SNY_SUCCESS = "CMD_SINGLE_GAME_SNY_SUCCESS"; //单机游戏同步成功
    EventIDS.CMD_SINGLE_GAME_REFRESH_GEM = "CMD_SINGLE_GAME_REFRESH_GEM"; //单机游戏刷新宝石数量
    EventIDS.CMD_SINGLE_GAME_BACK_LEVEL = "CMD_SINGLE_GAME_BACK_LEVEL"; //单机游戏回退一关
    EventIDS.CMD_SINGLE_GAME_START_NEXT_LEVEL = "CMD_SINGLE_GAME_START_NEXT_LEVEL"; //单机游戏开始下一关
    EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE = "CMD_SINGLE_GAME_ARMS_CHANGE"; //单机游戏开始下一关
    EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE = "CMD_SINGLE_GAME_REWARD_TYPE_CHANGE"; //单机游戏开始下一关
    EventIDS.CMD_SINGLE_GAME_SHOW_SIDE_RANK = "CMD_SINGLE_GAME_SHOW_SIDE_RANK"; //侧边栏排行榜
    EventIDS.CMD_SHOW_SEND_TO_OTHER = "CMD_SHOW_SEND_TO_OTHER"; //自己向对手发起挑战
    EventIDS.CMD_SHOW_OTHER_TO_SELF = "CMD_SHOW_OTHER_TO_SELF"; //对手向自己发起挑战
    EventIDS.CMD_SHOW_OTHER_EXIT = "CMD_SHOW_OTHER_EXIT"; //对方已经离开
    //刷新积分
    EventIDS.CMD_REFRESH_COIN = "CMD_REFRESH_COIN"; //刷新积分
    // 方块消除
    EventIDS.CMD_SQU_ELIMITE_RET = "CMD_SQU_ELIMITE_RET"; //读取游戏列表
    EventIDS.CMD_SQU_RESULT_RET = "CMD_SQU_RESULT_RET"; //显示VS界面
    // 斗兽棋
    EventIDS.CMD_JUNGLE_ELIMITE_RET = "CMD_JUNGLE_ELIMITE_RET"; //读取游戏列表
    EventIDS.CMD_JUNGLE_RESULT_RET = "CMD_JUNGLE_RESULT_RET"; //显示VS界面
    EventIDS.CMD_JUNGLE_CHAT_RET = "CMD_JUNGLE_CHAT_RET"; //读取游戏列表
    EventIDS.CMD_JUNGLE_PEACE_RET = "CMD_JUNGLE_PEACE_RET"; //显示VS界面
    // 围猎棋
    EventIDS.CMD_HUNT_ELIMITE_RET = "CMD_HUNT_ELIMITE_RET"; //读取游戏列表
    EventIDS.CMD_HUNT_RESULT_RET = "CMD_HUNT_RESULT_RET"; //显示VS界面
    EventIDS.CMD_HUNT_CHAT_RET = "CMD_HUNT_CHAT_RET"; //读取游戏列表
    EventIDS.CMD_HUNT_PEACE_RET = "CMD_HUNT_PEACE_RET"; //显示VS界面
    // 三国抽卡
    EventIDS.CMD_SEND_THREEKING_HIDELOVEBTN = "CMD_SEND_THREEKING_HIDELOVEBTN"; //隐藏情缘点亮按钮
    EventIDS.CMD_SEND_THREEKING_LIGHTEN = "CMD_SEND_THREEKING_LIGHTEN"; //获取情缘点亮列表
    EventIDS.CMD_SEND_THREEKING_SHOW = "CMD_SEND_THREEKING_SHOW";
    EventIDS.CMD_SEND_THREEKING_PUBROOM = "CMD_SEND_THREEKING_PUBROOM"; //进入酒馆界面
    EventIDS.CMD_SEND_THREEKING_PUBROOM1 = "CMD_SEND_THREEKING_PUBROOM1"; //进入酒馆界面
    EventIDS.CMD_SEND_THREEKING_PUBROOM_FAILE = "CMD_SEND_THREEKING_PUBROOM_FAILE"; //进入酒馆界面，无数据
    EventIDS.CMD_SEND_THREEKING_GRADE = "CMD_SEND_THREEKING_GRADE"; //升级成功
    EventIDS.CMD_SEND_THREEKING_UPDATE_FIGHT_AREA = "CMD_SEND_THREEKING_UPDATE_FIGHT_AREA"; //战场刷新
    EventIDS.CMD_SEND_THREEKING_UPDATE_FIGHT_CAMP = "CMD_SEND_THREEKING_UPDATE_FIGHT_CAMP"; //营地刷新
    EventIDS.CMD_SEND_THREEKING_UPDATE_MONEY = "CMD_SEND_THREEKING_UPDATE_MONEY"; //跳数刷新金币
    EventIDS.CMD_SEND_THREEKING_UPDATE_MONEY_ONLY = "CMD_SEND_THREEKING_UPDATE_MONEY_ONLY"; //只刷新金币
    EventIDS.CMD_SEND_THREEKING_UPDATE_MONEYSPEED_ONLY = "CMD_SEND_THREEKING_UPDATE_MONEYSPEED_ONLY"; //刷新战力
    EventIDS.CMD_SEND_THREEKING_UPDATE_DISBAND_SUS = "CMD_SEND_THREEKING_UPDATE_DISBAND_SUS"; //遣散成功
    EventIDS.CMD_SEND_THREEKING_UPDATE_GOBATTLE_SUS = "CMD_SEND_THREEKING_UPDATE_GOBATTLE_SUS"; //上阵成功
    EventIDS.CMD_SEND_THREEKING_UPDATE_COME_GUIDE = "CMD_SEND_THREEKING_UPDATE_COME_GUIDE"; //继续新手引导
    EventIDS.CMD_SEND_THREEKING_UPDATE_SHOWUI = "CMD_SEND_THREEKING_UPDATE_SHOWUI"; //显示战场
    EventIDS.CMD_SEND_THREEKING_UPDATE_CAMPUI = "CMD_SEND_THREEKING_UPDATE_CAMPUI"; //显示武将库
    EventIDS.CMD_SEND_THREEKING_ZMSUCCESS = "CMD_SEND_THREEKING_ZMSUCCESS"; //招募成功 Recruit
    EventIDS.CMD_SEND_THREEKING_RECRUIT = "CMD_SEND_THREEKING_RECRUIT"; //招贤成功
    EventIDS.CMD_SEND_THREEKING_DRAG = "CMD_SEND_THREEKING_DRAG"; //长按营地图标拖动操作
    EventIDS.CMD_SEND_THREEKING_OPEN_FIGHTSCENCE = "CMD_SEND_THREEKING_OPEN_FIGHTSCENCE"; //打开战斗场景
    EventIDS.CMD_SEND_THREEKING_SEND_FIGHT = "CMD_SEND_THREEKING_SEND_FIGHT"; //上阵成功 显示战图标
    EventIDS.CMD_SEND_THREEKING_MOVED = "CMD_SEND_THREEKING_MOVED"; //有移动，取消长按计时
    EventIDS.CMD_SEND_THREEKING_BRING = "CMD_SEND_THREEKING_BRING"; //衍生成功
    EventIDS.CMD_SEND_THREEKING_BRING_REWAED = "CMD_SEND_THREEKING_BRING_REWAED"; //衍生成功,并领取成功
    EventIDS.CMD_SEND_THREEKING_UPDATE_CUTDOWNTIME = "CMD_SEND_THREEKING_UPDATE_CUTDOWNTIME"; //刷新倒计时
    EventIDS.CMD_SEND_THREEKING_UPDATE_REDSTATU = "CMD_SEND_THREEKING_UPDATE_REDSTATU"; //刷新小红点
    EventIDS.CMD_SEND_THREEKING_JUMP_PAGE = "CMD_SEND_THREEKING_JUMP_PAGE"; //跳转指定页面
    EventIDS.CMD_SEND_THREEKING_UPDATE_LEVEL = "CMD_SEND_THREEKING_UPDATE_LEVEL"; //刷新等级和经验
    EventIDS.CMD_SEND_THREEKING_UPDATE_GREAD = "CMD_SEND_THREEKING_UPDATE_GREAD"; //刷新升级展示
    EventIDS.CMD_SEND_THREEKING_UPDATE_BRAND = "CMD_SEND_THREEKING_UPDATE_BRAND"; //刷新兵符
    EventIDS.CMD_SEND_THREEKING_UPDATE_BRANDSTATU = "CMD_SEND_THREEKING_UPDATE_BRANDSTATU"; //兵符
    EventIDS.CMD_SEND_THREEKING_UPDATE_RANKBRAND = "CMD_SEND_THREEKING_UPDATE_RANKBRAND"; //刷新战场排行兵符
    EventIDS.CMD_SEND_THREEKING_REWARD_BRAND = "CMD_SEND_THREEKING_REWARD_BRAND"; //领取昨日兵符
    EventIDS.CMD_SEND_THREEKING_OPEN_HORSE = "CMD_SEND_THREEKING_OPEN_HORSE"; //打开小马车动画
    EventIDS.CMD_SEND_THREEKING_UPDATE_WEIGHT = "CMD_SEND_THREEKING_UPDATE_WEIGHT"; //更新玩家品质
    EventIDS.CMD_SEND_THREEKING_WEIGHT_SUCCESS = "CMD_SEND_THREEKING_WEIGHT_SUCCESS"; //更新玩家品质成功回调
    //新手引导
    EventIDS.CMD_SEND_THREEKING_GUIDE_TOUCHOPEN = "CMD_SEND_THREEKING_GUIDE_TOUCHOPEN"; //打开触摸屏蔽
    EventIDS.CMD_SEND_THREEKING_GUIDE_TOUCHCLOSE = "CMD_SEND_THREEKING_GUIDE_TOUCHCLOSE"; //关闭触摸屏蔽
    EventIDS.CMD_SEND_THREEKING_GUIDE_WINEHIDE = "CMD_SEND_THREEKING_GUIDE_WINEHIDE"; //酒馆按钮隐藏
    EventIDS.CMD_SEND_THREEKING_GUIDE_WINESHOW = "CMD_SEND_THREEKING_GUIDE_WINESHOW"; //酒馆按钮显示
    EventIDS.CMD_SEND_THREEKING_GUIDE_GIRLTIPS = "CMD_SEND_THREEKING_GUIDE_GIRLTIPS"; //小女孩提示
    EventIDS.CMD_SEND_THREEKING_GUIDE_GIRLTIPSGRADE = "CMD_SEND_THREEKING_GUIDE_GIRLTIPSGRADE"; //小女孩提示升级
    EventIDS.CMD_SEND_THREEKING_GUIDE_HITWINE = "CMD_SEND_THREEKING_GUIDE_HITWINE"; //点击酒馆召集
    EventIDS.CMD_SEND_THREEKING_GUIDE_HITWINE1 = "CMD_SEND_THREEKING_GUIDE_HITWINE1"; //点击酒馆召集
    EventIDS.CMD_SEND_THREEKING_GUIDE_HITWINE2 = "CMD_SEND_THREEKING_GUIDE_HITWINE2"; //点击酒馆按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_SENIORHIDE = "CMD_SEND_THREEKING_GUIDE_SENIORHIDE"; //隐藏高级招贤按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_ONJUNIOR = "CMD_SEND_THREEKING_GUIDE_ONJUNIOR"; //点击初级招贤按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_ONSENIOR = "CMD_SEND_THREEKING_GUIDE_ONSENIOR"; //点击高级招贤按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_ONZHAOMU = "CMD_SEND_THREEKING_GUIDE_ONZHAOMU"; //点击招募按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_ONGRADE = "CMD_SEND_THREEKING_GUIDE_ONGRADE"; //点击英雄升级按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_ONCLOSE = "CMD_SEND_THREEKING_GUIDE_ONCLOSE"; //点击酒馆关闭按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_JUNIORTIPS = "CMD_SEND_THREEKING_GUIDE_JUNIORTIPS"; //初级招贤按钮手指提示
    EventIDS.CMD_SEND_THREEKING_GUIDE_SENIORTIPS = "CMD_SEND_THREEKING_GUIDE_SENIORTIPS"; //高级招贤按钮手指提示
    EventIDS.CMD_SEND_THREEKING_GUIDE_HEROTIPS = "CMD_SEND_THREEKING_GUIDE_HEROTIPS"; //英雄升级按钮手指提示
    EventIDS.CMD_SEND_THREEKING_GUIDE_HITHERO = "CMD_SEND_THREEKING_GUIDE_HITHERO"; //点击英雄升级按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_ZHAOMU = "CMD_SEND_THREEKING_GUIDE_ZHAOMU"; //指向招募
    EventIDS.CMD_SEND_THREEKING_GUIDE_WINECLOSE = "CMD_SEND_THREEKING_GUIDE_WINECLOSE"; //指向关闭酒馆
    EventIDS.CMD_SEND_THREEKING_GUIDE_WINECLOSE1 = "CMD_SEND_THREEKING_GUIDE_WINECLOSE1"; //指向关闭酒馆
    EventIDS.CMD_SEND_THREEKING_GUIDE_WINEOPEN = "CMD_SEND_THREEKING_GUIDE_WINEOPEN"; //指向酒馆小手提示
    EventIDS.CMD_SEND_THREEKING_GUIDE_WINEOPEN1 = "CMD_SEND_THREEKING_GUIDE_WINEOPEN1"; //指向酒馆小手提示
    EventIDS.CMD_SEND_THREEKING_GUIDE_GRADETIPS = "CMD_SEND_THREEKING_GUIDE_GRADETIPS"; //指向升级按钮
    EventIDS.CMD_SEND_THREEKING_GUIDE_HANDHERO = "CMD_SEND_THREEKING_GUIDE_HANDHERO"; //手指提示指向英雄
    EventIDS.CMD_SEND_THREEKING_GUIDE_CLOSEMASK = "CMD_SEND_THREEKING_GUIDE_CLOSEMASK"; //关闭mask层
    EventIDS.CMD_SEND_THREEKING_GUIDE_FIGHT = "CMD_SEND_THREEKING_GUIDE_FIGHT"; //指向战斗场
    EventIDS.CMD_SEND_THREEKING_GUIDE_FIGHT1 = "CMD_SEND_THREEKING_GUIDE_FIGHT1"; //指向战斗场
    EventIDS.CMD_SEND_THREEKING_GUIDE_FIGHTONE = "CMD_SEND_THREEKING_GUIDE_FIGHTONE"; //指向战斗某个玩家
    EventIDS.CMD_SEND_THREEKING_GUIDE_FIGHTONE1 = "CMD_SEND_THREEKING_GUIDE_FIGHTONE1"; //指向战斗某个玩家
    EventIDS.CMD_SINGLE_GAME_REFRESH_LOVETIPS = "CMD_SINGLE_GAME_REFRESH_LOVETIPS"; //情缘提示
    EventIDS.CMD_SEND_THREEKING_GUIDE_OPENLOVE = "CMD_SEND_THREEKING_GUIDE_OPENLOVE"; //指向点击情缘
    EventIDS.CMD_SEND_THREEKING_GUIDE_RIGHTLOVE = "CMD_SEND_THREEKING_GUIDE_RIGHTLOVE"; //点亮情缘
    EventIDS.CMD_SEND_THREEKING_GUIDE_RIGHTLOVE1 = "CMD_SEND_THREEKING_GUIDE_RIGHTLOVE1"; //点亮情缘
    EventIDS.CMD_SEND_THREEKING_GUIDE_CLOSELOVE = "CMD_SEND_THREEKING_GUIDE_CLOSELOVE"; //关闭情缘
    // 扫雷
    EventIDS.CMD_MINE_PANCE_RET = "CMD_MINE_PANCE_RET"; //读取游戏列表
    EventIDS.CMD_MINE_RESULT_RET = "CMD_MINE_RESULT_RET"; //显示VS界面
    //六角消消乐
    EventIDS.CMD_HEXAGON_CHAT_RET = "CMD_HEXAGON_CHAT_RET"; //表情
    EventIDS.CMD_SEND_DP_INTOGAMERET = "CMD_SEND_DP_INTOGAMERET";
    EventIDS.CMD_SEND_DP_STATESYNC = "CMD_SEND_DP_STATESYNC";
    EventIDS.CMD_SEND_DP_UPDATE = "CMD_SEND_DP_UPDATE";
    EventIDS.CMD_SEND_DP_BET = "CMD_SEND_DP_BET";
    EventIDS.CMD_SEND_DP_HIDE_RESULT = "CMD_SEND_DP_HIDE_RESULT";
    EventIDS.CMD_SEND_DP_SHOW_RESULT = "CMD_SEND_DP_SHOW_RESULT";
    EventIDS.CMD_SEND_DP_SHOW_COMPARE = "CMD_SEND_DP_SHOW_COMPARE";
    EventIDS.CMD_SEND_DP_EXIT = "CMD_SEND_DP_EXIT";
    EventIDS.CMD_SEND_DP_EXIT_RET = "CMD_SEND_DP_EXIT_RET";
    EventIDS.CMD_SEND_DP_RECORD_RET = "CMD_SEND_DP_RECORD_RET";
    EventIDS.CMD_SEND_DP_LHDTIPS_SHOW = "CMD_SEND_DP_LHDTIPS_SHOW";
    EventIDS.CMD_SEND_DP_LHDTIPS_HIDE = "CMD_SEND_DP_LHDTIPS_HIDE";
    EventIDS.CMD_SEND_DP_WIN_SHOW = "CMD_SEND_DP_WIN_SHOW";
    EventIDS.CMD_SEND_DP_WIN_HIDE = "CMD_SEND_DP_WIN_HIDE";
    EventIDS.CMD_SEND_DP_NETERROR_RECONNECT = "CMD_SEND_DP_NETERROR_RERECORD"; //龙虎斗 断线重连
    //勇往直前
    EventIDS.CMD_BRAVO_SPEED_CHANGED = "CMD_BRAVO_SPEED_CHANGED"; //速度变化通知
    EventIDS.CMD_SEND_CITYCAR_SHOW = "CMD_SEND_CITYCAR_SHOW";
    EventIDS.CMD_SEND_CITYCAR_HIDE = "CMD_SEND_CITYCAR_HIDE";
    EventIDS.CMD_SEND_CITYCAR_GAMESTART = "CMD_SEND_CITYCAR_GAMESTART";
    EventIDS.CMD_SEND_CITYCAR_UPDATE_MYBET = "CMD_SEND_CITYCAR_UPDATE_MYBET";
    EventIDS.CMD_SEND_CITYCAR_UPDATE_ALLBET = "CMD_SEND_CITYCAR_UPDATE_ALLBET";
    EventIDS.CMD_SEND_CITYCAR_APPLYSUCCESS = "CMD_SEND_CITYCAR_APPLYSUCCESS";
    // public static CMD_SEND_CITYCAR_BANKERUPDATA = "CMD_SEND_CITYCAR_BANKERUPDATA";
    EventIDS.CMD_SEND_CITYCAR_UPDATASELFBET = "CMD_SEND_CITYCAR_UPDATASELFBET";
    EventIDS.CMD_SEND_CITYCAR_CHANGEBANKER = "CMD_SEND_CITYCAR_CHANGEBANKER";
    EventIDS.CMD_SEND_CITYCAR_UPDATABANKERGOLD = "CMD_SEND_CITYCAR_UPDATABANKERGOLD";
    EventIDS.CMD_SEND_CITYCAR_EXITCITYCAR = "CMD_SEND_CITYCAR_EXITCITYCAR";
    EventIDS.CMD_SEND_CITYCAR_CLOSEGAME = "CMD_SEND_CITYCAR_CLOSEGAME";
    EventIDS.CMD_SEND_CITYCAR_CITYCARCLOSE = "CMD_SEND_CITYCAR_CITYCARCLOSE";
    EventIDS.CMD_SEND_CITYCAR_CARHISTORY = "CMD_SEND_CITYCAR_CARHISTORY";
    EventIDS.CMD_SEND_CITYCAR_HIDE_DRAWLOTTERY = "CMD_SEND_CITYCAR_HIDE_DRAWLOTTERY";
    EventIDS.CMD_SEND_CITYCAR_SHOW_DRAWLOTTERY = "CMD_SEND_CITYCAR_SHOW_DRAWLOTTERY";
    // public static CMD_SEND_CITYCAR_CARSETTLEMENT = "CMD_SEND_CITYCAR_CARSETTLEMENT";
    EventIDS.CMD_SEND_CITYCAR_SHOW_CITYCARRECORD = "CMD_SEND_CITYCAR_SHOW_CITYCARRECORD";
    EventIDS.CMD_SEND_CITYCAR_HIDE_CITYCARRECORD = "CMD_SEND_CITYCAR_HIDE_CITYCARRECORD";
    EventIDS.CMD_SEND_CITYCAR_SHOW_CARSETTLEMENT = "CMD_SEND_CITYCAR_SHOW_CARSETTLEMENT";
    EventIDS.CMD_SEND_CITYCAR_HIDE_CARSETTLEMENT = "CMD_SEND_CITYCAR_HIDE_CARSETTLEMENT";
    EventIDS.CMD_SEND_CITYCAR_HIDE_CITYCARTIPS = "CMD_SEND_CITYCAR_HIDE_CITYCARTIPS";
    EventIDS.CMD_SEND_CITYCAR_SIGNEL_EXIT = "CMD_SEND_CITYCAR_SIGNEL_EXIT"; //单机退出取消通知
    return EventIDS;
}());
exports.EventIDS = EventIDS;

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
        //# sourceMappingURL=EvenID.js.map
        