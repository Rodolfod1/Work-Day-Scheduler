// This is my Script for the Daily planner - Rodolfo Diaz Oct-10-2020
var tarea,hrs,Ctime,MyTime,IncT,Iden,idx
var Tasks,booking,apmt=[]
// Staring the script letting ,, execute when ready
$(document).ready(function(){
    // Parsing for current time
    Ctime=moment();
    // setting the start of the day as today's date 8:00 am
    IncT=moment();
    IncT=IncT.hour(8);
    IncT=IncT.minutes(00);
      // to include the date and time on the header
    $("#currentDay").text(Ctime.format("llll"));
        popEmpty();
 });

function popEmpty(){
    //this variable will be increasing using the moment method
    var ntime=IncT
    // creating the time blocks using a for loop
    for (i=0; i<10; i++){
        // Tasks={Time:ntime,Act:tarea};
        var div1=$("<div class='input-group mb0-' >");
        var div2=$("<div class='input-group-prepend'>");
        var Spn =$("<span class='input-group-text' id='basic-addon1'>").text(ntime.format("hh:mm a"));
        var inp=$("<input type='text' class='form-control list-group-item-primary' placeholder='available time' aria-label='available time' aria-describedby='basic-addon1'>");
        var div3=$("<div class='input-group-append'>");
        var bot=$("<button type='button' class='btn btn-outline-secondary'>").text("Save");
        //adding a distinctive value so we can manipulate the time block
        bot.attr("Value",ntime.format("h"));
        inp.attr("id","myCls"+ntime.format("h"));
        Spn.attr("id","myId"+ntime.format("h"));
// changing attribute for moments in the past ,,if moment is < than current time  then even happened in the past
//if this happened then change attribute to inactive
var x=parseInt(ntime.format("H"));  // parsing to integers for the if
var y =parseInt(Ctime.format("H"));
 if(x<y){
        inp.prop("disabled",true);
        bot.prop("disabled",true);
     }
 else if(ntime.format("h")===Ctime.format("h")){
     /// change class to current time
     inp.removeClass("list-group-item-primary");
     inp.addClass("list-group-item-danger");
 }
        //appending the blocks
        div3.append(bot);
        div2.append(Spn);
        div1.append(div2);
        div1.append(inp);
        div1.append(div3);
        ntime=ntime.add(1,'hour');
        $("#main").append(div1)
     }
     $(".btn").on("click",function(){
       Iden=parseInt($(this).val());
       PrepareWrite();
       });
};

function PrepareWrite() {
      var lk=Iden.toString();
     $("#myCls"+lk).removeClass("list-group-item-primary");
     $("#myCls"+lk).addClass("list-group-item-success");
     tarea=$("#myCls"+lk).val();
     hrs=$("#myId"+lk).text();
     /// create an index based on the moment carried out from the Span and convert its format to 24hrs so it can be used as an indexer to sort the array
     idx=moment(hrs,"hh:mm a").format("H"); 
     Tasks={ Time: hrs, Act: tarea , Srt:idx};
     writeMem();
};

 function writeMem() {
//     //if localStore is empty then stringify Tasks
     booking=localStorage.getItem("Clinch");
     if(booking===null){
         localStorage.setItem("Clinch",JSON.stringify([Tasks]));
     }
     else{
          // if there is data in localStorage then convert booking into array and assign it to apmt
         apmt=JSON.parse(booking);
           // now we can add the updated array tasks into the apmt
             apmt.push(Tasks);
             //adding the updating array to our Clinch localStorage
             localStorage.setItem("Clinch",JSON.stringify(apmt));
         }
         sorting();
};

function sorting(){
    booking=localStorage.getItem("Clinch");
    apmt=JSON.parse(booking);
      apmt.sort((a,b)=> a.Srt - b.Srt);
      console.log(apmt);

     // use this compare function to sort the time
    //  apmt.sort(function(a,b){
    //     if(a.Time < b.Time) return -1;
    //     if(a.Time>b.Time) return 1;
    //     return 0; 
    //    });
    };
