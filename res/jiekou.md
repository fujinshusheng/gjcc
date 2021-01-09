### 图片上传接口
    /SelfModel/hander.aspx?cmd=upload
    /SelfModel/hander.aspx?cmd=uploadImgList
### 返回值
    {"data":["/upload/app/20180704153447.jpg"],"error":"","status":200}

##  1.登录
### 接口名：app_login
### 参数：
    FType登录类型 0：账号，1：微信，2：扣扣
    FPassword 密码
    FMobile  手机号码
    FOpenId   唯一标识
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": "登录成功"
        }
      ],
      "ds1": [
        {
          "FUserId": 4,
          "FName": "测试用户",
          "FPassWord": "E10ADC3949BA59ABBE56E057F20F883E",
          "FMobile": "111111",
          "FType": 0,
          "FOpenId": "",
          "FHanderImg": "",
          "FEmail": "",
          "FIDCard": "",
          "FIntegral": 0,
          "FIsEnable": false,
          "FCreater": 0,
          "FCreateDate": "2018-03-27T15:01:48.59"
          FPayPassword
        }
      ]
    }
    {"ds":[{"status":"999999","msg":"用户名或密码不正确"}]}
    {"ds":[{"status":"888888","msg":"请先注册"}]}
    {"ds":[{"status":"666666","msg":"请绑定手机号"}]}

### 接口名：app_设置支付密码
### 参数：
    FUserId  
    FPayPassword
### 返回
    {"ds":[{"status":"000000","msg":"成功"}]}

## 2.注册
### 接口名：app_register
### 参数：
    FMobile  手机号
    FPassword 密码
### 返回json：
    {"ds":[{"status":"999999","msg":"该用户已存在"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}

### 接口名：app_获取积分
### 参数：
    FIntegralEarnID  积分赚取表id（1注册  2推荐注册  3完善资料）
    FMobile  手机号
### 返回json：
    {"ds":[{"status":"999999","msg":"失败"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}

## 3.绑定手机号
### 接口名：app_绑定手机号
### 参数：
    FMobile  手机号
    FName   昵称
    FType    类型 0：账号，1：微信，2：扣扣
    FOpenId   唯一标识
    FHanderImg   头像
    FGender 性别 1男,2女
### 返回json：
    {"ds":[{"status":"000000","msg":"成功"}]}

## 4.找回密码
### 接口名：修改密码
### 参数：
    FPassword  新密码
    FMobile  手机号码
### 返回json：
    {"ds":[{"status":"000000","msg":"成功"}]}
    {"ds":[{"status":"999999","msg":"用户不存在"}]}

## 5.轮播图

### 接口名：app_轮播图
### 参数：
    FPageYype  1首页2茶新闻页
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FBannerId": 1,
          "FNewsOrBusinessId": 0,   //新闻或者产品id
          "FType": 0,   //类型0无1茶新闻2产品
          "FImg": "/upload/app/20180613143124.jpg"
        },
        {
          "FBannerId": 2,
          "FNewsOrBusinessId": 1,
          "FType": 1,
          "FImg": "/upload/app/20180612132118_s.jpg"
        }
      ]
    }
        
# 个人中心

## 1.积分记录

### 接口名：app_积分获取记录
### 参数：
    FUserId  用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无积分获取记录"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FIntegralDeId": 1,
          //id
          "FUserId": 4,
          //用户id 
          "FIntegral": 5,
          //积分值
          "FTitle": 1, // 积分来源
          "FCreateDate": "2018-05-05", // 获取时间
        }
      ]
    }
### 接口名：app_积分兑换记录
### 参数：
    FUserId  用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无积分兑换记录"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FIntegralDeId": 1,
          //id
          "FUserId": 4,
          //用户id 
          "FIntegral": -5,
           //积分值
           "FTitle": 1, // 积分来源
           "FCreateDate": "2018-05-05", // 获取时间
        }
      ]
    }
    
### 接口名：app_我的积分
### 参数：
    FUserId  用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无该用户信息"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FUserId": 4,
          "FHanderImg": "",
          //头像
          "FIntegral": 0
        }
      ]
    }//积分数量

## 2.积分规则

### 接口名：app_积分规则
### 参数：无
### 返回json：
    {"ds":[{"status":"999999","msg":"积分规则无定义"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FTemper1": "<p><span style='color: rgb(255, 0, 0);'>一：积分获得</span></p><p><span style='color: rgb(255, 0, 0);'></span></p><hr/><p><span style='color: rgb(255, 0, 0);'><span style='color: rgb(0, 0, 0);'>登录app、每日签到。。。</span><br/></span></p>"
        }
      ]
    }  内容

## 3. 赚取积分
### 接口名：app_赚取积分
### 参数：无
### 返回json：
    {"ds":[{"status":"999999","msg":"积分规则无定义"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FTitle": "注册",
          "FNum": 100
        },
        {
          "FTitle": "推荐注册",
          "FNum": 10
        },
        {
          "FTitle": "完善资料",
          "FNum": 10
        }
      ]
    }
    
## 4. 收货地址
### 接口名：app_收货地址列表
### 参数：
    FUserID  用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无收货地址"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FShippingAddressId": 1, //id
          "FUserID": 4, //用户id
          "FUserName": "测试用户", //收货人姓名
          "FMobile": "111111",  //收货人手机号
          "FProvince": "浙江省",
          "FCity": "宁波市",
          "FArea": "鄞州区",
          "FAddress": "创苑路750号",
          "FIsDefault": false, //是否默认地址
          "FIsEnable": "0", //是否删除0否1是
          "FCreateDate": "2018-06-20T00:00:00"
        }
      ]
    }
    
### 接口名：app_默认收货地址
### 参数：
    FShippingAddressID   收货地址表id
    FIsDefault  是否为默认收货地址0-否1是
    FUserID    用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"收货地址不明确"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}

### 接口名：app_添加收货地址
### 参数：
    FShippingAddressID   收货地址表id（修改时有值，添加时无值）
    FUserID    用户id
    FUserName   收货人姓名
    FMobile    收货人电话
    FProvince    省
    FCity    市
    FArea    区
    FAddress    详细地址
    FIsDefault    是否为默认收货地址0-否1是
