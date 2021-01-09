//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" class="zui-loading zui-loadbox"></div>';
//呈现loading效果
document.write(_LoadingHtml);

//window.onload = function () {
//    var loadingMask = document.getElementById('loadingDiv');
//    loadingMask.parentNode.removeChild(loadingMask);
//};

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loadingDiv');
        loadingMask.parentNode.removeChild(loadingMask);
    }
};

/* 查看密码  显示隐藏值 */
+(function ($) {

    $.fn.changepassword = function (obj) {
        this.on("touchend",function () {
            var o = $(obj);
            var type = o.prop("type");
            if (type == "password"){
                o.prop("type","text");
            } else {
                o.prop("type","password");
            }
        })
    }
})($);


+(function ($) {
    var defaults;

    /*
     * 上传图片
     **/
    $.upload = function (url,option,callback) {
        var data = $.extend(true,{
            el: "",
            chose: 1,
            list: []
        },option);

        console.log(data.list);

        var formFile = new FormData();
        // formFile.append("action", "UploadVMKImagePath");
        if (data.chose == 1){
            var fileObj = document.getElementById(data.el).files[0]; // js 获取文件对象
            formFile.append("file", fileObj); //加入文件对象
        }else {
            var fileObj;
            // formFile.append("file", data.list); //加入文件对象
            for (var i=0;i<data.list.length;i++){
                fileObj = data.list[i];
                formFile.append("file"+i, fileObj); //加入文件对象
            }
        }
        // return false;

        //第二种 ajax 提交
        $.ajax({
            url: url,
            data: formFile,
            type: "Post",
            dataType: "json",
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success: function (ret1) {
                callback(ret1);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest)
                alert("上传失败");
            }
        });
    }

    $.imglist = function (params) {
        params = $.extend({}, defaults, params);

        function changeheight(){
            $(".zui-upload-img").each(function () {
                $(this).height($(this).width());
            });
        }
        //添加图片方法
        function additem(url,t,i) {
            var pr = $(".zui-upload-addbox").closest(".zui-upload");
            var html = "";
            if (t == 1){
                html += '<div class="zui-upload" data-type="1" data-i="'+i+'">'
            }else{
                html += '<div class="zui-upload" data-type="2" data-i="'+i+'">'
            }
            html += '<div class="zui-upload-del"></div>'
            html += '<div class="zui-upload-img" style="background-image: url('+url+')"></div></div>'
            pr.before(html);
            changeheight();
        }
        //初始化控件
        params.init = function(){
            var pb1 = $.photoBrowser({
                items: params.list
            });
            // 添加控件
            var html = '<div class="zui-uploader"><div class="zui-upload"><label class="zui-upload-img zui-upload-addbox">';
            if(params.iswx != true){
                html+= '<input hidden="hidden" multiple="true" type="file" accept="image/*" class="zui-fileinput" name="pic"/>';
            }
            html += '</label></div></div>'
            $(params.el).html(html);
            //初始化图片
            for (var i=0;i<params.initlist.length;i++){
                additem(params.initlist[i],1,i);
            }
            changeheight();
        }
        params.init();
        params.clear = function(){
            params.list = [];
            params.init();
        }
        params.wxRfresh = function(){
            params.init();
            for(var i=0;i<params.list.length;i++){
                additem(params.list[i],2,i);
            }
        }
        params.Refresh = function(){
            params.init();
            var file;
            var reader;
            var i = 0,l=params.list.length;
            function add() {
                file = params.list[i];
                reader = new FileReader();
                reader.onload = function ( event ) {
                    var txt = event.target.result;
                    additem(txt,2,i);
                    i++;
                    if (i<l){
                        add();
                    }
                    changeheight();
                }
                reader.readAsDataURL( file );
            }
            if (l > 0){
                add();
            }
        }

        window.onresize = function () {
            $(".zui-upload-img").each(function () {
                changeheight();
            });
        }
        changeheight();

        $(document).on("change",".zui-fileinput",function (e) {
            var _this = $(this);
            var files = e.target.files;
            var file;
            for (var i=0;i<files.length;i++){
                file = files[i]
                params.list.push(file);
            }
            _this.val("");
            params.Refresh();
        });
        $(document).on("touchend",".zui-upload-del",function () {
            var type = $(this).closest(".zui-upload").data("type");
            var i = $(this).closest(".zui-upload[data-type="+type+"]").data("i");
            if (type == 2){
                params.list.splice(i,1);
            }else if(type == 1){
                params.initlist.splice(i,1);
            }else{
                params.wxlist.splice(i,1);
            }
            $(this).closest(".zui-upload").remove();
        });

        $(document).on("touchend",".zui-upload-img",function () {
            if(!$(this).hasClass("zui-upload-addbox")){
                params.imgclick(params);
            }
        });
        console.log(params.iswx);
        if(params.iswx == true){
            $(document).on("touchend",".zui-upload-addbox",function () {
                console.log(params.iswx);
                params.addclick(params);
            });
        }
    };

    defaults = $.imglist.prototype.defaults = {
        el: "",
        list: [],
        "iswx": false,
        initlist: [],
        wxlist: [],
        wxRfresh: function(){},
        Refresh: function(){},
        init : function(){},
        clear: function(){},
        addtouchend: function(){},
        imgclick: function(){}
    }
    $.imglistclear = function(){
        defaults.list = [];
        defaults.clear();
    }

    $.posttext = function (text) {
        if (text == undefined){
            return ""
        }else {
            return text
        }
    }
})($);


