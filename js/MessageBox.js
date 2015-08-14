var messageBoxBG = $("#MessageBoxBG");
var messageBox = $("#MessageBox");

function showMessage(str){
    messageBoxBG.css("display","block");
    messageBoxBG.animate({"opacity" : 0.9}, 200);
    
    messageBox.children("p").html(str);
    messageBox.animate({"marginTop" : "25%"}, 200);
    
    
    
}

function hideMessage(){
    messageBoxBG.animate({"opacity" : 0}, 200, function(){messageBoxBG.css("display", "none");});
    messageBox.animate({"marginTop" : "-10%"}, 200, function(){messageBox.html("")});
}

$("#MessageBox button").on("click",function(){hideMessage()});