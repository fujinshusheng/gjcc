var list1 = [
    {
        "FTypeId": 1,
        "FName": "盖碗",
        "FParentId": 0
    },
    {
        "FTypeId": 2,
        "FName": "茶杯",
        "FParentId": 0
    },
    {
        "FTypeId": 3,
        "FName": "壶",
        "FParentId": 0
    },
    {
        "FTypeId": 4,
        "FName": "壶承",
        "FParentId": 0
    },
    {
        "FTypeId": 5,
        "FName": "茶叶罐",
        "FParentId": 0
    },
    {
        "FTypeId": 6,
        "FName": "公道杯",
        "FParentId": 0
    }
];
var list2 = [
    {
        "FTypeId": 7,
        "FName": "盖碗",
        "FParentId": 1
    },
    {
        "FTypeId": 8,
        "FName": "茶壶",
        "FParentId": 1
    },
    {
        "FTypeId": 9,
        "FName": "干泡碗",
        "FParentId": 1
    },
    {
        "FTypeId": 10,
        "FName": "品茗杯",
        "FParentId": 2
    },
    {
        "FTypeId": 11,
        "FName": "水杯",
        "FParentId": 2
    },
    {
        "FTypeId": 12,
        "FName": "茶杯",
        "FParentId": 2
    }
];
for (var i=0;i<list1.length;i++){
    for (var j=0;j<list2.length;j++){
        if (list1[i].FTypeId == list2[j].FParentId){
            if (list1[i].list == undefined){
                list1[i].list = [];
            }
            list1[i].list.push(list2[j]);
        }
    }
}
console.log(list1);