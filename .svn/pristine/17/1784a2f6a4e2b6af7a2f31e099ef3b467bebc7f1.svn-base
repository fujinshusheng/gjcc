
// 自定义过滤器
Vue.filter('url', function (value) {
    if (value != undefined && value != "") {
        if (value.indexOf("http") == -1){
            return jw.config.imagesUrl+value;
        } else{
            return value;
        }
    }
})

// 自定义过滤器
Vue.filter('filtName', function (str) {
    if (null != str && str != undefined) {
        return str.substring(0, 1) + "**";
    } else {
        return "";
    }
})

// 自定义过滤器
Vue.filter('htmlsrc', function (value) {
    if (value != undefined && value != "") {
        var a = value.replace(/src='\/upload/g,"src='"+jw.config.imagesUrl+"\/upload")
        return a
    }
})

// 自定义过滤器
Vue.filter('datatime', function (value) {
    return zDate.getNowdata("datatime",value);
})

// 自定义过滤器
Vue.filter('data', function (value) {
    return zDate.getNowdata("data",value);
})

// 自定义过滤器
Vue.filter('time', function (value) {
    return zDate.getNowdata("time",value);
})

// 自定义过滤器
Vue.filter('sptime', function (value) {
    return zDate.writetime(value);
})

Vue.prototype.htmlsrc= function (value) {
    if (value != undefined && value != "") {
        var a = value.replace(/src='\/upload/g,"src='"+jw.config.imagesUrl+"\/upload")
        return a
    }
};
// 保留第一位字符，后面用*表示
Vue.prototype.stringlf= function (name) {
    var rex = /^[^\x00-\xff]|^[A-Za-z0-9]/
    if (rex.test(name)) {
        var t = name.replace(/(^[^\x00-\xff]|^[A-Za-z0-9])(.*)/,"$1******")
        return t
    }
    return name
};

Vue.prototype.shenpicontent= function (value) {
    if (value!= undefined){
        var li = value.split("\n");
        var html = "";
        for(var i=0;i<li.length;i++){
            html+= "<p class='count'>"+li[i]+"</p>"
        }
        return html
    }
};

Vue.prototype.getbgimg = function (value) {
    if (value == undefined || value == ""){
        return 'background-image: url("../../res/loading.gif")'
    } else {
        if (value.indexOf("http") == -1){
            return 'background-image: url('+jw.config.imagesUrl+value+')';
        }else {
            return 'background-image: url('+value+')';
        }
    }
};

Vue.prototype.imgsrcfilter = function (value) {
    if (value == undefined || value == ""){
        return "../../res/loading.gif"
    } else {
        if (value.indexOf("http") == -1){
            return jw.config.imagesUrl+value
        }else {
            return value;
        }
    }
};

Vue.prototype.isnull = function (value) {
    if (value == undefined || value == null || value === ""){
        return true
    } else{
        return false
    }
};

function vueTouch(el,binding,type){
    var _this=this;
    this.obj=el;
    this.binding=binding;
    this.touchType=type;
    this.vueTouches={x:0,y:0};
    this.vueMoves=true;
    this.vueLeave=true;
    this.longTouch=true;
    this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
    this.obj.addEventListener("touchstart",function(e){
        _this.start(e);
    },false);
    this.obj.addEventListener("touchend",function(e){
        _this.end(e);
    },false);
    this.obj.addEventListener("touchmove",function(e){
        _this.move(e);
    },false);
};
vueTouch.prototype={
    start:function(e){
        this.vueMoves=true;
        this.vueLeave=true;
        this.longTouch=true;
        this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
        this.time=setTimeout(function(){
            if(this.vueLeave&&this.vueMoves){
                this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
                this.longTouch=false;
            };
        }.bind(this),1000);
    },
    end:function(e){
        var disX=e.changedTouches[0].pageX-this.vueTouches.x;
        var disY=e.changedTouches[0].pageY-this.vueTouches.y;
        clearTimeout(this.time);
        if(Math.abs(disX)>10||Math.abs(disY)>100){
            this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);
            if(Math.abs(disX)>Math.abs(disY)){
                if(disX>10){
                    this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);
                };
                if(disX<-10){
                    this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);
                };
            }else{
                if(disY>10){
                    this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);
                };
                if(disY<-10){
                    this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);
                };
            };
        }else{
            if(this.longTouch&&this.vueMoves){
                this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
                this.vueLeave=false
            };
        };
    },
    move:function(e){
        this.vueMoves=false;
    }
};
Vue.directive("tap",{
    bind:function(el,binding){
        new vueTouch(el,binding,"tap");
    }
});
Vue.directive("swipe",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipe");
    }
});
Vue.directive("swipeleft",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipeleft");
    }
});
Vue.directive("swiperight",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swiperight");
    }
});
Vue.directive("swipedown",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipedown");
    }
});
Vue.directive("swipeup",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipeup");
    }
});
Vue.directive("longtap",{
    bind:function(el,binding){
        console.log(JSON.stringify(binding))
        new vueTouch(el,binding,"longtap");
    }
});