+(function ($) {
    var defaults;

    $.fn.imglist = function(option){
        var params = $.extend({}, defaults, option);
        return this.each(function () {
            if (!this) return;
            var $this = $(this);

            params.index = 0;

            function changeheight(){
                $(".zui-upload-img").each(function () {
                    $(this).height($(this).width());
                });
            }
            //添加图片方法
            function additem(url) {
                var pr = $(".zui-upload-addbox").closest(".zui-upload");
                var html = "";
                html += '<div class="zui-upload" data-i="'+params.index+'">'
                html += '<div class="zui-upload-del"></div>'
                var srcurl = url;
                if(srcurl.indexOf("http") == -1){
                    srcurl = jw.config.ip0+srcurl;
                }
                html += '<div class="zui-upload-img" style="background-image: url('+srcurl+')"></div></div>'
                pr.before(html);
                params.index++;
                changeheight();
            }

            //初始化控件
            var init = function(){
                // 添加控件
                var html = '<div class="zui-uploader"><div class="zui-upload"><label class="zui-upload-img zui-upload-addbox">';
                if(params.isother != true){
                    html+= '<input hidden="hidden" multiple="true" type="file" accept="image/*" class="zui-fileinput" name="pic"/>';
                }
                html += '</label></div></div>'
                $this.html(html);
                //初始化图片
                for (var i=0;i<params.list.length;i++){
                    additem(params.list[i]);
                }
                changeheight();
                //初始化完成后执行
                params.init(params);
            }
            params.zinit = function(){
                init();
            }
            init();
            params.clear = function(){
                params.list = [];
                params.filelist = [];
                init();
            }

            window.onresize = function () {
                $(".zui-upload-img").each(function () {
                    changeheight();
                });
            }

            var Refresh = function(){
                var file;
                var reader;
                var i = 0,l=params.addfilelist.length;
                function add() {
                    file = params.addfilelist[i];
                    reader = new FileReader();
                    reader.onload = function ( event ) {
                        var txt = event.target.result;
                        params.list.push(txt);
                        params.filelist.push(file);
                        additem(txt);
                        i++;
                        if (i<l){
                            add();
                        }else{
                            params.addfilelist = [];
                        }
                        changeheight();
                    }
                    reader.readAsDataURL( file );
                }
                if (l > 0){
                    add();
                }
            }

            $(document).on("change",".zui-fileinput",function (e) {
                e.stopPropagation();
                console.log(e.target.files);
                var _this = $(this);
                var files = e.target.files;
                var file;
                for (var i=0;i<files.length;i++){
                    file = files[i]
                    params.addfilelist.push(file);
                }
                _this.val("");
                Refresh();
            });
            $(document).on("touchend",".zui-upload-del",function (e) {
                e.stopPropagation();
                var index = $(this).closest(".zui-upload").index();
                params.list.splice(index,1);
                if (params.isother == true) {
                    $(this).closest(".zui-upload").remove();
                }else{
                    init();
                }
                params.delfun(params);
            });

            $(document).on("touchend",".zui-upload-img",function (e) {
                e.stopPropagation();
                if(!$(this).hasClass("zui-upload-addbox")){
                    params.imgclick(params);
                }
            });
            if(params.isother == true){
                $(document).on("touchend",".zui-upload-addbox",function (e) {
                    e.stopPropagation();
                    console.log(params.isother);
                    params.addclick(params);
                });
            }
        })

    }

    defaults = $.imglist.prototype.defaults = {
        list: [], // 图片列表
        filelist: [], // 图片文件列表
        addfilelist: [],
        isother: false,
        init : function(){},
        addclick: function(){},
        imgclick: function(){},
        delfun: function () {}
    }
})($);


