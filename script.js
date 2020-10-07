// This is my Script for the Daily planner - Rodolfo Diaz Oct-10-2020
var tarea,hrs,Ctime,MyTime,IncT,Iden,idx,contx,wrt
var Tasks,booking,apmt=[]
var isData=false
var RenderStorage=false
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
        Start();
 });
function Start(){
     //calling localStorage to verify it is empty 
    booking=localStorage.getItem("Clinch");
    if (booking!==null) {
   RenderStorage=true;
        };
     //this variable will be increasing using the moment method
    var ntime=IncT
    // creating the time blocks using a for loop
    for (i=0; i<10; i++){
        var div1=$("<div class='input-group mb0-' >");
        var div2=$("<div class='input-group-prepend'>");
        var Spn =$("<span class='input-group-text' id='basic-addon1'>").text(ntime.format("hh:mm a"));
        var inp=$("<input type='text' class='form-control list-group-item-primary' placeholder='available time' aria-label='available time' aria-describedby='basic-addon1'>");
        var div3=$("<div class='input-group-append'>");
        var bot=$("<button type='button' class='btn btn-outline-secondary'>").text('Save');
        //adding a distinctive value, class and ID so we can manipulate the time block
        bot.attr("Value",ntime.format("h"));
        inp.attr("id","myCls"+ntime.format("h"));
        Spn.attr("id","myId"+ntime.format("h"));
// changing attribute for moments in the past ,,if moment is < than current time  then even happened in the past
//if this happened then change attribute to inactive
var x=parseInt(ntime.format("H"));  // parsing to integers for the if
var y =parseInt(Ctime.format("H"));
 if(x<y){
        inp.attr("placeholder","Event in the past. Not available for editing")
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
        div1.append(div2).append(inp).append(div3);
        $("#main").append(div1);
        ntime=ntime.add(1,'hour');
     }
/// This code is to populate the localmemory 
if(RenderStorage){
  apmt=JSON.parse(booking);
  for(i=0;i<apmt.length;i++){
    var extime=moment(apmt[i].Time,"hh:mm a").format("h")
    $("#myCls"+extime).val(apmt[i].Act);
    $("#myCls"+extime).removeClass("list-group-item-primary");
     $("#myCls"+extime).addClass("list-group-item-success");
      if(apmt[i].Act===""){
        $("#myCls"+extime).removeClass("list-group-item-success");
        $("#myCls"+extime).addClass("list-group-item-primary");
      }
      };
    };
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
//// this function is for sorting the array, doesn't required for this but it enhance debugging 
function sorting(){
    booking=localStorage.getItem("Clinch");
    apmt=JSON.parse(booking);
      apmt.sort((a,b)=> a.Srt - b.Srt); 
    };