// Vue.getbgimg = function (value) {
//     return 'background-image: url('+value+')';
// }


/*
 *  <z-addbox :number="mynum" v-on:rdata="mynum=$event"></z-addbox>
 * */
Vue.component('z-addbox', {
    props: ['number','max'],
    data: function () {
        return {
            num: this.Fnumber || 1
        }
    },
    computed: {

    },
    watch: {
        number: function (n,o) {
            if (n > 0) {
                this.num = n;
            }else {
                this.num = 1;
            }
        }
    },
    template: '<div class="zui-row zui-row-center zui-addbox">\n' +
    '            <span class="iconfont icon-add" @click="add()"></span>\n' +
    '            <input class="addbox_input zui-col" v-model="num" type="number">\n' +
    '            <span class="iconfont icon-jian" @click="less()"></span>\n' +
    '        </div>',
    created: function () {
        var _this = this;

    },
    methods: {
        add: function(){
            var _this = this;
            if (_this.num == undefined || _this.num == null || _this.num == "") {
                _this.num = 1;
            }else{
                if (_this.max != undefined && _this.max != null) {
                    if (_this.num < _this.max){
                        _this.num = parseInt(_this.num)+1;
                    }
                }else {
                    _this.num = parseInt(_this.num)+1;
                }
            }
            _this.postdata();
        },
        less: function(){
            var _this = this;
            if (_this.num == undefined || _this.num == null || _this.num == "") {
                _this.num = 1;
            }else{
                if (_this.num > 1) {
                    _this.num = parseInt(_this.num)-1;
                }
            }
            _this.postdata();
        },
        postdata: function () {
            var _this = this;
            _this.$emit("rdata", _this.num);
        }
    }
});


/*
 * <z-city :edit="false" :fcountry="FCountry" :fprovince="FProvince" :fcity="FCity" v-on:rdata="text = $event"></z-city>
 * */
Vue.component('z-city', {
    props: ["fcountry","fprovince","fcity","edit"],
    data: function () {
        return {
            isedit: this.edit,
            CountryRegion: {},
            CountryRegiontxt: "",
            CountryRegionlist: [],
            State: {},
            Statetxt: "",
            Statelist: [],
            City: {},
            Citytxt: "",
            Citylist: [],
            Region: {},
            Regiontxt: "",
            Regionlist: [],
            FCountry: this.fcountry,
            FProvince: this.fprovince,
            FCity: this.fcity,
        }
    },
    computed: { },
    watch: {
        fcountry: function (n,o) {
            this.FCountry = n;
            this.initdata()
        },
        fprovince: function (n,o) {
            this.FProvince = n;
            this.initdata()
        },
        fcity: function (n,o) {
            this.FCity = n;
            this.initdata()
        },
        edit: function (n,o) {
            this.isedit = n;
        }
    },
    template: '<div class="zui-list inlist">\n' +
        '            <div class="zui-item zui-row zui-row-center">\n' +
        '                <div class="title">归属地</div>' +
        '                <div v-show="!isedit" class="text-right text zui-col">{{CountryRegiontxt}}&nbsp;{{Statetxt}}&nbsp;{{Citytxt}}</div>\n' +
        '                <select class="zui-col select" v-model="CountryRegion" @change="changefun(\'CountryRegion\',CountryRegion)" v-show="isedit" v-cloak>\n' +
        '                    <option value="">请选择国家</option>\n' +
        '                    <option :value="item" v-for="item in CountryRegionlist">{{item.Name}}</option>\n' +
        '                </select>\n' +
        '                <select class="zui-col select" v-model="State" @change="changefun(\'State\',State)"  v-show="isedit && Statelist.length > 0" v-cloak>\n' +
        '                    <option value="">请选择省</option>\n' +
        '                    <option :value="item" v-for="item in Statelist">{{item.Name}}</option>\n' +
        '                </select>\n' +
        '                <select class="zui-col select" v-model="City" @change="changefun(\'City\',City)"  v-show="isedit && Citylist.length > 0" v-cloak>\n' +
        '                    <option value="">请选择城市</option>\n' +
        '                    <option :value="item" v-for="item in Citylist">{{item.Name}}</option>\n' +
        '                </select>\n' +
        '                <select class="zui-col select" v-model="Region" @change="changefun(\'Region\',Region)"  v-show="isedit && Regionlist.length > 0" v-cloak>\n' +
        '                    <option value="">请选择地区</option>\n' +
        '                    <option :value="item" v-for="item in Regionlist">{{item.Name}}</option>\n' +
        '                </select>\n' +
        '            </div>\n' +
        '        </div>',
    created: function () {
        var _this = this;
        _this.getcity();
    },
    methods: {
        getcity: function () {
            var _this = this;
            $.getJSON('../../js/city.json',{},function (ret) {
                //alert(ret.Location.CountryRegion.length)
                _this.CountryRegionlist = ret.Location.CountryRegion;
                _this.initdata();
            });
        },
        initdata: function(){
            if (this.FCountry){
                for (var i=0;i<this.CountryRegionlist.length;i++) {
                    if (this.CountryRegionlist[i].Name == this.FCountry) {
                        this.CountryRegion = this.CountryRegionlist[i];
                        this.changefun('CountryRegion',this.CountryRegionlist[i]);

                        if (this.FProvince && this.Statelist.length > 0){
                            for (var a=0;a<this.Statelist.length;a++) {
                                if (this.Statelist[a].Name == this.FProvince) {
                                    this.State = this.Statelist[a];
                                    this.changefun('State',this.Statelist[a]);
                                }
                            }
                        }

                        if (this.FCity && this.Citylist.length > 0){
                            for (var b=0;b<this.Citylist.length;b++) {
                                if (this.Citylist[b].Name == this.FCity) {
                                    this.City = this.Citylist[b];
                                    this.changefun('City',this.Citylist[b]);
                                }
                            }
                        }

                        break;
                    }
                }
            }
        },
        changefun: function(ftype,data){
            if (ftype == "CountryRegion") {
                this.CountryRegiontxt = data.Name;
                this.Statelist = [];
                this.Statetxt = "";
                this.Citylist = [];
                this.Citytxt = "";
                this.Regionlist = [];
                this.Regiontxt = "";
            }
            if (ftype == "State"){
                this.Statetxt = data.Name;
                this.Citylist = [];
                this.Citytxt = "";
                this.Regionlist = [];
                this.Regiontxt = "";
            }
            if (data.State != undefined && typeof data.State == "object") {
                if (data.State.length > 0){
                    this.Statelist = data.State;
                } else {
                    this.Statelist = [];
                    this.Statetxt = "";
                    if (data.State.City != undefined) {
                        this.Citylist = data.State.City;
                    }
                }
            }

            if (ftype == "City"){
                this.Citytxt = data.Name;
                this.Regionlist = [];
                this.Regiontxt = "";
            }
            if (data.City != undefined) {
                this.Citylist = data.City;
            }
            if (ftype == "Region"){
                this.Regiontxt = data.Name;
            }
            if (data.Region != undefined) {
                this.Regionlist = data.Region;
            }
            this.postdata();
        },
        postdata: function () {
            var _this = this;
            var mydata = {
                FCountry: _this.CountryRegiontxt, // 国
                FProvince: _this.Statetxt, // 省
                FCity: _this.Citytxt, // 市
            }
            _this.$emit("rdata", mydata);
        }
    }
});