+ function($) {
    "use strict";
    var defaults;

    $.fn.z_select = function(option){
        return this.each(function () {
            if (!this) return;
            var $this = $(this);

            function createselect() {
                $this.addClass('z-select');
                var html = '<div class="z-select-text"></div><div></div>'
                $this.html()
            }

        })
    }

    $.fn.z_select.prototype = {
        option: {
            list: [],
        }
    }

}($);

+ function($) {
    "use strict";
    var defaults;

    //创建
    function create($this,params) {

        var html = '<div id="numberkeyobj" class="z-popup" style="display: none;">\n' +
            '        <div class="z-popup_modal popup-bottom">\n' +
            '            <div class="z-keywords__password">\n' +
            '                <div class="z-numberkey onkey">1</div>\n' +
            '                <div class="z-numberkey onkey">2</div>\n' +
            '                <div class="z-numberkey onkey">3</div>\n' +
            '                <div class="z-numberkey onkey">4</div>\n' +
            '                <div class="z-numberkey onkey">5</div>\n' +
            '                <div class="z-numberkey onkey">6</div>\n' +
            '                <div class="z-numberkey onkey">7</div>\n' +
            '                <div class="z-numberkey onkey">8</div>\n' +
            '                <div class="z-numberkey onkey">9</div>\n' +
            '                <div class="z-numberkey"></div>\n' +
            '                <div class="z-numberkey onkey">0</div>\n' +
            '                <div class="z-numberkey iconfont icon-del ondel"></div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'
        $("body").append(html);

        $this.addClass('mimabox2 zui-row zui-row-center clearfix');
        var list = '<div class="nimainput zui-col"></div>\n' +
            '<div class="nimainput zui-col"></div>\n' +
            '<div class="nimainput zui-col"></div>\n' +
            '<div class="nimainput zui-col"></div>\n' +
            '<div class="nimainput zui-col"></div>\n' +
            '<div class="nimainput zui-col"></div>'
        $this.html(list)
        var fw = $this.find(".nimainput").width();
        $this.find(".nimainput").height(fw).css({
            "font-size": fw*0.8+"px",
            "line-height": fw+"px"
        });
        $("#numberkeyobj").find(".z-popup_modal").on("touchend",function (e) {
            e.stopPropagation();
        });


        $("#numberkeyobj").find(".onkey").on("touchend",function () {
            var t = $(this).text();
            if (t == undefined || t == "undefined") {
                t = "";
            }
            var text =  params.value;
            if (params.value == undefined || params.value == "params.value") {
                params.value = "";
                text = "";
            }
            var l = text.length;
            if (text.length < 6) {
                text = text+t.toString();
                $this.find(".nimainput").eq(l).text("*");
                params.value = text;
            }
            if (text.length >= 6) {
                params.onend(text,params);
            }
            var list = text.split("");

            params.onchange(params.value,params);
        });
        $("#numberkeyobj").find(".ondel").on("touchend",function () {
            var text =  params.value;
            text=text.substring(0,text.length-1);
            var l = text.length;
            $this.find(".nimainput").eq(l).text("");
            params.value = text;
            params.onchange(params.value,params);
        });
    }

    $.fn.mimakeywords = function(params){
        return this.each(function () {
            if (!this) return;
            var $this = $(this);

            params = $.extend({}, defaults, params || {})
            create($this,params,params.obj);

            params.close = function(){
                $("#numberkeyobj").hide();
                $this.find(".nimainput").each(function () {
                    $(this).text("");
                })
                params.value = "";
            }
            var id  = $this.attr("id");
            $(document).on("touchend","#"+id,function (e) {
                e.stopPropagation();
                $("#numberkeyobj").show();
            });
        })
    }

    defaults = {
        type: "password-n",
        value: "",
        onchange: function () {},
        onend: function () {}
    }
}($);