### 返回json：
    {"ds":[{"status":"999999","msg":"收件人不能为空"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}

### 接口名：app_删除收货地址
### 参数：
    FShippingAddressID   收货地址表id
### 返回json：
    {"ds":[{"status":"999999","msg":"收货地址不明确"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}

## 5. 关于我们

### 接口名：app_关于我们
### 参数：无
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无数据"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FName": "观今茶仓", //标题
          "FImageUrl": "/upload/app/20180413092218_s.jpg", //logo
          "FContent": "<p>观今茶仓</p>", //内容
          "FWxUrl": "/upload/app/20180413092221_s.jpg", //微信二维码
          "FAppUrl": "/upload/app/20180413092223_s.jpg" //app二维码
        }
      ]
    }


## 7. 账户信息

### 接口名：app_我的信息

### 参数：
    FUserId   用户id
###返回json：
    {"ds":[{"status":"999999","msg":"用户不存在"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FUserId": 4,
          "FName": "测试用户",
          //用户名
          "FGender": 1, //性别1男2女
          "FBirthday": "1992-10-07",
          "FMobile": "111111",
          //手机号
          "FHanderImg": "",
          //头像
          "FIDCard": "",
          //身份证
          "FIntegral": 0,
          //积分
          "FRemainingSum": null
          //余额
        }
      ]
    }


### 接口名：app_修改个人信息
### 参数：
    FUserId   用户id
    FHanderImg    头像
    FName    用户名
    FGender    性别
    FBirthday    生日
### 返回json：
    {"ds":[{"status":"999999","msg":"用户不存在"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}
    

### 接口名：app_修改前验证新手机号
### 参数：
    FMobile   原来手机号
    FNewMobile    新手机号
### 返回json：
    {"ds":[{"status":"999999","msg":"不能与原手机号一致"}]}
    {"ds":[{"status":"999999","msg":"该手机号已经绑定过账号"}]}
    {"ds":[{"status":"000000","msg":"验证成功"}]}
          
          
### 接口名：app_修改手机号
### 参数：
    FMobile   原来手机号
    FNewMobile    新手机号
### 返回json： 
    {"ds":[{"status":"000000","msg":"成功"}]}

    
    订单来源： FOrderType： 0  //商城订单
    订单状态：FOrderStatus:：//订单状态
    FPickType": 0,   // 提货类型0：自提，1：顺丰到付,2:到茶仓
    
    0未支付    按钮显示： 更多 、付款 、取消订单
    1已支付    按钮显示： 更多 、 退款
    2退款中   按钮显示： 更多 、取消退款
    3已退款  按钮显示： 更多 
    4（已发货/已提货/已转到茶仓） 
    已发货： FPickType: 1  按钮显示： 更多 查看物流  收货 
    已提货： FPickType: 0  按钮显示： 更多  确认提货
    已转到茶仓： FPickType: 2  按钮显示： 更多 
    5确认收货  按钮显示： 更多 、查看物流 评价
    6订单取消 按钮显示： 更多 


### 接口名：app_我的订单 
### 参数：
    FUserId   用户id 
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无订单"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FBusinessOrderId": 1,   //订单id 
          "FOrderType": 0,   // 订单来源 0商城订单 1限时抢购 2茶市
          "FOrderSource": 0,   // 0：平台，>0:GJ_OnekeyResale一键转卖配置表 id 或者[GJ_FlashSale]表 id  
          "FName": "西湖龙井2018明前",   //商品名称
          "FImg": "/upload/app/20180327142343_s.jpg",   //商品图片
          "FPrice": 350.00,   // 单价
          "FBuyNum": 2,   // 购买数量
          "FTotal": 700.00,   // 总价
          "FPickType": 0,   // 提货类型0：自提，1：顺丰到付,2:到茶仓
          "FOrderStatus": 1  //订单状态0未支付1已支付2退款中3已退款4（已发货/已提货/已转到茶仓）5确认收货6订单取消
          "FIsValidate": true  //是否短信验证
          "FIsAssess": false  //是否评价
          "FIfCancel": true  //能否退款
          "FLastPayDate": "2018-07-11 16:40:30"  //最晚支付时间
          "FLastRefundDate": " 2018-07-11 16:40:30"  //最晚退款时间
        }
      ]
    }

### 接口名：app_订单详情 
### 参数：
    FBusinessOrderId   用户id 
### 返回json： 
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FBusinessOrderId": 1,
          "FUserId": 4,
          "FOrderNum": "201807051030005300",   //订单编号
          "FOrderType": 0,   //订单来源 0商城订单 1限时抢购 2茶市
          "FOrderSource": 0,   //订单来源0：平台，>0:GJ_OnekeyResale一键转卖配置表 id 或者[GJ_FlashSale]表 id
          "FBusinessId": 1,   //商品id
          "FName": "西湖龙井2018明前",   //商品名称
          "FImg": "/upload/app/20180327142343_s.jpg",   //商品图片
          "FPrice": 225.00,   //单价
          "FBuyNum": 1,   //购买数量
          "FSubTotal": 225.00,   //小结
          "FPreferentialPrice": 10.00,   //积分抵扣金额
          "FTotal": 215.00,   //总价
          "FReturnIntegral": 0,   //返回积分
          "FPayType": 0,   //支付方式0余额支付1支付宝2微信3银联
          "FPickType": 0,   //提货类型0：自提，1：快递,2:到茶仓
          "FOrderStatus": 1,   //订单状态0未支付1已支付2退款中3已退款4（已发货/已提货/已转到茶仓）5确认收货 6订单取消
          "FPayDate": "2018-07-05 11:28:48",   //支付时间
          "FCancelDate": null,   //取消时间
          "FRefundDate": null,   //退款时间
          "FRefundReson": null,   //退款原因
          "FIsAssess": false,   //是否评价
          "FIfCancel": true,   //能否退款
          "FCreateDate": "2018-07-05 10:30:00",   //创建时间
          "FLastPayDate": "2018-07-05 11:00:00",   //最晚可支付时间
          "FLastRefundDate": "2018-07-12 11:28:48"   //最晚可退款时间
        }
      ],
      //最晚可退款时间
      // 当FPickType=1时
      "ds2": [
        {
          "FPickGoodsId": 1,
          "FPickDate": "2018-07-06 13:30:00",   //预计提货时间
          "FPickAddress": "",   //提货地址
          "FPickName": "",   //联系人
          "FPickPhone": "",   //电话
          "FStatus": 0,   //状态0未提货1已提货
          "FUpdateDate": null,   //实际提货时间
          "FMemberType": null  //确认提货0用户1后台
        }
      ],
      //当FPickType=2时
      "ds2": [
        {
          "FExpressRecordId": 1,
          "FShippingAddress": "",   //收货地址
          "FShippingName": "",   //收货人姓名
          "FShippingPhone": "",   //收货人电话
          "FStatus": 0,   //状态0未发货1已发货
          "FUpdateDate": null,   //发货时间
          "FIsPostage": "",//  是否包邮  0是1否
        }
      ]
    }