/*
 *  <jiaoyima v-show="isshow" v-on:rdata="number = $event" v-on:hide="isshow=false"></jiaoyima>
 * */
Vue.component('jiaoyima', {
    props: [],
    data: function () {
        return {
            number: "",
            length: 0,
        }
    },
    computed: {

    },
    watch: {

    },
    template: '<div id="jiaoyipop" class="z-popup">\n' +
        '            <div class="z-popup_modal zui-row zui-row-column" style="bottom: 0;top: auto;">\n' +
        '                <div class="bg-red color-white zui-row zui-row-center" style="padding: 10px;">' +
        '                    <div class="zui-col text-left">请输入交易码</div>  ' +
        '                    <div class="z-btn z-btn-s" @click="qrbtn()" style="background: #a61f24">确定</div>' +
        '                </div>\n' +
        '                <div class="zui-col">\n' +
        '                    <div id="jiaoyibox" class="mimabox clearfix">\n' +
        '                        <div class="nimainput" v-for="i in length">*</div>\n' +
        '                        <div class="nimainput" v-for="i in (6-length)"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="z-keywords__password">\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(1)">1</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(2)">2</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(3)">3</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(4)">4</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(5)">5</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(6)">6</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(7)">7</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(8)">8</div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(9)">9</div>\n' +
        '                    <div class="z-numberkey"></div>\n' +
        '                    <div class="z-numberkey onkey" @click="numberkey(0)">0</div>\n' +
        '                    <div class="z-numberkey iconfont icon-del ondel" @click="delkey()"></div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="z-popup_bg" @click="hide()"></div>\n' +
        '        </div>',
    created: function () {
        var _this = this;

    },
    methods: {
        numberkey: function(t){
            var l = this.number.length;
            if (l <6){
                this.number = this.number + t.toString();
                l = this.number.length;
                this.length = l;
            }
        },
        delkey: function(t){
            this.number=this.number.substring(0,this.number.length-1);
            var l = this.number.length;
            this.length = l;
        },
        qrbtn: function(){
            if (this.length <6){
                jw.ts.toast("请输入完整交易码")
                return false;
            }
            this.postdata();
        },
        hide: function(){
            var _this = this;
            _this.$emit("hide", 1);
            _this.number = "";
            _this.length = 0;
        },
        postdata: function () {
            var _this = this;
            _this.$emit("rdata", _this.number);
            this.hide();
        }
    }
});
