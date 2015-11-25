/* your code should go here */

var temp = '<li id="ID"><div class="icon"><img src="img/icons/CONDITION.png"></div><div class="stats"><h2>DAY</h2><strong>min</strong> MIN_TEMP <strong>max</strong> MAX_TEMP </div></li>'


$(document).ready(function(){
    controller.init(); 
});

var model = {
    collection: data,
};

var controller = {
    init : function (){
        view.loadDirtyData();
    },
    GetDataLen : function (){
        return model.collection.length;
    },
    GetDataCond : function (i){
        return model.collection[i].condition;
    },
    GetDataDay : function (i){
        return model.collection[i].day;
    },
    GetDataTemp : function (i){
        return model.collection[i].temperature;
    },
    GetMinTemp : function (name){
        var min = 100;
        for (var i=0; i< model.collection.length; i ++){
            if (controller.GetDataDay(i) == name){
                if (min >= controller.GetDataTemp(i)){
                    min = controller.GetDataTemp(i);
                }
            }
        }
        return min;
    },
    GetMaxTemp : function (name){
        var max = 0;
        for (var i=0; i< model.collection.length; i ++){
            if (controller.GetDataDay(i) == name){
                if (max <= controller.GetDataTemp(i)){
                    max = controller.GetDataTemp(i);
                }
            }
        }
        return max;
    }  
};

var view = {
    loadDirtyData : function(){
        var temp1;
        for (var i=0; i<controller.GetDataLen(); i++){
            temp1 = temp.replace("ID", i).replace("CONDITION", controller.GetDataCond(i)).replace("DAY", controller.GetDataDay(i)).replace("MIN_TEMP", controller.GetMinTemp(controller.GetDataDay(i))).replace("MAX_TEMP", controller.GetMaxTemp(controller.GetDataDay(i)));
            $(".summary").append(temp1);
        }
        view.deleteDirtyData();
    },
    deleteDirtyData : function () {
        var day = controller.GetDataDay(0);
        for(var i=1; i<controller.GetDataLen(); i++){
            if (day == controller.GetDataDay(i)){
                $("#"+i).html("");
            }else{
                day = controller.GetDataDay(i);
            }
        }
    }
};