# 商品
## 1. 商品

### 接口名：app_茶商城限时抢购
### 参数：无 
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无限时抢购"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FlashSaleId": 1,// 限时抢购id
          "FBusinessId": 1,//商品id
          "FBusinesName": "西湖龙井2018明前",//商品名称
          "FImageUrl": "/upload/app/20180327142343_s.jpg",//商品图片
          "FPrice": "111",//抢购价
          "FBusinesPrice": 266.00,//原价
          "FNum":2,	//剩余数量
          "FStartDate": "2018-04-08 10:00:00",//抢购开始时间
          "FEndDate": "2018-06-30 23:59:59",//抢购截止时间
          "ss": 813972,//抢购倒计时时间（秒）
          "FStatus": 1  //状态0未开始1抢购中2已结束l
        }
      ]
    }    

### 接口名：app_所有产品
### 参数：
    start	开始页数
    Length		每页长度
    FTypeId	分类id
    FBusinessBrandId	品牌id
    FNetWeight		>=净含量区间
    FNetWeight1	<=净含量区间
    FPrice		>价格区间
    FPrice1		<价格区间
    Keywords    关键词搜索
    FPriceSort    价格 0升 1 降
    FSalesSort     销量 0升 1 降
    FNewSort     最新 0升 1 降
### 返回json：
    {
      "ds": [
        {
          "RowNumber": 1,   //
          "FBusinessId": 1,   //商品id
          "FTypeId": 1,   //分类id
          "FName": "西湖龙井2018明前",   //商品名称
          "FMarketprice": 350.00   //市场价
          "FPrice": 266.00,   //价格
          "FStock": 521,   //库存
          "FImageUrl": "/upload/app/20180327142343_s.jpg",   //图片
          "FBusinessBrandId": 1,   //品牌id
          "FNetWeight": 250,   //净含量250g
          "FUnit": "饼",   //单位
          "FSort": null   //排序
        },
        {
          "RowNumber": 2,
          "FBusinessId": 2,
          "FTypeId": 1,
          "FName": "云南普洱茶",
          "FPrice": 250.00,
          "FImageUrl": "/upload/app/20180620133026.jpg",
          "FBusinessBrandId": 1,
          "FNetWeight": 100.00,
          "FUnit": "g",
          "FSort": 2
        }
      ],
      "ds1": [
        {
          "TotalCount": 2
        }
      ]
    }    //总共条数

### 接口名：app_商品详情
### 参数：
    FBusinessId   商品id 
    FUserId: jw.data.get("userid"), //   用户id
### 返回json：

    {"ds":[{"status":"999999","msg":"商品不存在"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FBusinessId": 1,   //商品id
          "BusinessTypeFName": "分类1",   //分类名称
          "FName": "西湖龙井2018明前",   //商品名称
          "FMarketprice": 350.00,   //市场价
          "FPrice": 266.00,   //价格
          "FImageUrl": "/upload/app/20180327142343_s.jpg",   //图片
          "FContent": "<p>西湖龙井2018明前</p>",   //商品内容
          "FStock": 2,   //库存
          "FAddress": "",   //产地
          "FCollectionNum": 0,   //收藏数量
          "FShareNum": 0,   //分享数量
          "FPraiseNum": 0,   //点赞数量
          "FAssessNum": 0,   //评论数
          "FIsEnable": false,   //是否删除 true已删除 false 未删除
          "FNetWeight": 250,   //净含量250g
          "FUnit": "饼",   //单位
          "BusinessBrandFName": "品牌1",   //品牌名称
          "FIsRecommend": 1   //是否推荐商品0否1是
          "FSaleNum" //销量：
          "FIntegral" //赠送积分：
        }
      ],
      "ds2":[{"ifPraise":"true"}] //是否点赞
    }

### app_商品详情new
### 参数：
    FId":4,
    "FUserId":"1024",
    "FType":2
### 返回json：
    {
        "ds": [
          {
            "status": "000000",
            "msg": "成功"
          }
        ],
        "ds1": [
          {
            "FBusinessId": 4,
            "BusinessTypeFName": "生茶",
            "FName": "普洱茶",
            "FPrice": 100,
            "FImageUrl": "/upload/app/20180803140021_s.jpg",
            "FContent": "<p><img src='/upload/ueditor/636689054615242323.jpg' style='' title='3.jpg'/></p><p><span style='font-family:宋体'>各阶段发酵，依据发酵笔记</span> <span style='font-family:宋体'>逐次更新（配图）</span></p><p><span style='font-family:宋体'>发酵后成品制作写作（配图）</span></p><p><span style='font-family:宋体'>制作后各时期口感变化进行描述，（配图）</span></p><p><span style='font-family:宋体'>提供送检报告书并进行说明（配上检测机构出具的检测证书）</span></p><p><img src='/upload/ueditor/636689054615789174.jpg' style='' title='5-2.jpg'/></p><p><br/></p>",
            "FStock": 55,
            "FAddress": "云南",
            "FCollectionNum": 0,
            "FShareNum": 2,
            "FPraiseNum": 3,
            "FAssessNum": 2,
            "FSaleNum": 48,
            "FIsEnable": false,
            "FNetWeight": 100,
            "FUnit": "片",
            "BusinessBrandFName": "品牌1",
            "FIsRecommend": 0,
            "FSaleNum1": 48,
            "FIntegral": 100,
            "FIsPostage": 0,
            "FLimitNum": 5
          }
        ],
        "ds2": [
          {
            "ifPraise": "false"
          }
        ]
      }

### 接口名：app_限时抢购商品详情
### 参数：
    FlashSaleId    商品限时抢购表id
