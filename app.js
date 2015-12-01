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
        viewFilter.citySelction();
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
    GetDataCity : function (i){
        return model.collection[i].city;
    },
    GetMinTemp : function (name, town){
        var min = 100;
        for (var i=0; i< model.collection.length; i ++){
            if (this.GetDataCity(i)==town){
                if (this.GetDataDay(i) == name){
                    if (min >= this.GetDataTemp(i)){
                        min = this.GetDataTemp(i);
                    }
                }
            }
        }
        return min;
    },
    GetMaxTemp : function (name, town){
        var max = -100;
        for (var i=0; i< model.collection.length; i ++){
            if (this.GetDataCity(i)==town){  
                if (this.GetDataDay(i) == name){
                    if (max <= this.GetDataTemp(i)){
                        max = this.GetDataTemp(i);
                    }
                }
            }
        }
        return max;
    }  
};

var viewFilter = {
    citySelction : function(){
        var citysel;
        $("#btn-filter").click(function(){
            if ($(".city").val() != ""){
                citysel = $(".city").val();
                view.loadDirtyData(citysel);
            }else{
                alert ("Please select a city!");
            }
        })
    }
    
};

var view = {
    loadDirtyData : function(town){
        var citysel = town;
        var temp1;
        $("#summary").html("");
        for (var i=0; i<controller.GetDataLen(); i++){
            temp1 = temp.replace("ID", i).replace("CONDITION", controller.GetDataCond(i)).replace("DAY", controller.GetDataDay(i)).replace("MIN_TEMP", controller.GetMinTemp(controller.GetDataDay(i), citysel)).replace("MAX_TEMP", controller.GetMaxTemp(controller.GetDataDay(i), citysel));
            $("#summary").append(temp1);
        }
        this.deleteDirtyData(citysel);
    },
    deleteDirtyData : function (citysel) { //introdurre un array "var days =  ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];" con questo array possono inizializzare con la variabile day meglio (basta ciclare questo array)
        console.log(citysel);
        var day;
        for(var i=0; i<controller.GetDataLen(); i++){
            if (controller.GetDataCity(i) == citysel){
                if (day == controller.GetDataDay(i)){
                    $("#"+i).html("");
                }else{
                    day = controller.GetDataDay(i);
                }
            }else{
                $("#"+i).html("");
            }
        }
    }
};