/* 交易码 */
+ function($) {
    "use strict";
    var defaults;
    //创建
    function createjiaoyibox(params) {
        var html = '<div id="jiaoyipop" class="z-popup" style="display: none;">\n' +
            '        <div class="z-popup_modal zui-row zui-row-column" style="bottom: 0;top: auto;">\n' +
            '            <div class="footer_btn bg-red color-white">请输入交易码</div>\n' +
            '            <div class="zui-col">\n' +
            '                <div id="jiaoyibox" class="mimabox clearfix">\n' +
            '                    <div class="nimainput"></div>\n' +
            '                    <div class="nimainput"></div>\n' +
            '                    <div class="nimainput"></div>\n' +
            '                    <div class="nimainput"></div>\n' +
            '                    <div class="nimainput"></div>\n' +
            '                    <div class="nimainput"></div>\n' +
            '                    <input id="jiaoyi" type="number" name="jiaoyi" value="">\n' +
            '                    <input id="jiaoyit2" type="checkbox" value="">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="z-keywords__password">\n' +
            '                <div class="z-numberkey onkey">1</div>\n' +
            '                <div class="z-numberkey onkey">2</div>\n' +
            '                <div class="z-numberkey onkey">3</div>\n' +
            '                <div class="z-numberkey onkey">4</div>\n' +
            '                <div class="z-numberkey onkey">5</div>\n' +
            '                <div class="z-numberkey onkey">6</div>\n' +
            '                <div class="z-numberkey onkey">7</div>\n' +
            '                <div class="z-numberkey onkey">8</div>\n' +
            '                <div class="z-numberkey onkey">9</div>\n' +
            '                <div class="z-numberkey"></div>\n' +
            '                <div class="z-numberkey onkey">0</div>\n' +
            '                <div class="z-numberkey iconfont icon-del ondel"></div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="z-popup_bg"></div>\n' +
            '    </div></div>'
        $("body").append(html);

        $("#jiaoyipop").on("click"," .z-popup_bg",function (e) {
            e.stopPropagation();
            setTimeout(function () {
                $("#jiaoyipop").hide();
            },300);
        })

        $(document).on("click","#jiaoyibox .nimainput",function () {
            $("#jiaoyi").focus();
        });

        var obj = {};
        Object.defineProperty(obj,'jiaoyi',{
            set:function(val){
                document.getElementById('jiaoyi').value = val;
                var text = val;
                var list = text.split("");
                if (text.length > 6) {
                    var laststr = list[list.length-1];
                    list.pop();
                    list[5] = laststr;

                    text = "";
                    for (var i in list) {
                        text += list[i];
                    }
                    $(this).val(text);
                }
                if (text.length >= 6) {
                    $("#jiaoyit2").focus();
                    params.onend(text,params);
                    list = []
                    text = "";
                    document.getElementById('jiaoyi').value = "";
                }

                $("#jiaoyibox").find(".nimainput").each(function (index, item) {
                    if (list[index] == undefined){
                        $(this).text("");
                    } else{
                        $(this).text(list[index]);
                    }
                });
            }
        });
        document.getElementById('jiaoyi').onkeyup = function(e){
            obj.jiaoyi = e.target.value;
        };
        obj.jiaoyi = "";

    }

    //判断是否为苹果
    function objBlur(id,time){
        if(typeof id != 'string') throw new Error('objBlur()参数错误');
        var obj = document.getElementById(id),
            time = time || 300,
            docTouchend = function(event){
                if(event.target!= obj){
                    setTimeout(function(){
                        obj.blur();
                        document.removeEventListener('touchend', docTouchend,false);
                    },time);
                }
            };
        if(obj){
            obj.addEventListener('focus', function(){
                document.addEventListener('touchend', docTouchend,false);
            },false);
        }else{
            throw new Error('objBlur()没有找到元素');
        }
    }

    $.fn.jiaoyibox = function(params){
        return this.each(function () {
            if (!this) return;

            var $this = $(this);
            params = $.extend({}, this.defaults, params || {})

            params.clear = function(){
                $("#jiaoyibox").find(".nimainput").each(function () {
                    $(this).text("");
                });
                $("#jiaoyi").val("");
                var input = new objBlur('jiaoyi');
                input=null;
                $("#jiaoyipop").hide();
            }
            createjiaoyibox(params);
            var id  = $this.attr("id");
            $(document).on("touchend","#"+id,function () {
                params.clear();
                $("#jiaoyipop").show();
            });

        })
    }

    $.jiaoyiboxshow = function(params){
        params = $.extend({}, this.defaults, params || {})

        params.clear = function(){
            $("#jiaoyibox").find(".nimainput").each(function () {
                $(this).text("");
            });
            $("#jiaoyi").val("");
            $("#jiaoyipop").hide();
        }
        if($("#jiaoyipop").length  == 0){
            createjiaoyibox(params);
        }
        params.clear();
        $("#jiaoyipop").show();
    }

    defaults = {
        onend: function () {}
    }

}($);