### 返回json：
    {"ds":[{"status":"999999","msg":"商品不存在"}]}
    {
      "ds": [
        {
          "FBusinessId": 1,   //商品id
          "FName": "西湖龙井2018明前",   //商品名称
          "FPrice": 266.00,   //原价
          "FlashSale": "111",   //抢购价
          "FImageUrl": "/upload/app/20180327142343_s.jpg",   //图片
          "FNum": 2,   //剩余数量
          "FLimitNum": 1,   //每人限购数量
          "FStartDate": "2018-04-08 10:00:00",   //抢购开始时间
          "FEndDate": "2018-06-30 23:59:59",   //抢购结束时间
          "ss": 113430,   //距离抢购结束还剩秒
          "FStatus": 1,   //状态0未开始1抢购中2已结束
          "FNetWeight": 250,   //净含量
          "FUnit": "饼",   //单位
          "BusinessBrandFName": "品牌1",   //品牌名称
          "FContent": "<p>西湖龙井2018明前</p>"  //商品内容
        }
      ]
    }
    
### 接口： app_商品提货地址
### 参数：
    FBusinessId
### 返回：
    {"ds":[{"status":"000000","msg":"成功"}],
    "ds1":[{"FPickGoodsAddress":"","FPickGoodsName":"","FPickGoodsPhone":""}]}


### 接口名：app_分享 
    （新闻和商品分享为同一个接口）
### 参数：
    FType    类型0：商品，1：新闻
    FShareType  分享、转发渠道 0微信好友 1朋友圈 2微博 3扣扣好友 4扣扣空间
    FUserId   用户id
    Fid    商品或新闻id
### 返回json：
    {"ds":[{"status":"000000","msg":"成功"}]}

### 接口名：app_发布商品评论
### 参数：
    FBusinessOrderId  订单id
    FBusinessId  商品id
    FUserId   用户id      
    FLevel   评级啊等级 12345
    FAssess    内容
    FIsNiM    是否匿名0是1否
    FImage    多张图片以英文逗号隔开
### 返回json：
    {"ds":[{"status":"999999","msg":"失败"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}

### 接口名：app_商品评价
### 参数：
    FBusinessId  商品id 
### 返回json：
    {"ds":[{"status":"999999","msg":"该商品暂无评论"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "quanbu": 5,
          "hao": 2,
          "zhong": 2,
          "cha": 1
        }
      ],
      "ds2": [
        {
          "FBusinessAssessId": 1,
          "FBusinessId": 1,
          "FUserId": 4,
          "FUserName": "kimi5",
          "FHanderImg": "/upload/app/20180707174149_0.jpg",
          "FAssess": "好好好",
          "FReAssess": "感谢您",
          "FReUser": null,
          "FIsEnable": false,
          "FCreateDate": "2018-06-21 17:03:22",
          "FIsNiM": 0,
          "FLevel": 5,
          "FImageUrl": "/uploud/1111.png,/uploud/2222.png"
        },
        {
          "FBusinessAssessId": 2,
          "FBusinessId": 1,
          "FUserId": 4,
          "FUserName": "kimi5",
          "FHanderImg": "/upload/app/20180707174149_0.jpg",
          "FAssess": "一般",
          "FReAssess": null,
          "FReUser": null,
          "FIsEnable": false,
          "FCreateDate": "2018-06-21 18:04:29",
          "FIsNiM": 0,
          "FLevel": 4,
          "FImageUrl": null
        },
        {
          "FBusinessAssessId": 3,
          "FBusinessId": 1,
          "FUserId": 4,
          "FUserName": "kimi5",
          "FHanderImg": "/upload/app/20180707174149_0.jpg",
          "FAssess": "很差",
          "FReAssess": null,
          "FReUser": null,
          "FIsEnable": false,
          "FCreateDate": "2018-06-21 18:04:34",
          "FIsNiM": 0,
          "FLevel": 1,
          "FImageUrl": "/uploud/1111.png,/uploud/2222.png"
        },
        {
          "FBusinessAssessId": 4,
          "FBusinessId": 1,
          "FUserId": 4,
          "FUserName": "kimi5",
          "FHanderImg": "/upload/app/20180707174149_0.jpg",
          "FAssess": "一般",
          "FReAssess": null,
          "FReUser": null,
          "FIsEnable": false,
          "FCreateDate": "2018-06-21 18:04:29",
          "FIsNiM": 0,
          "FLevel": 4,
          "FImageUrl": null
        },
        {
          "FBusinessAssessId": 5,
          "FBusinessId": 1,
          "FUserId": 4,
          "FUserName": "kimi5",
          "FHanderImg": "/upload/app/20180707174149_0.jpg",
          "FAssess": "非常好",
          "FReAssess": "感谢您的支持，我们会更加努力",
          "FReUser": null,
          "FIsEnable": false,
          "FCreateDate": "2018-06-21 17:03:22",
          "FIsNiM": 0,
          "FLevel": 5,
          "FImageUrl": null
        }
      ]
    }
    
    
## 点赞
### 接口名：app_点赞 （新闻点赞和商品点赞为同一接口）
### 参数：
    Fid  商品或新闻id
    FUserId   用户id
    FType   类型0商品1新闻
### 返回json：
    {"ds":[{"status":"999999","msg":"失败"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}
    
# 2. 购物车
### 接口名：app_加入购物车New
### 参数：
    FUserId   用户id
    FBusinessId    商品id
    FNumber    数量
    FType    来源0商城1茶市
    FOnekeyResaleId    FType为1时茶市转卖表id
### 返回json：
    {"ds":[{"status":"999999","msg":"失败"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}
    
### 接口名：app_我的购物车
### 参数：
    FUserId  用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无购物车信息"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FShoppingCarId": 1,   //购物车表id
          "FUserId": 4,   //用户id
          "FBusinessId": 1,   //商品id
          "FBusinessName": "西湖龙井2018明前",   //商品名
          "FPrice": 532.00  //单价,
          "FNumber": 2,   //数量
          "FStatus": 0,   //状态0正常1失效
          "FType": 0  //来源0商城1茶市
          "FOnekeyResaleId": null  //当FType=1时为GJ_OnekeyResale表id值
          "sellerUserId": null,   //转卖者用户id
          "sellerUserName": null,   //转卖者用户昵称
          "sellerHanderImg": null  //转卖者用户头像
        }
      ]
    } 
    
### 接口名：app_购物车编辑
### 参数：
    FShoppingCar 编辑的字符串（id,数量;id,数量;id,数量）
### 返回json：
    {"ds":[{"status":"999999","msg":"编辑失败"}]}
    {"ds":[{"status":"000000","msg":"成功"}],

### 接口名：app_购物车删除
### 参数：
    FShoppingCarId 编辑的字符串（id1, id2,id3）
### 返回json：
    {"ds":[{"status":"999999","msg":"删除失败"}]}
    {"ds":[{"status":"000000","msg":"成功"}],

### 接口名：app_免责协议
### 参数：无 
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无免责协议"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FTemper1": "<p>免责协议</p>"
        }
      ]
    }
    
### 接口名：app_仓储协议
### 参数：无 
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无仓储协议"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      " ds1": [
        {
          "FTemper1": "<p>好好好</p>"
        }
      ]
    }
    
