$(document).ready(function() {


    
    for (var i = 9; i <= 17; i++){
        $('.container').append(`<div class="row time-block" data-time="${i}"> 
        <div class="col-sm col-md-2 hour"> 
            <p>${i}</p> 
        </div> 
        <div class="col-sm col-md-8 d-flex description"> 
            <textarea></textarea> 
        </div> 
        <div class="col-sm col-md-2 saveBtn"> 
            <i class="far fa-save fa-2x"></i> 
        </div> 
        </div>`);
    }
    
    
    let timeTrackObject = {};
        if (localStorage.getItem('timeTrackObject')) {
            timeTrackObject = JSON.parse(localStorage.getItem('timeTrackObject'));
        }else{
            timeTrackObject = {
                '9': { time: "9", value: ""},
                '10':{ time: "10", value: ""},
                '11':{ time: "11", value: ""},
                '12':{ time: "12", value: ""},
                '13':{ time: "13", value: ""},
                '14':{ time: "14", value: ""},
                '15':{ time: "15", value: ""},
                '16':{ time: "16", value: ""},
                '17':{ time: "17", value: ""}
            };
        }
    
    
   //Current Date - Moment
    var dateCurrent = moment().format('dddd, MMMM, Do');
    $("#currentDay").text(dateCurrent)
    
    //Save
    $(".time-block").each(function(){
        $(this).find(".description textarea").val(timeTrackObject[$(this).attr("data-time")].value);
    });
  
    var plannerTime = function(){
        var currentHour = moment().hour();
        $(".time-block").each(function(){
    
            var elementHour = parseInt($(this).attr("id"));
    
            if (elementHour < currentHour) {
                $( this ).removeClass( "present future" ).addClass( "past" );        }
            else if (elementHour === currentHour) {
                $( this ).removeClass( "past future" ).addClass( "present" );        }
            else {
                $( this ).removeClass( "present past" ).addClass( "future" );        }
        })
    };
    plannerTime();

    
   
    $("body").on('click', ".saveBtn", function(e){
    

    var hour = $(this).closest(".time-block").attr("data-time");
    var textInput = $(this).closest(".time-block").find(".description textarea").val();

    

    timeTrackObject[hour].value = textValue;
    

    localStorage.setItem('timeTrackObject', JSON.stringify(timeTrackObject));
    
    });
    
    
    $("body").on('click', "#clearData", function(e){
        localStorage.setItem('timeTrackObject', "");
        $(".time-block").each(function(){
            $(this).find(".description textarea").val('');
        });
    });
    
});