+ function($) {
    "use strict";
    var defaults;

    var formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
    }

    var Datetime = function(input, params) {
        this.input = $(input);
        this.params = params || {};

        this.initMonthes = params.monthes

        this.initYears = params.years

        var p = $.extend({}, params, this.getConfig());
        $(this.input).picker(p);
    }

    Datetime.prototype = {
        getConfig: function() {
            var today = new Date(),
                params = this.params,
                self = this,
                lastValidValues;
            var config = {
                rotateEffect: false,  //为了性能
                cssClass: 'datetime-picker',

                value: [today.getFullYear(), formatNumber(today.getMonth()+1)],

                formatValue: function (p, values, displayValues) {
                    return self.params.format(p, values, displayValues);
                },

                cols: [
                    {
                        values: this.initYears
                    },
                    {
                        divider: true,  // 这是一个分隔符
                        content: params.yearSplit
                    },
                    {
                        values: this.initMonthes
                    }
                ]
            }
            var inputValue = this.input.val();
            if(inputValue) config.value = params.parse(inputValue);
            if(this.params.value) {
                this.input.val(this.params.value);
                config.value = params.parse(this.params.value);
            }
            return config;
        }
    }

    $.fn.yearmouth = function (params) {
        params = $.extend({}, defaults, params);
        return this.each(function() {
            if(!this) return;
            var $this = $(this);
            var datetime = $this.data("datetime");
            if(!datetime) $this.data("datetime", new Datetime(this, params));
            return datetime;
        });
    }

    defaults = $.fn.yearmouth.prototype.defaults = {
        input: undefined, // 默认值
        yearSplit: '-',
        monthes: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
        years: (function () {
            var arr = [];
            for (var i = 1950; i <= 2030; i++) { arr.push(i); }
            return arr;
        })(),
        format: function (p, values) { // 数组转换成字符串
            return p.cols.map(function (col) {
                return col.value || col.content;
            }).join('');
        },
        parse: function (str) {
            // 把字符串转换成数组，用来解析初始值
            // 如果你的定制的初始值格式无法被这个默认函数解析，请自定义这个函数。比如你的时间是 '子时' 那么默认情况这个'时'会被当做分隔符而导致错误，所以你需要自己定义parse函数
            // 默认兼容的分隔符
            var t = str.split(this.datetimeSplit);
            return t[0].split(/\D/).concat(t[1].split(/:|时|分|秒/)).filter(function (d) {
                return !!d;
            })
        }
    }
}($);


// 调用方式
// $("div").pluginName({...});  // 初始化
// $("div").pluginName("publicMethod");  // 调用方法

// $(".selector").pluginName({
//     text : "hello world!"
// });