### 接口名：app_积分抵扣金额
### 参数：
    FUserId 用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"积分余额不足"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FPreferentialPrice": 10.00  //可抵扣金额
        }
      ]
    }
    
### 接口名：app_提交订单
### 参数：
    FBusinessId  商品id
    FUserId	用户id
    FOrderSource	订单来源0：平台，>0:GJ_OnekeyResale一键转卖配置表 id 或者[GJ_FlashSale]表 id
    FBuyNum	购买数量
    FOrderType	提货类型 订单来源 0商城订单 1限时抢购 2茶市
    FPrice   单价
    FPreferentialPrice  积分抵扣金额
    FPickType     提货类型0：自提，1：快递,2:到茶仓
    FShippingAddressId   收货地址id
    FPickDate    预计提货时间
### 返回json：
    {"ds":[{"status":"999999","msg":"失败"}]}
    {"ds":[{"status":"999999","msg":"库存不足"}]}
    {"ds":[{"status":"000000","msg":"成功",” FBusinessOrderId”:1}]} 订单id
    
### 接口名：app_余额支付
### 参数：
    FBusinessOrderId  订单id
    FUserId  用户ID
    PayPassword  支付密码
    Price   支付金额
### 返回json：
    {"ds":[{"status":"999999","msg":"订单不存在"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}
          
### 接口名：app_确认订单
### 参数：
    FBusinessOrderId  订单id
    FPayType  支付方式
### 返回json：
    {"ds":[{"status":"999999","msg":"订单不存在"}]}
    {"ds":[{"status":"000000","msg":"成功"}],


### 接口名：app_申请退款
### 参数：
    FBusinessOrderId   订单id
### 返回json： 
    {"ds":[{"status":"000000","msg":"成功"}]}
    {"ds":[{"status":"999999","msg":"失败"}]}
    
### 接口名：app_取消退款
### 参数：
    FBusinessOrderId   订单id
### 返回json：
    {"ds":[{"status":"000000","msg":"成功"}]}
    {"ds":[{"status":"999999","msg":"失败"}]}

### 接口名：app_取消订单
### 参数：
    FBusinessOrderId   订单id
### 返回json： 
    {"ds":[{"status":"000000","msg":"成功"}]}
    {"ds":[{"status":"999999","msg":"失败"}]}
    
### 接口名：app_确认提货
### 参数：
    FBusinessOrderId   订单id
    FMemberType   确认人类型0用户1后台
### 返回json： 
    {"ds":[{"status":"000000","msg":"成功"}]}
    {"ds":[{"status":"999999","msg":"失败"}]}
    
### 接口名：app_确认收货
### 参数：
    FBusinessOrderId   订单id
### 返回json： 
    {"ds":[{"status":"000000","msg":"成功"}]}
    {"ds":[{"status":"999999","msg":"失败"}]}


### 接口名：app_钱包余额
### 参数：
    FUserId   用户id 
### 返回json：
    {"ds":[{"status":"000000","msg":"成功"}],"ds1":[{"FRemainingSum":107.00}]}


### 接口名：app_钱包明细
### 参数：
    FUserId   用户id 
### 返回json：
    {"ds":[{"status":"999999","msg":"暂无记录"}]}
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "paytype": 0,   //支付方式0余额支付1支付宝2微信3银联
          "price": "-1.00",   //金额
          "createtime": "2018-07-06 10:59:14",
          "FReMark": "商城消费"  //描述
        },
        
        {
          "paytype": 0,
          "price": "-1.00",
          "createtime": "2018-07-06 10:59:31",
          "FReMark": "商城消费"
        }
      ]
    }



# 茶新闻

### 接口名：app_茶新闻列表
### 参数：
    keywords  搜索关键词
### 返回json：
    {
      "ds": [
        {
          "FNewsId": 2,  //新闻id
          "FName": "云南古树茶领涨春茶市场",  //新闻标题
          "FImageUrl": "/upload/app/20180612132101_s.jpg",  //图片
          "FShareNum": 0,  //分享数
          "FPraiseNum": 0,  //点赞数
          "FAssessNum": 0,  //评论数
          "FCreateDate": "2018-06-08 10:34:00",
          "FNewsTypeId": 4  //新闻分类id  1精品推荐  2制作流程  3热门茶评  4业内新闻   5名企推荐
        }
      ]
    }

### 接口名：app_茶新闻内容  //详情
### 参数：
    FNewsId    茶新闻id
### 返回json：
    {
      "ds": [
        {
          "status": "999999",
          "msg": "新闻不存在"
        }
      ]
    }
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {  //新闻详情
          "FNewsId": 1,   //新闻id
          "FName": "龙润8425普洱茶",   //新闻标题
          "FSummary": "外形墨绿紧实尚显毫，条索匀整品质好；香气茶能醉人何必酒，蜜甜微醺暖人心。",
          "FImageUrl": "/upload/app/20180612132118_s.jpg",
          "FContent": "香气茶能醉人何必酒，蜜甜微醺暖人心。",
          "FBusinessId": 0,   //对应商品id  0无对应商品  >0则对应商品id可通过Furl链接到商品详情页
          "FUrl": "",   //链接
          "FShareNum": 0,   //分享数
          "FPraiseNum": 0,   //点赞数
          "FAssessNum": 0,   //评论数
          "FCreateDate": "2018-06-04T15:17:00",
          "FNewsTypeId": 3  //新闻分类id  1精品推荐  2制作流程  3热门茶评  4业内新闻   5名企推荐,
          isPraise 0否1是 是否点赞
        }
      ],
      "ds2": [
        {  //精品推荐商品
          "FBusinessId": 1,   //商品id
          "FName": "西湖龙井2018明前",   //商品名称
          "FImageUrl": "/upload/app/20180327142343_s.jpg",   //商品图片
          "FPrice ": "266.00 "  //商品名称
        },
        {
          "FBusinessId": 2,
          "FName": "云南普洱茶",
          "FImageUrl": "/upload/app/20180620133026.jpg",
          "FPrice": 250.00
        }
      ]
    }
