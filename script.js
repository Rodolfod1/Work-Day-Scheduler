
var tarea,hrs
var Tasks={ Time: hrs, Act: tarea }
var Ctime,MyTime,IncT,Iden;
var booking,apmt=[]

$(document).ready(function(){
    // Parsing for current time
    Ctime=moment();
    // setting the start of the day as today's date 8:00 am
    IncT=moment();
    IncT=IncT.hour(8);
    IncT=IncT.minutes(00);
    console.log(IncT.format("hh:mm a"));
    // to include the date and time on the header
    $("#currentDay").text(Ctime.format("llll"));

  // checking for localStorage content
    // booking=localStorage.getItem("Clinch");
    // if(booking===null){ localStorage.setItem("Clinch",JSON.stringify([Tasks]))
        popEmpty();
    // }
    // else {
    //     // if there is data in localStorage then convert boooking into array and assign it to apmt
    //     apmt=JSON.parse(booking);
    //     // now we can add the updated array tasks into the apmt
    //     apmt.push(Tasks);



    // }

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
        Spn.attr("id","myId"+ntime.format("h"))
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
        Iden=$(this).val();
        writeMem();
    });
};

function writeMem(){
    var lk=Iden.toString();
    $("#myCls"+lk).removeClass("list-group-item-primary");
    $("#myCls"+lk).addClass("list-group-item-success");
    tarea=$("#myCls"+lk).val();
    hrs=$("#myId"+lk).text();
    console.log(Tasks);
    // var lk= JSON.stringify("#myCls"+Iden)
    //  $(lk).removeClass("list-group-item-primary");
    //  $(lk).addClass("list-group-item-danger");


    //  var Act= $("#myCls12").value().trim();
    // console.log(Act);
}

