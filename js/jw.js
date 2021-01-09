var jw = {
    //基础配置类
    config: {
        // ip: "http://192.168.8.224:8087", //请求外网IP
        // ip:"http://erp.jiwanginfo.com:11984",  //  测试 Y9 地址
        ip:"http://gjccy9.jiwanginfo.com",  //  正式的地址  Y9
        // ip: "http://www.yunpuer.com", //请求外网IP
         ip0: "http://www.yunpuer.com", //请求外网IP
        ip2: "http://192.168.0.106:18111", //请求内网IP

        // ip3: "http://www.yunpuer.com", // y9 支付 短信调用域名
        ip3: "http://47.96.150.18:8081", // y9 支付 短信调用ip
        // imagesUrl:"http://192.168.8.224:8087",// 测试图片ip
        imagesUrl:"http://www.yunpuer.com",// 正式图片ip
        // url: "/SelfModel/sqldata.aspx?cmdname=", // 老的接口地址
        url: "/PCodeClient/api.ashx", //接口地址
        url2: "/appshopping.ashx", //接口地址
        ImgUrl: "/SelfModel/hander.aspx?cmd=uploadImgList", //上传图片提交
        url3:"/SelfModel/hander.aspx", // 验证码接口
        ajaxStatus: true, //ajax防止重复提交处理
        ms: 3000, //提示时间
        loading: "http://www.eastled.com/eastledApp/appModifyImg//loading.gif", /* 加载中图片*/
    },
    /* 返回 */
    back: function () {
        api.closeWin();
        //alert(1)
        //window.location.reload();
    },
    //登陆信息
    login: {
        //用户ID
        Userid: function() {
            var Uid = jw.data.get("Userid", "");
            return Uid;
        },
        //用户信息
        UserData: function() {
            var UserData = jw.data.get("UserData", "");
            return UserData;
        }
    },
    // 错误日志提交
    submiterror: function (option) {
        option = $.extend({
            type: "101",
            cmd: "",
            urls: "",
            ret: {},
            time: jw.Dt.getNowdata(),
            error: ""
        }, option);
        jw.ts.jiazaiShow();
        //请求默认路径
        var linshiUrl = jw.config.url;
        //接口组合
        var urls = jw.data.get("IP") + "/" + linshiUrl + '?cmd=ErrorReporting&sb=手持PDA';
        $.ajax({
            url: urls,
            data: option,
            type: "POST",
            dataType:'json',
            success:function (ret1) {
                jw.ts.jiazaiHide();
            },
            error:function(er){
                jw.ts.jiazaiHide();
            }
        });
    },
    //提交
    submit: function (Cmd, data,callback, option) {
        option = $.extend(true, {
            ajaxStatus: true, /* true 强制提交  */
            jz: true, /* true 初始化显示加载中 */
            U: false, /* true 判断是否验证后登陆 */
            Ip: "", /* 是否更新请求地址 有则更新路径 ip不变 */
            Url: "", /* 是否更新请求地址 有则更新路径 ip不变 */
            log: true,
            returnall: false, // 返回接口所有数据
            cmd: "cmd",
            errorfun: function(){},
        }, option);

        if (option.jz == true){
            jw.ts.jiazaiShow();
        }

        //强制提交
        if(option.ajaxStatus == true) {
            jw.config.ajaxStatus = true;
        }
        //防止重复提交
        if (jw.config.ajaxStatus == false) {
            jw.ts.toast("请求过于频繁，请稍后重试...");
            return;
        }
        jw.config.ajaxStatus = false; //禁止提交

        //读取当前网络环境
        var wangluo = jw.sb.wangluo.Type();
        if (wangluo == "none") {
            jw.ts.toast("请连接网络后重试...");
            jw.config.ajaxStatus = true;
            jw.ts.jiazaiHide();
            return;
        }

        var thisip = jw.config.ip;
        if (jw.data.get("IP") != ""){
            thisip = jw.data.get("IP");
        }
        if(option.Ip != ""){
            thisip = option.Ip;
        }

        //请求默认路径
        var linshiUrl = jw.config.url;
        if(option.Url != ""){
            linshiUrl = option.Url;
        }

        /* 加装y9的coolie加密串  start */
        //创建需要传递的参数对象
        var objCookieTable =  {};
        //Y9安全验证码（cookie加密串）
        try {
            //获取本地内存的y9cookie字符串
            var CookieTable = localStorage.getItem("CookieTable");
            if (CookieTable != null) {
                if (CookieTable.indexOf("{") == -1 && CookieTable.indexOf(":") == -1 && CookieTable.indexOf("}") == -1) CookieTable = '{}';
                //拆分
                var CookieTableArr = eval('(' + CookieTable + ')');
                var i = 0;
                for (var x in CookieTableArr) {
                    objCookieTable["CookieTableArr" + i] = "@@cookie." + x + "." + CookieTableArr[x];
                    i++;
                }
                return objCookieTable;
            }
        } catch (e) {

        }
        //合并
        if (objCookieTable != null)
            data = $.extend(objCookieTable, data);
        /* 加装y9的coolie加密串  end */

        //接口组合
        var urls = thisip + linshiUrl+"?" +option.cmd+"="+ Cmd;
        // console.log(JSON.stringify(urls) +"data: "+ JSON.stringify(data));
        $.ajax({
            url: urls,
            data: data,
            type: "POST",
            timeout : 20000, //超时时间设置，单位毫秒
            dataType:'json',
            success:function (ret1) {
                jw.ts.jiazaiHide();
                jw.config.ajaxStatus = true;
                if (option.log){
                    console.log('======================================')
                    console.log("url:"+urls +"\r\n 参数"+JSON.stringify(data)+"\r\n 返回"+JSON.stringify(ret1));
                    console.log('********************************************')
                }
                if (option.returnall){
                    callback(ret1);
                    return;
                }
                if (typeof(ret1) == "object"){
                    if (ret1.status == "200" || ret1.status == 200){
                        //数据转换
                        var ret;
                        if (ret1.data != undefined){
                            ret = ret1.data;
                        }
                        else {
                            ret = ret1.msg;
                        }
                        callback(ret,ret1);
                    }else {
                        var error = "";
                        if (ret1.error != undefined){
                            error = ret1.error;
                        }
                        else {
                            error = ret1.msg;
                        }
                        jw.ts.toast(error);
                        return false;
                    }
                }else{
                    if (ret1 == undefined || ret1 == ""){
                        jw.ts.toast("101:无法连接到网络")
                        return false;
                    }
                    if (JSON.stringify(ret1).indexOf("!DOCTYPE") != -1){
                        jw.ts.toast("102:无法连接到网络");
                        return false;
                    }
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                jw.ts.jiazaiHide();
                jw.config.ajaxStatus = true;
                option.errorfun(XMLHttpRequest, textStatus, errorThrown);
                console.log('======================================')
                console.log(JSON.stringify(XMLHttpRequest))
                console.log(JSON.stringify(textStatus))
                console.log(JSON.stringify(errorThrown))
                console.log("url:"+urls +"\r\n 参数"+JSON.stringify(data));
                console.log('********************************************')
            }
        });
    },
//ykt提交
    submit_ykt: function (Cmd, data,callback, option) {
        option = $.extend(true, {
            ajaxStatus: true, /* true 强制提交  */
            jz: true, /* true 初始化显示加载中 */
            U: false, /* true 判断是否验证后登陆 */
            Ip: "", /* 是否更新请求地址 有则更新路径 ip不变 */
            Url: "", /* 是否更新请求地址 有则更新路径 ip不变 */
            log: true,
            returnall: false, // 返回接口所有数据
            cmd: "cmd",
            errorfun: function(){},
        }, option);

        if (option.jz == true){
            jw.ts.jiazaiShow();
        }

        //强制提交
        if(option.ajaxStatus == true) {
            jw.config.ajaxStatus = true;
        }
        //防止重复提交
        if (jw.config.ajaxStatus == false) {
            jw.ts.toast("请求过于频繁，请稍后重试...");
            return;
        }
        jw.config.ajaxStatus = false; //禁止提交

        //读取当前网络环境
        var wangluo = jw.sb.wangluo.Type();
        if (wangluo == "none") {
            jw.ts.toast("请连接网络后重试...");
            jw.config.ajaxStatus = true;
            jw.ts.jiazaiHide();
            return;
        }

        var thisip = jw.config.ip;
        if (jw.data.get("IP") != ""){
            thisip = jw.data.get("IP");
        }
        if(option.Ip != ""){
            thisip = option.Ip;
        }

        //请求默认路径
        var linshiUrl = jw.config.url;
        if(option.Url != ""){
            linshiUrl = option.Url;
        }

        /* 加装y9的coolie加密串  start */
        //创建需要传递的参数对象
        var objCookieTable =  {};


        //接口组合
        var urls = thisip + linshiUrl+"?" +option.cmd+"="+ Cmd;
        api.ajax({
            url: urls,
            method: 'post',
            data: {
                values: data
            }
        }, function(ret, err) {
            jw.ts.jiazaiHide();
            jw.config.ajaxStatus = true;
            console.log('======================================')
            console.log("url:"+urls +"\r\n 参数"+JSON.stringify(data)+"\r\n 返回"+JSON.stringify(ret));
            console.log('********************************************')
            callback(ret.data);
        });
    },
    //打开窗体
    openWin: function (opt, yz) {
        /* 是否需要验证登陆 */
        if (yz == false) {
            if (jw.login.Userid() <= 0) {
                jw.ts.toast("请登录");
                return;
            }
        }
        var now = new Date();
        opt = $.extend(true, {
            name: 'name' + now.getTime(), //window 名字，不能为空字符串
            url: './page1.html', //支持相对路径和绝对路径以及 widget://、fs://等协议路径，远程地址
            bounces: false, //（可选项）页面是否弹动
            bgColor: '#ffffff', //（可选项）背景色，支持图片和颜色，格式为 #fff、#ffffff、rgba(r,g,b,a)等
            scrollToTop: true, //当点击状态栏，页面是否滚动到顶部只 iOS 有效
            vScrollBarEnabled: true, //是否显示垂直滚动条
            hScrollBarEnabled: false, //是否显示水平滚动条
            scaleEnabled: false, //页面是否可以缩放
            slidBackEnabled: true, //是否支持滑动返回。iOS7.0及以上系统中，在新打开的页面中向右滑动，可以返回到上一个页面，该字段只 iOS 有效
            slidBackType: 'full', //当支持滑动返回时，设置手指在页面右滑的有效作用区域。取值范围（full:整个页面范围都可以右滑返回，edge:在页面左边缘右滑才可以返回）
            delay: 300, //window 显示延迟时间，适用于将被打开的 window 中可能需要打开有耗时操作的模块时，可延迟 window 展示到屏幕的时间，保持 UI 的整体性
            reload: false, //页面已经打开时，是否重新加载页面，重新加载页面后 apiready 方法将会被执行
            allowEdit: false, //是否允许长按页面时弹出选择菜单
            softInputMode: 'auto', //当键盘弹出时，输入框被盖住时，当前页面的调整方式
            customRefreshHeader: '', //设置使用自定义下拉刷新模块的名称，设置后可以使用 api.setCustomRefreshHeaderInfo 方法来使用自定义下拉刷新组件
            animation: {
                type: "push", //动画类型（详见动画类型常量）
                subType: "from_right", //动画子类型（详见动画子类型常量）
                duration: 300 //动画过渡时间，默认300毫秒
            },
            progress: { //页面加载进度配置信息，若不传则无加载进度效果
                type: "default", //加载进度效果类型，默认值为 default，取值范围为 default|page，default 等同于 showProgress 参数效果；为 page 时，进度效果为仿浏览器类型，固定在页面的顶部
                title: "打开中", //type 为 default 时显示的加载框标题
                text: "请稍等...", //type 为 default 时显示的加载框内容
                color: "" //type 为 page 时进度条的颜色，默认值为 #45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
            },
            pageParam: {
                name: 'test'
            }
        }, opt);
        //ios设备无需延迟
        if (jw.sb.systemType() == "ios") {
            opt.delay = 0; //延迟0秒
        }
        api.openWin(opt);
    },
    //打开一个窗体
    openFrame: function (option) {
        option = $.extend(true, {
            name: 'name1',
            url: './page1.html',
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: api.winHeight
            },
            pageParam: {
                name: 'test'
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)',
            vScrollBarEnabled: true,
            hScrollBarEnabled: true
        }, option);
        api.openFrame(option);
    },
    //数据操作类
    data: {
        //存储数据
        set: function (key, val) {
            api.setPrefs({key: key,value: val});
            /*if (window.localStorage) {
                //this.del(key);
                window.localStorage.setItem(key, val);
            } else {
                //当前浏览器不支持 localStorage
            }*/
        },
        //获取数据
        get: function (key, moren) {
            var retStr = api.getPrefs({sync:true,key:key});
            if (retStr == undefined) retStr = '';
            if (retStr == null) retStr = '';
            //同步返回结果：
            return retStr;
            /*if (window.localStorage) {
                var retStr = '';
                retStr = window.localStorage.getItem(key);
                var mor = "";
                if (moren != undefined){
                    mor = moren;
                }
                if (retStr == null) retStr = mor;
                if (retStr == undefined) retStr = mor;
                return retStr;
            } else {
                //当前浏览器不支持 localStorage
            }
            return '';*/
        },
        //移除内存对象
        remove: function (key) {
            // window.localStorage.removeItem(key)
            api.removePrefs({
                key: key
            });
        },
        //转换int类型
        toInt: function (val, moren) {
            if (moren == undefined) moren = 0;
            if (val == undefined) return moren;
            var v = parseInt(val);
            if (isNaN(v)) v = moren;
            return v;
        },
        //转换成带小数点数字
        toFolat: function (_value1, _default) {
            if (_default == undefined) _default = 0;
            if (_value1 == undefined) return _default;
            var v = parseFloat(_value1);
            if (isNaN(v)) v = _default;
            return v;
        },
        //是否是数字
        isFinite: function (_value1) {
            var v = isFinite(_value1);
            return v;
        },
        //读取json对象
        JsonGet: function (obj, key, moren) {
            if (moren == undefined) moren = "";
            if (!this.is(obj, key)) {
                return moren;
            }
            return obj["" + key];
        },
        //是否存在节点
        is: function (obj, key) {
            return ("" + key in obj);
        },
        //设置监听
        jtset: function (name, data) {
            api.sendEvent({
                name: '' + name + '',
                extra: data
            });
        },
        //获取监听
        jtget: function (name, show) {
            api.addEventListener({
                name: name
            }, function (ret, err) {
                //alert(ret.value)
                if (api.systemType == 'android'){
                    show(ret.value);
                }else{
                    if(ret.value.indexOf("{")>=0 && ret.value.indexOf("}")>=0 && ret.value.indexOf(":")>=0){
                        show(JSON.parse(ret.value));
                    }else{
                        show(ret.value);
                    }
                }
            });
        },
        //移除监听
        jtremove: function (name) {
            api.removeEventListener({
                name: '' + name + ''
            });
        },
        //监听状态栏点击事件
        jtzhuangtailan: function (show) {
            api.addEventListener({
                name: 'noticeclicked'
            }, function (ret, err) {
                show(ret);
            });
        },
        /* 数组排序
         *  list  排序的数组
         *  key 排序依据字段
         *  n >= 0 正序 默认正序
         *  n < 0 倒序
         * */
        sort: function (list,key,n) {
            if (list == undefined){
                return [];
            }
            list.sort(function (a,b) {
                if (n == undefined || n >= 0){
                    if (key == undefined){
                        return a - b;
                    }else {
                        return a[key]-b[key];
                    }
                }else {
                    if (key == undefined){
                        return b - a;
                    }else {
                        return b[key]-a[key];
                    }
                }
            });
        }
    },
    //提示基础类
    ts: {
        //普通提示
        alert: function (opt) {
            opt = $.extend(true, {
                title: '温馨提示',
                msg: '',
                buttons: ['确定']
            }, function (ret, err) {

            }, opt);
            api.alert(opt);
        },
        //弹出带两个或三个按钮的confirm对话框
        confirm: function (opt, show) {
            opt = $.extend(true, {
                title: '温馨提示',
                msg: '',
                buttons: ['确定', '取消']
            }, opt);
            api.confirm(opt, function (ret, err) {
                var index = ret.buttonIndex;
                // index 从1 开始
                show(index, err);
            });
        },
        //带输入框的弹出框
        prompt: function (opt, show) {
            opt = $.extend(true, {
                title: '请输入',
                msg: '', //描述：（可选项）内容
                text: '', //描述：（可选项）输入框里面的默认内容
                type: 'text', //取值范围（text、password、number、email、url）
                buttons: ['确定', '取消']
            }, opt);
            api.prompt(opt, function (ret, err) {
                //var index = ret.buttonIndex;
                //var text = ret.text;
                show(ret, err);
            });
        },
        //定时提示框
        toast: function (Texts, Ms, Types) {
            if (Types == 's') {
                Types = "top";
            }
            if (Types == 'z') {
                Types = "middle";
            }
            if (Types == 'x') {
                Types = "bottom";
            }
            if (Types == undefined) {
                Types = "middle";
            }
            if (Ms == undefined) {
                Ms = jw.config.ms
            }
            api.toast({
                msg: '' + Texts + '',
                duration: Ms,
                location: '' + Types + ''
            });
        },
        //加载显示
        jiazaiShow: function (opt) {
            opt = $.extend(true, {
                style: 'default',
                animationType: 'fade',
                title: '加载中',
                text: '请耐心等待',
                modal: true
            }, opt);
            //api.showProgress(opt);
        },
        //加载隐藏
        jiazaiHide: function () {
            api.hideProgress();
        },
        //弹出菜单
        actionSheet: function (opt, show) {
            opt = $.extend(true, {
                title: '请选择',
                cancelTitle: '取消',
                destructiveTitle: '', //红色警告按钮
                buttons: []
            }, opt);
            api.actionSheet(opt, function (ret, err) {
                var index = ret.buttonIndex;
                show(index);
            });
        }
    },
    //设备操作类
    sb: {
        //获取当前应用缓存
        Gethuancun: function () {
            var size = api.getCacheSize({
                sync: true
            });
            size = (size / 1048576); //除以1MB 字节单位
            return size;
        },

        //删除所有缓存文件
        Deletehuancun: function () {
            api.clearCache(function () {
                jw.ts.toast('全部清理完成', jw.config.ms, "x");
            });
        },

        //获取当前手机号码
        getPhone: function () {
            var phoneNumber = api.getPhoneNumber({
                sync: true
            });
            return phoneNumber;
        },
        //设置应用图标右上角数字0清空
        tixinSum: function (sum) {
            var Su = jw.data.toInt(sum, 0);
            api.setAppIconBadge({
                badge: Su
            });
        },
        //系统类型
        systemType: function () {
            var systemType = api.systemType;
            return systemType;
        },
        //系统版本
        systembanben: function () {
            var systemVersion = api.systemVersion;
            return systemVersion;
        },
        //是否支持沉浸式
        statusBar: function () {
            var statusBarAppearance = api.statusBarAppearance;
            return statusBarAppearance;
        },
        //存放文件路径
        //iOS 平台下载的文件一般存放于该目录下，否则提交 AppStore 审核时可能会不通过，且此目录下的内容在手机备份时不会被备份
        SaveUrl: function () {
            var urls = api.cacheDir;
            return urls;
        },
        //头部沉浸式
        fixStatusBar: function (dom, show) {
            //获取系统类型
            var sysType = api.systemType;
            //获取当前版本
            var sv = api.systemVersion;
            var tops = 0;
            //是否支持沉浸式
            if (api.statusBarAppearance) {
                if (sysType == 'ios') {
                    //截取系统版本 第一位
                    var numSV = sv.split(".")[0];
                    //IOS 7 以上才有沉浸式的内增高动作
                    if (numSV >= 7 && !api.fullScreen && api.statusBarAppearance || numSV == 1) {
                        if (dom != undefined || dom != ""){
                            $(dom).css({ "padding-top": "19px" });
                        }
                        tops = 19;
                        if(numSV >= 11){
                            if (dom != undefined || dom != ""){
                                $(dom).css({ "padding-top": "30px" });
                            }
                            tops = 30;
                        }
                    }

                } else if (sysType == 'android') {
                    var _zhi = ('' + sv).replace(/\./g, '');
                    //android 4.4 以上才有沉浸式的内增高动作
                    if ((_zhi.length == 3 && _zhi >= 440) || (_zhi.length == 2 && _zhi >= 44)) {
                        if (dom != undefined || dom != ""){
                            $(dom).css({ "padding-top": "24px" });
                        }
                        tops = 24;
                    }
                    if (sv >= 9){
                        if (dom != undefined || dom != ""){
                            $(dom).css({ "padding-top": "24px" });
                        }
                        tops = 24;
                    }
                }
            }
            if (show != undefined) {
                show(tops);
            }
        },
        //网络设备监听
        wangluo: {
            //网络类型
            Type: function () {
                var connectionType = api.connectionType; //网络监听
                //		unknown 未知
                //		ethernet 以太网
                //		wifi wifi
                //		2g 2G网络
                //		3g 3G网络
                //		4g 4G网络
                //		none 无网络
                return connectionType;
            }
        },
        //底部边距监听
        dibujuliJT: function (m, show) {
            if (m == undefined) {
                m = 0;
            }
            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: m //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            }, function (ret, err) {
                show(true);
            });
        },
        //获取当前版本号
        banbenhao: function () {
            return api.appVersion;
        },
        //加载下拉
        xialaShow: function (opt, show) {
            opt = $.extend(true, {
                visible: true,
                loadingImg: 'widget://image/refresh.png',
                bgColor: '#ccc',
                textColor: '#fff',
                textDown: '下拉刷新...',
                textUp: '松开刷新...',
                showTime: true
            }, opt);

            api.setRefreshHeaderInfo(opt, function (ret, err) {
                show(ret, err);
            });
        },
        //隐藏加载下拉
        xialaHide: function () {
            api.refreshHeaderLoadDone();
        },
        /*
         * 真实路径
         * iOS系统，Android系统
         * 平台下载的文件一般存放于该目录下
         * 否则提交 AppStore 审核时可能会不通过，且此目录下的内容在手机备份时不会被备份
         */
        xiazailujing: function () {
            var cacheDir = api.cacheDir;
            return cacheDir;
        },

        /*
         *下载更新
         */
        xiazai: function (fun, banben) {
            var urls = "",
                Names = ""; //初始化

            //检测网络
            var wangluo = jw.sb.wangluo.Type(); //读取当前网络环境
            if (wangluo == "none") {
                jw.ts.toast("请连接网络后重试...");
                return;
            }

            //获取系统
            var xt = jw.sb.systemType();
            if (xt == "ios") {
                urls = jw.config.ios; //苹果下载地址
                Names = jw.config.iosName; //苹果声明
            }
            if (xt == "android") {
                urls = jw.config.Android; //安卓下载地址
                Names = jw.config.AndroidName; //安卓声明
            }

            //不能为空
            if (urls == "" || Names == "") {
                jw.ts.alert({
                    msg: '检测更新失败，请联系管理员。'
                });
                return;
            }

            //开始下载
            api.download({
                url: "" + urls,
                savePath: "" + jw.sb.xiazailujing() + "/" + Names, //本地真实路径+自定义名称 /aa.apk
                report: true, //下载过程是否上报
                cache: true, //是否使用本地缓存
                allowResume: true //是否允许断点续传
            }, function (ret, err) {
                fun(ret, err);
            });
        },
        //安装应用
        AnzhuangApp: function (url) {
            var xt = jw.sb.systemType(); //获取系统
            if (xt == "ios") {
                //iOS用法
                api.installApp({
                    appUri: url //安装包对应plist地址
                });
            }

            if (xt == "android") {
                //Android用法
                api.installApp({
                    appUri: url
                });
            }
        },
        //监听返回按钮
        JTfanhui: function (sbid, msgs, ms) {
            //在想关闭的页面添加监听按钮即可
            var mkeyTime = new Date().getTime();
            //需要添加按键的监听
            api.addEventListener({
                name: "keyback"
            }, function (ret, err) {
                api.closeWidget();
            });
            api.addEventListener({
                name: "keyback"
            }, function (ret, err) {
                //如果当前时间减去标志时间大于2秒，说明是第一次点击返回键，反之为2秒内点了2次，则退出。
                if ((new Date().getTime() - mkeyTime) > ms) {
                    mkeyTime = new Date().getTime();
                    api.toast({
                        msg: msgs,
                        duration: ms,
                        location: 'bottom'
                    });
                } else {
                    api.closeWidget({
                        id: sbid, //这里改成自己的应用ID
                        retData: {
                            name: 'closeWidget'
                        },
                        silent: true
                    });
                }

            });
        }
    },
    /* 日期操作 */
    Dt : {
        /* 日期、时间格式化 返回两位数 */
        geshi: function(d){
            if (d < 10){
                return "0"+d;
            }else {
                return d;
            }
        },
        /*
         * 传 time 返回指定时间
         * type="data" 或 type 为空 返回当前日期
         * type="time" 返回当前时间
         * type="datatime" 返回当前日期加时间
         */
        getNowdata: function (type,time) {
            var myDate = new Date();
            if (time != undefined && time != "") {
                myDate = new Date(time);
            }
            var year = myDate.getFullYear();
            var month = jw.Dt.geshi(myDate.getMonth() + 1);
            var date = jw.Dt.geshi(myDate.getDate());
            var Hours = jw.Dt.geshi(myDate.getHours())
            var Minutes = jw.Dt.geshi(myDate.getMinutes())
            var Seconds = jw.Dt.geshi(myDate.getSeconds())
            if (type == undefined || type == "data"){
                return year + "-" + month + "-" + date;
            }
            if (type == "datatime"){
                return year+"-"+month+"-"+date+" "+Hours+":"+Minutes+":"+Seconds;
            }
            if (type == "time"){
                return Hours+":"+Minutes+":"+Seconds;
            }
        },
        /* 获取星期 */
        getNowWeek: function () {
            var week = new Date().getDay();
            var list = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
            return list[week - 1];
        }
    },
    // 光标移到最后 使用click 触发事件
    setFocus: function (id) {
        var t=$("#"+id).val();
        $("#"+id).val("").focus().val(t);
    },
    // 获取文件后缀名
    getfiletype: function(filename) {
        var index1=filename.lastIndexOf(".");
        // console.log(index1)
        var index2=filename.length;
        // console.log(index2)
        var postf=filename.substring(index1,index2);//后缀名
        // console.log(postf)
        return postf;
    },
    //对比版本号  若curV大于reqV，则返回true
    compare: function(curV, reqV) {
        if (curV && reqV) {
            //将两个版本号拆成数字
            var arr1 = curV.split('.'),
                arr2 = reqV.split('.');
            var minLength = Math.min(arr1.length, arr2.length),
                position = 0,
                diff = 0;
            //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
            while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
                position++;
            }
            diff = (diff != 0) ? diff : (arr1.length - arr2.length);
            //若curV大于reqV，则返回true
            return diff > 0;
        } else {
            //输入为空
            console.log("版本号不能为空");
            return false;
        }
    },
    hasPermission:function(one_per){
        var perms = new Array();
	    	if(one_per){
	    		perms.push(one_per);
	    	}else{
	    		var prs = document.getElementsByName("p_list");
	            for(var i = 0; i < prs.length; i++){
		            if(prs[i].checked){
		            	perms.push(prs[i].value);
		            }
	         	}
	    	}
         	var rets = api.hasPermission({
         		list:perms
         	});
         	if(!one_per){
         		apialert('判断结果：' + JSON.stringify(rets));
         		return;
         	}
         	return rets;
    },
    reqPermission:function(one_per, callback){
      var perms = new Array();
      if(one_per){
        perms.push(one_per);
      }else{
        var prs = document.getElementsByName("p_list_r");
            for(var i = 0; i < prs.length; i++){
              if(prs[i].checked){
                perms.push(prs[i].value);
              }
          }
         }
        api.requestPermission({
          list: perms,
          code: 100001
        }, function(ret, err){
          if(callback){
            callback(ret);
            return;
          }
          var str = '请求结果：\n';
          str += '请求码: ' + ret.code + '\n';
          str += "是否勾选\"不再询问\"按钮: " + (ret.never ? '是' : '否') + '\n';
          str += '请求结果: \n';
          var list = ret.list;
          for(var i in list){
            str += list[i].name + '=' + list[i].granted + '\n';
          }
          apialert(str);
          console.log(JSON.stringify(ret));
        });
    },
    confirmPer:function(perm,callback){
        var has = jw.hasPermission(perm);
	    	if(!has || !has[0] || !has[0].granted){
          jw.reqPermission(perm,callback);
		    // 	api.confirm({
				//     title: '提醒',
				//     msg: '没有获得 ' + perm + " 权限\n是否前往设置？",
				//     buttons: ['去设置', '取消']
				// }, function(ret, err) {
				//     if(1 == ret.buttonIndex){
				//     	jw.reqPermission(perm);
				//     }
				// });
	    		//return false;
	    	}
	    	//return true;
    }
}