# 积分
### 接口名：app_获取积分
### 参数：
    FIntegralEarnID  积分赚取表id（1注册  2推荐注册  3完善资料）
    FUserId   用户id
### 返回json：
    {"ds":[{"status":"999999","msg":"失败"}]}
    {"ds":[{"status":"000000","msg":"成功"}]}
    


# 发票

### 接口名：app_发票记录
### 参数：FUserId  用户id
### 结果：
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FInvoiceRecordId": 1,
          "FName": "极望科技",
          "FNumber": "1234568789745213",
          "FAddress": "浙江省宁波市软件园",
          "FPhone": "0578-85858582",
          "FBank": "宁波银行",
          "FBankNo": "9999999999999999999",
          "FShippingAddress": "浙江省宁波市镇海区刚道路700号",
          "FShippingName": "张海华",
          "FShippingPhone": "18856565959",
          "FIsEnable": false
        }
      ]
    }
    
### 接口名：app_新增发票记录
### 参数：  
    FOrderId  //订单id
    FUserId   //用户id
    FType  //订单id
    FName //抬头
    FNumber //税号
    FAddress //公司地址
    FPhone //公司电话
    FBank //开户行
    FBankNo //银行卡号
    FShippingAddress //发货地址
    FShippingName //收件人姓名
    FShippingPhone //收件人电话
### 结果：
    {"ds":[{"status":"000000","msg":"成功"}]}
    
    
    {
      "FBusinessOrderId": 149,
      "FBusinessId": 2,
      "FUserId": 4,
      "FOrderType": 0,
      "FOrderSource": 0,
      "FName": "云南普洱茶",
      "FImg": "/upload/app/20180803135934_s.jpg",
      "FPrice": 250,
      "FBuyNum": 1,
      "FTotal": 250,
      "FPickType": 2,
      "FOrderStatus": 1,
      "FName1": null,
      "FIsAssess": false,
      "FIfCancel": true,
      "FLastPayDate": "2018-08-09 19:18:55",
      "FLastRefundDate": "2018-08-16 18:51:41"
    }
#
### 仓储说明  注册协议  用户须知 都调同一个接口
### 接口名：app_协议及说明
### 参数：
    agreementId   仓储说明=5  注册协议=6 用户须知=8
### json：
    {"ds":[{"status":"000000","msg":"成功"}],"ds1":[{"FContent":"<p>仓储说明</p>"}]}
    
    
### 接口：app_广告页
### 参数：无
### 结果：
    {"ds":[{"status":"000000","msg":"成功"}],"ds1":[{"FAdvMentImgId":1,"FImgUrl":"/upload/app/20180819165408.jpg","FUrl":""},{"FAdvMentImgId":2,"FImgUrl":"/upload/app/20180819165443.jpg","FUrl":""}]}
    
### 接口：app_消息弹出
### 参数：FUserId
### 结果：
    {"ds":[{"status":"999999","msg":"暂无内容"}]}
    {"ds":[{"status":"000000","msg":"成功"}],
    "ds1":[{"FContent":"静静送了您一片茶"}]}  //内容
    
### 接口：app_我的茶仓
### 参数：FUserId
### 结果：
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FWarehouseId": 62,
          "FName": "普洱茶",
          "FImg": "/upload/app/20180803140021_s.jpg",
          "FTotal": 1999,
          "FNum": 1,
          "FSurplusNum": 0,
          "FCreateDate": "2018-08-15 17:01:02",
          "FBusinessOrderId": 188,
          "ifRefund": 1
        }
      ]
    }
    
### 接口：app_银行卡信息
### 参数：FUserId
### 返回json：
    {"ds":[{"status":"000000","msg":"成功"}],
    "ds1":[{"FBankId":2,"FBankName":"中国银行","FBankNum":"123456789987456321","FImg":"/uploud/img/232992738.jpg"}]}
     {"ds":[{"status":"999999","msg":"暂无数据"}]}

### 接口：app_银行卡信息新增修改
### 参数：
    FUserId  //用户id
    FBankName  //银行名称
    FBankNum  //银行卡号
    FUserName // 持卡人
    FImg   //银行卡图片
    FBankId //id 修改时传入新增时不传入
### 返回json：
    {"ds":[{"status":"000000","msg":"成功"}]}
    {"ds":[{"status":"999999","msg":"参数错误"}]}

    
### 接口名称：app_银行卡删除
### 参数：FBankId
### 返回json：
    {
      "ds":[{"status":"000000","msg":"成功"}]
    }

### 接口：app_我的茶仓列表
### 参数：FUserId
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FName": "qweqe",
          "FImageUrl": "/upload/app/20180809152048_s.jpg",
          "FYear": "2017",
          "BrandFName": "品牌1",
          "FNum": 1
        },
        {
          "FName": "qweqe",
          "FImageUrl": "/upload/app/20180809152048_s.jpg",
          "FYear": "2018",
          "BrandFName": "品牌1",
          "FNum": 1
        },
        {
          "FName": "qweqe",
          "FImageUrl": "/upload/app/20180809152048_s.jpg",
          "FYear": "2018",
          "BrandFName": "品牌2",
          "FNum": 1
        },
        {
          "FName": "西湖龙井2018明前",
          "FImageUrl": "/upload/app/20180803135805_s.jpg",
          "FYear": "2018",
          "BrandFName": "品牌1",
          "FNum": 1
        },
        {
          "FName": "云南普洱茶",
          "FImageUrl": "/upload/app/20180803135934_s.jpg",
          "FYear": "2015",
          "BrandFName": "品牌2",
          "FNum": 0
        }
      ]
    }
    
### 接口名：app_最新交易记录
### 参数：无
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FPayDate": "2018-07-23T17:08:47.843",
          "FBuyNum": 2,
          "FTotal": 520.00,
          "FYear": "2018",
          "FName": "品牌1"
        },
        {
          "FPayDate": "2018-07-24T10:10:49.237",
          "FBuyNum": 1,
          "FTotal": 150.00,
          "FYear": "2018",
          "FName": "品牌1"
        },
        {
          "FPayDate": "2018-07-24T10:37:39.197",
          "FBuyNum": 1,
          "FTotal": 172.25,
          "FYear": "2015",
          "FName": "品牌2"
        }
      ]
    }
    