/* 日期操作 */
var zDate = {
    /* 日期、时间格式化 返回两位数 */
    twotimefun: function(d){
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
    getNowdata: function (type,dtime) {
        var myDate = new Date();
        var ftime = dtime;
        if (ftime != undefined && ftime != "") {
            if(typeof(ftime) == "string" && ftime.indexOf("T") != -1 )
            {
                ftime = ftime.replace(/T/," ");
                ftime = ftime.split(".")[0];
            }
            if(typeof(ftime) == "string" && ftime.indexOf("-") != -1){
                ftime = ftime.replace(/-/g,"/");
            }
            myDate = new Date(ftime);
        }
        var year = myDate.getFullYear();
        var month = zDate.twotimefun(myDate.getMonth() + 1);
        var date = zDate.twotimefun(myDate.getDate());
        var Hours = zDate.twotimefun(myDate.getHours())
        var Minutes = zDate.twotimefun(myDate.getMinutes())
        var Seconds = zDate.twotimefun(myDate.getSeconds())
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
    },
    /* 秒转成 时分秒 */
    formatSeconds: function(value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if(theTime > 60) {
            theTime1 = parseInt(theTime/60);
            theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
                theTime2 = parseInt(theTime1/60);
                theTime1 = parseInt(theTime1%60);
            }
        }
        var result;
        if (theTime > 0){
            result = zDate.twotimefun(parseInt(theTime));
        }else {
            result = "00"
        }
        if(theTime1 > 0) {
            result = zDate.twotimefun(parseInt(theTime1))+":"+result;
        }else {
            result = "00:"+result;
        }
        if(theTime2 > 0) {
            result = zDate.twotimefun(parseInt(theTime2))+":"+result;
        }else {
            result = "00:"+result;
        }
        return result;
    },
    getlastday: function (date,length) {
        function geshi(data) {
            var a = data;
            if (a<10){
                a = "0"+a;
            }
            return a;
        }
        var data1 = new Date(date);
        data1.setDate(data1.getDate()+length);
        return data1.getFullYear()+"-"+geshi(data1.getMonth()+1)+"-"+geshi(data1.getDate());
    },
    getdatalength: function (data1,data2) {
        var l = Math.abs(new Date(zDate.getNowdata("data",data1)) - new Date(zDate.getNowdata("data",data2)))/86400000;
        return l;
    },
    writetime: function(ctime){
        var cdata = zDate.getNowdata("data",ctime);
        var ctime = zDate.getNowdata("time",ctime);
        var ndata = zDate.getNowdata("data");
        var l = zDate.getdatalength(cdata,ndata);
        if (l == 0){
            return ctime;
        }
        if (l == 1){
            return "昨天";
        }
        if (l == 2){
            return "前天";
        }
        return cdata;
    },
    // 到期时间
    expireTime: function(expires){
        if(expires > 0){
            var second = expires;
            if (expires > 100000000){
                expires = expires/1000;
                second = expires;
            }
        }
        else{
            var second = "0 分";
            return second;
        }
        var day = hour = min = "";
        if(second>86400){
            day = Math.floor(second/86400)+"天 ";
            second = second%86400;
        }
        if(second>3600){
            hour = Math.floor(second/3600)+"时 ";
            second = second%3600;
        }
        if(second>60){
            min = Math.floor(second/60)+"分 ";
            second = second%60;
        }
        second = second.toFixed(0)+"秒";
        return day+hour+min+second;
    },
    expireTimehoures: function(d){
    },
    getendtime: function (data) {
        var nowtime = new Date();
        var endtime = new Date(data)
        var l = endtime-nowtime;
        var a = zDate.expireTime(l);
        return a;
    },
    getendtimehoures: function (data) {
        var date1= new Date();  //开始时间

        var date2= new Date(data.replace(/-/g, "/"));    //结束时间
        var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数

        //计算出相差天数
        var days=Math.floor(date3/(24*3600*1000))

        //计算出小时数

        var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))
        //计算相差分钟数
        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))
        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        // var text = " 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒";

        if(days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0){
            var text = (days*24+hours)+"小时"+minutes+"分"+seconds+"秒";
            return text;
        }else{
            return 0
        }
    }
}
