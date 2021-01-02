$(document).ready(function() {

    //1. Create html of the timeblocks dynamicly
    
    for (var i = 9; i <= 17; i++){
        $('.container').append(`<div class="row time-block" data-time="${i}"> 
        <div class="col-sm col-md-2 hour"> 
            <p>${i}AM</p> 
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
        //2. Checks if local storage exists, if it doesn't load preset data to array.
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
    
    //3. Load data loaded from code under comment 1 into page.
    $(".time-block").each(function(){
        $(this).find(".description textarea").val(timeTrackObject[$(this).attr("data-time")].value);
    });
    
    // 4. Using moment.js to show what day it is.
    let dateString = moment().format('dddd') + ", " +moment().format("MMM Do YY");
    $("#currentDay").html(dateString.substring(0, dateString.length - 5) + "th");
    
    //5. This checks the hour of the current day to the hour represented in the HTML data-element to decide it's background color.
    const m = moment();
    $.each($(".time-block"), function(index, value){
        let dateHour = $(value).attr("data-time");
        if (Number(dateHour) === m.hour()) {
            $(this).find("textarea").addClass('present');
        } else if(Number(dateHour) < m.hour()){
            $(this).find("textarea").addClass('past');
        } else {
            $(this).find("textarea").addClass('future');
        } 
    });
    
    //6. When a user clicks the save button data is saved to the objects and to local storage changing the data loaded in new sessions of steps 1 & 2.
    $("body").on('click', ".saveBtn", function(e){
    
    //Sets variables for calling data
    let hour = $(this).closest(".time-block").attr("data-time");
    let textValue = $(this).closest(".time-block").find(".description textarea").val();
    //let day = moment().format("MMM Do YY").substring(0,5);
    
    // Value is overrided by for the objects value
    timeTrackObject[hour].value = textValue;
    
    //Sends value to local storage for later use.
    localStorage.setItem('timeTrackObject', JSON.stringify(timeTrackObject));
    
    });
    
    // 7.Button to clear all data currently corrected.
    
    $("body").on('click', "#clearData", function(e){
        localStorage.setItem('timeTrackObject', "");
        $(".time-block").each(function(){
            $(this).find(".description textarea").val('');
        });
    });
    
});