### 接口名称：app_交易记录
### 参数：FBusinessId  商品id
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": "成功"
        }
      ],
      "ds1": [
        {
          "FPayDate": "2018-08-23T11:22:32.933",
          "FBuyNum": 1,
          "FTotal": 100.00,
          "FYear": "2005",
          "Column1": "品牌2"
        },
        {
          "FPayDate": "2018-08-20T14:19:14.057",
          "FBuyNum": 1,
          "FTotal": 100.00,
          "FYear": "2005",
          "Column1": "品牌2"
        },
        {
          "FPayDate": "2018-08-20T13:42:18.07",
          "FBuyNum": 1,
          "FTotal": 20.00,
          "FYear": "2018",
          "Column1": "品牌2"
        },
        {
          "FPayDate": "2018-08-20T13:40:12.327",
          "FBuyNum": 1,
          "FTotal": 19.00,
          "FYear": "2018",
          "Column1": "品牌2"
        },
        {
          "FPayDate": "2018-08-20T13:29:42.257",
          "FBuyNum": 1,
          "FTotal": 20.00,
          "FYear": "2018",
          "Column1": "品牌2"
        }
      ]
    }
    
### 接口名称：app_删除订单
### 参数：FBusinessOrderId   订单id
### 返回json：
    {
      "ds":[{"status":"000000","msg":"成功"}]
    }
    
### 接口名称：app_意见反馈
### 参数：
    FUserID: jw.data.get("userid"),
    FContent:$("#FContent").val(),
    **FIsNiM**:  //是否匿名0是1否
### 返回json：
    {
      "ds":[{"status":"000000","msg":"成功"}]
    }
    
    
### 接口：app_茶仓明细
### 参数：
    FUserId
    Ftype 列表类型值为：退款，转卖，赠送，提货
### 返回json：{
    "ds":[{
    "status":"000000","msg":"成功"}],
    "ds1":[{
    "Fid":39,
    "FImageUrl":"/upload/app/20180927142625_s.jpg",   //图片
    "FName":"曼撒",   //名称
    "FTotal":0.01,  //买入总价
    "FNum":1,  //买入数量
    "FPrice":0.01,  //买入单价
    "FSurplusNum":0,  //剩余数量
    "FCreateDate":"2018-11-01T15:21:55.757",  //买入时间
    "Ftype":"快递"  //类型
    }]}

### 接口：app_茶仓明细详情
### 参数：
    Ftype  传入列表数据里的Ftype
    Fid   传入列表数据里的Fid
          
### Ftype='退款'
### 返回json：
      {"ds":[{
      "FWarehouseRefundId":40,
      "FImageUrl":"/upload/app/20180927143144_s.jpg",      //图片
      "FName":"龙帕",     //名称
      "FRefundNum":1,     //退款数量
      "FRefundPrice":999.00,     //退款金额
      "FRefundReson":"买错",     //退款原因
      "FStatus":"成功",     //状态
      "FailReason":null,     //退款失败原因
      "FCreateDate":"2018-10-08 14:47:09",     //创建时间
      "FUpdateDate":"2018-10-08 14:47:45"     //确认时间
      }]}
      
### Ftype='转卖'
### 返回json：
      {"ds":[{
      "Fid":193,
      "FImageUrl":"/upload/app/20180927142625_s.jpg",      //图片
      "FName":"曼撒",      //名称
      "FPrice":499.00,      //买入单价
      "salePrice":800.00,      //转卖单价
      "FNum":1,      //转卖数量
      "FPoundage":40.00,      //手续费
      "FSurplusNum":1,      //剩余数量
      "FStatus":"取消转卖",      //状态
      "FCreateDate":"2018-10-16 06:01:15",      //创建时间
      "FUpdateDate":"2018-11-07 16:13:37"      //取消转卖时间
      }]}
      
   
### Ftype='赠送'
### 返回json：
    {"ds":[{
    "Fid":65,
    "FImageUrl":"/upload/app/20180927142625_s.jpg",     //图片
    "FName":"曼撒",    //名称
    "FPrice":499.00,    //买入单价
    "FNum":7,    //转送数量
    "userName":"13738805188",    //转送对象昵称
    "FMobile":"13738805188",    //转送对象电话
    "FCreateDate":"2018-10-20 11:30:51",    //创建时间
    "PoundagePrice":69.93,    //手续费
    "FStatus":"未确认",    //状态
    }]}
    

### Ftype='快递'
### 返回json：
    {"ds":[{
    "Fid":23,
    "FImageUrl":"/upload/app/20180927142625_s.jpg",     //图片
    "FName":"曼撒",     //名称
    "FPrice":499.00,     //买入单价
    "FNum":5,     //提货数量
    "FIsPostage":"否",     //是否包邮
    "FShippingAddress":"浙江省宁波市江北区天沁路305号",     //收货地址
    "FShippingName":"徐萍","     //收货人姓名
    "FShippingPhone":"13306610732",     //收货人电话
    "FExpressCompany":"申通快递",     //快递公司
    "FExpressNo":"7703227865131",     //快递单号
    "FStatus":"已确认收货",     //状态
    "FCreateDate":"2018-10-16T08:29:02.89",     //创建时间
    "FUpdateDate":"2018-10-16T16:04:27.553",     //发货时间
    "FEndDate":"2018-10-26T08:57:00.843",     //确认收货时间
    }]}
    
### Ftype='自提'
### 返回json：
    {"ds":[{
    "Fid":40,
    "FImageUrl":"/upload/app/20180927142625_s.jpg",     //图片
    "FName":"曼撒",     //名称
    "FPrice":499.00,     //买入单价
    "FPickCode":"81684040",     //提货码
    "FNum":2,     //提货数量
    "FPickDate":"2018-10-16T18:40:00",     //语句提货时间
    "FPickAddress":"浙江省宁波市鄞州区中河街道长寿东路168号嘉里实业二楼",     //提货地址
    "FPickName":"王主任",     //联系人
    "FPickPhone":"13806670850",     //联系电话
    "FStatus":"已提货",     //状态
    "FCreateDate":"2018-10-16 14:44:39",     //创建时间
    "FUpdateDate":"2018-10-17 09:11:11",     //提货时间
    "FMemberType":"后台",     //确认人
    }]}
    
    
    
