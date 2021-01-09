var dsf={};
//微信支付---------begin
/*
jw.submit_ykt("WXorderpay", {
    "body": "订单支付",
    "notifyUrl": "http://www.yunpuer.com/SelfModel/orderpaysuccess.aspx",
    "orderid": _this.FBusinessOrderId
}, function (ret) {
    if (ret.result_code == "SUCCESS") {
       dsf.wxsdk1(ret.nonce_str, ret.prepay_id,function (ret, err) {
           if (ret.status) {
               jw.ts.toast("支付成功");
               setTimeout(function () {
                   jw.openWin({
                       'name': 'my_order_details',
                       'url': '../myself/my_order_detailscopy.html',
                       pageParam: {
                           ly: api.pageParam.ly,
                           FBusinessOrderId: _this.FBusinessOrderId
                       }
                   });
               }, 500);
           } else {
               jw.ts.toast("失败");
           }
        })
    } else {
        jw.ts.toast("失败");
    }
}, {
    jz: true,
    Url: jw.config.url3,
    Ip: jw.config.ip3
});
*/
dsf.wxPay=null;
dsf.wxPayConfig={};
dsf.wxPayConfig.apiKey='wx7f1cca191b9b3caf';
dsf.wxPayConfig.mchId='1512144871';
dsf.wxPayConfig.package='Sign=WXPay';
dsf.wxsdk1=function (nonce_str,prepay_id,fun) {
  if(dsf.wxPay==null) dsf.wxPay = api.require('wxPayPlus');
  var _wxsgin=dsf.wxsgin(nonce_str,prepay_id);
  dsf.wxPay.payOrder({
    apiKey: dsf.wxPayConfig.apiKey, //ret.appid,
    orderId: prepay_id,
    mchId: dsf.wxPayConfig.mchId, //ret.mch_id,
    nonceStr: nonce_str,
    timeStamp:_wxsgin.now,
    package: dsf.wxPayConfig.package,
    sign: _wxsgin.sign
  }, function (ret, err) {
    fun(ret, err);
  });
}
//微信签名
dsf.wxsgin=function (nonce_str,prepay_id) {
  if(dsf.wxPay==null) dsf.wxPay = api.require('wxPayPlus');
  var now = Date.parse(new Date()) / 1000;
  var stringSignTemp = "appid=wx7f1cca191b9b3caf&noncestr=" + nonce_str +
      "&package=Sign=WXPay&partnerid=1512144871&prepayid=" +
      prepay_id + "&timestamp=" + now + "&key=qweasdzxc123456789qazwsxedcrfvtg";
  var sign = hex_md5(stringSignTemp).toUpperCase();
  return {
    now:now,sign:sign
  };
}
//微信支付---------end

//支付宝支付------------------------------------------begin

/*
 dsf.zfbsubmit ('Aliorderpay',{
    "Body": "订单支付",
    "Subject": "订单支付",
    "NotifyUrl": "http://www.yunpuer.com/SelfModel/hander.aspx?cmd=AliorderpayNotify",
    "orderid": _this.FBusinessOrderIds
}, {
  jz: true,
      Url: jw.config.url3,
      Ip: jw.config.ip3
},function (ret, err) {
  if (ret.code == "9000") {
    jw.ts.toast("支付成功");
    setTimeout(function () {
      jw.openWin({
        'name': 'my_order',
        'url': '../myself/my_order3.html',
        pageParam: {
          ly: api.pageParam.ly,
        }
      });
    }, 500);
  } else {
    jw.ts.toast("失败");
  }
})
*/
dsf.zfbPay=null;
dsf.zfbsubmit=function (cmd,data,turl,fun) {
  jw.submit_ykt(cmd,data, function (ret) {
    if (ret != "") {
     if(dsf.zfbPay==null) dsf.zfbPay = api.require('aliPayPlus');
      dsf.zfbPay.payOrder({
        orderInfo: ret
      }, function (ret, err) {fun(ret, err);});
    }
  },turl);
}
//支付宝支付------------------------------------------end