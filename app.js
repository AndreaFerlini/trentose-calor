/* your code should go here */

var temp = '<li id="ID"><div class="icon"><img src="img/icons/CONDITION.png"></div><div class="stats"><h2>DAY</h2><strong>min</strong> MIN_TEMP <strong>max</strong> MAX_TEMP </div></li>'

$(document).ready(function(){
    controller.init(); 
});

var model = {
    collection: data,
    
    days : [],
    
    weekDays : ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    
    createArray : function (city){
        model.days = []; //permette di selezionare città differenti inizializzando l'array
        for (var i = 0; i < model.collection.length; i ++){
            var flag = false;
            //dichiarazione del template (va azzerato per ogni giorno)
            var daytemp = {day : "",
                           temperatureMin : 1,
                           temperatureMax : 1,
                           condition: ""};
            
            if (model.collection[i].city == city){
                for (var j=0; j<this.weekDays.length; j++){
                    //popolazione della variabile template (se la città è quella selezionata)
                    if (model.collection[i].day == model.weekDays[j]){
                        daytemp.day = model.collection[i].day;
                        daytemp.condition = model.collection[i].condition;
                        daytemp.temperatureMin = controller.GetMinTemp(model.collection[i].day, city);
                        daytemp.temperatureMax = controller.GetMaxTemp(model.collection[i].day, city);
                        //popolazione di days con eliminazione dei duplicati
                        if (model.days.length == 0){
                            model.days.push(daytemp);
                        }else{
                            for (var k = 0; k< model.days.length; k++){
                                if (daytemp.day == model.days[k].day){
                                    flag = true;
                                }
                            }
                            if (flag != true){
                                model.days.push(daytemp);
                            }
                        }
                    }
                }
            }
        }
    }
    
};

var controller = {
    init : function (){
        viewFilter.citySelction();
    },
    
    initArray: function (citysel){
        model.createArray(citysel);
    },
    GetDataLen : function (){
        return model.days.length;
    },
    GetDataCond : function (i){
        return model.days[i].condition;
    },
    GetDataDay : function (i){
        return model.days[i].day;
    },
    GetDataTempMin : function (i){
        return model.days[i].temperatureMin;
    },
    GetDataTempMax : function (i){
        return model.days[i].temperatureMax;
    },
    GetDataTemp : function (i){
        return model.collection[i].temperature;
    },
    GetDataCity : function (i){
        return model.collection[i].city;
    },
    GetDataCollDay : function (i){
        return model.collection[i].day;
    },
    GetMinTemp : function (name, town){
        var min = 100;
        for (var i=0; i< model.collection.length; i ++){
            if (this.GetDataCity(i)==town){
                if (this.GetDataCollDay(i) == name){
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
                if (this.GetDataCollDay(i) == name){
                    if (max <= this.GetDataTemp(i)){
                        max = this.GetDataTemp(i);
                    }
                }
            }
        }
        return max;
    },
};

var viewFilter = {
    citySelction : function(){
        var citysel;
        $("#btn-filter").click(function(){
            if ($(".city").val() != ""){
                citysel = $(".city").val();
                //view.loadDirtyData(citysel);
                controller.initArray(citysel);
                view.loadData();
            }else{
                alert ("Please select a city!");
            }
        })
    }
    
};

var view = {
    loadData : function(){
        var temp1;
        $("#summary").html("");
        for (var i=0; i<controller.GetDataLen(); i++){
            temp1 = temp.replace("ID", i).replace("CONDITION", controller.GetDataCond(i)).replace("DAY", controller.GetDataDay(i)).replace("MIN_TEMP", controller.GetDataTempMin(i)).replace("MAX_TEMP", controller.GetDataTempMax(i));
            $("#summary").append(temp1);
        }
    }
};