## 众筹订单列表    
### 接口名称：api42064
### 参数：
    FUserId: jw.data.get("userid"),
    page: "", // 当前页数
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": ""
        }
      ],
      "ds1": [
        {
          "id": "0",
          "divclass": "z-btn z-btn-ms z-btn-inline z-btn-cancel",
          "divhtml": "支付尾款",
          "beforeAsk": 0,
          "asktitle": "",
          "interface": ""
        },
        {
          "id": "1",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "退款",
          "beforeAsk": 1,
          "asktitle": "确定要申请退款？",
          "interface": "api42123"
        },
        {
          "id": "3",
          "divclass": "z-btn z-btn-ms z-btn-inline z-btn-cancel",
          "divhtml": "取消退款",
          "beforeAsk": 1,
          "asktitle": "确定要取消退款？",
          "interface": "api42124"
        },
        {
          "id": "4",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "去评价",
          "beforeAsk": 0,
          "asktitle": "",
          "interface": ""
        },
        {
          "id": "7",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "删除订单",
          "beforeAsk": 1,
          "asktitle": "确定删除订单订单？",
          "interface": ""
        }
      ],
      "ds2": [
        {
          "RowNumber": 1,
          "FActivityMemberID": 1,
          "FTitle": "测试111",
          "FImg": null,
          "FOrderNum": "zc12345646545",
          "FNum": 2,
          "FCost": 10,
          "FTotalCost": 20,
          "FPrice": 0.00,
          "FTotalPrice": 0.00,
          "FStatus": 0,
          "statusname": "等待支付尾款",
          "btnstatu": "0",
          "FPercent": "进度：0%"
        },
        {
          "RowNumber": 2,
          "FActivityMemberID": 2,
          "FTitle": "测试111",
          "FImg": null,
          "FOrderNum": "zc1234564456545",
          "FNum": 1,
          "FCost": 10,
          "FTotalCost": 10,
          "FPrice": 0.00,
          "FTotalPrice": 0.00,
          "FStatus": 1,
          "statusname": "已支付",
          "btnstatu": "",
          "FPercent": "进度：0%"
        }
      ],
      "ds3": [
        {
          "TotalCount": 2
        }
      ]
    }
    // 失败返回
    {
      "ds": [
        {
          "status": "999999",
          "msg": "暂无订单"
        }
      ]
    }
    
    
## 积分商城列表  兑换
### 接口名称：api41881
### 参数：
    FUserId: jw.data.get("userid"),
    page: "", // 当前页数
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": ""
        }
      ],
      "ds1": [
        {
          "id": "0",
          "divclass": "z-btn z-btn-ms z-btn-inline z-btn-cancel",
          "divhtml": "取消订单",
          "beforeAsk": 1,
          "asktitle": "确定要取消订单？",
          "interface": ""
        },
        {
          "id": "1",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "退款",
          "beforeAsk": 1,
          "asktitle": "确定要申请退款？",
          "interface": "api42038"
        },
        {
          "id": "2",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "去支付",
          "beforeAsk": 0,
          "asktitle": "",
          "interface": ""
        },
        {
          "id": "3",
          "divclass": "z-btn z-btn-ms z-btn-inline z-btn-cancel",
          "divhtml": "取消退款",
          "beforeAsk": 1,
          "asktitle": "确定要取消退款？",
          "interface": "api42039"
        },
        {
          "id": "4",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "去评价",
          "beforeAsk": 0,
          "asktitle": "",
          "interface": ""
        },
        {
          "id": "5",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "查看物流",
          "beforeAsk": 0,
          "asktitle": "",
          "interface": ""
        },
        {
          "id": "6",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "确认收货",
          "beforeAsk": 1,
          "asktitle": "确认收货？",
          "interface": ""
        },
        {
          "id": "7",
          "divclass": "z-btn z-btn-ms z-btn-inline",
          "divhtml": "删除订单",
          "beforeAsk": 1,
          "asktitle": "确定删除订单？",
          "interface": ""
        }
      ],
      "ds2": [
        {
          "RowNumber": 1,
          "FId": 32,
          "FTitle": "测试1",
          "FImg": "",
          "FNum": 1,
          "FCost": 100,
          "FCostTotal": 100,
          "FPrice": 0.00,
          "FPriceTotal": 0.00,
          "OnePay": "￥0.00+100积分",
          "TotalPay": "￥0.00+100积分",
          "FCreateTime": "2020-02-25 13:43:37",
          "FOrderStatus": 1,
          "statusname": "已支付",
          "btnstatu": null
        },
        {
          "RowNumber": 2,
          "FId": 31,
          "FTitle": "测试1",
          "FImg": "",
          "FNum": 1,
          "FCost": 100,
          "FCostTotal": 100,
          "FPrice": 0.00,
          "FPriceTotal": 0.00,
          "OnePay": "￥0.00+100积分",
          "TotalPay": "￥0.00+100积分",
          "FCreateTime": "2020-02-25 13:43:08",
          "FOrderStatus": 1,
          "statusname": "已支付",
          "btnstatu": null
        },
        {
          "RowNumber": 3,
          "FId": 30,
          "FTitle": "测试1",
          "FImg": "",
          "FNum": 3,
          "FCost": 100,
          "FCostTotal": 300,
          "FPrice": 0.00,
          "FPriceTotal": 0.00,
          "OnePay": "￥0.00+100积分",
          "TotalPay": "￥0.00+300积分",
          "FCreateTime": "2020-01-10 13:46:36",
          "FOrderStatus": 1,
          "statusname": "已支付",
          "btnstatu": null
        }
      ],
      "ds3": [
        {
          "TotalCount": 3
        }
      ]
    }
    // 失败返回
    {
      "ds": [
        {
          "status": "999999",
          "msg": "暂无订单"
        }
      ]
    }
    
## 竞价订单列表    
### 接口名称：api42695
### 参数：
    FUserId: jw.data.get("userid"),
    page: "", // 当前页数
### 返回json：
    {
      "ds": [
        {
          "status": "000000",
          "msg": ""
        }
      ],
      "ds1": [
        {
          "RowNumber": 1,
          "FId": 27,
          "FTitle": "测试活动2",
          "FImg": "",
          "FIntegralAuctionId": 2,
          "FUserid": 1225,
          "FCreateTime": "2020-01-08 16:33",
          "FNum": 6,
          "statusname": "竞价成功",
          "btnstatu": "1"
        }
      ],
      "ds2": [
        {
          "TotalCount": 1
        }
      ]
    }
    // 失败返回
    {
      "ds": [
        {
          "status": "999999",
          "msg": "暂无订单"
        }
      ]
    }
    