var String="";
var inx = 0;
var Cursor = $("#Cursor");
var error = false;


function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

function moveRight(){
    //Cursor.css("marginLeft","+=40px");
    
    Cursor.animate({"marginLeft" : "+=45px"},100);
    inx++;   
}


function moveLeft(){
    //Cursor.css("marginLeft","-=40px");
    Cursor.animate({"marginLeft" : "-=45px"},100);
    inx--; 
}

                                                            // VERIFICAR CADENA
function verificarCadena(){
    // MOVERSE A LA IZQ HASTA "A"
    moveLeft();
    
    var intervalFinal = setInterval(
        function(){
            if(String[inx] == "x")  moveLeft();
            else if(String[inx] == "a"){
                if(String[inx-1] == "_"){ 
                    alert("Cadena Valida!");
                    clearInterval(intervalFinal);
                }
                else{ 
                    alert(" 41.Cadena No Valida! -> " + String[inx]);
                    clearInterval(intervalFinal);
                }
            }else{
                alert(" 45.Cadena No valida! -> " + String[inx]);
                clearInterval(intervalFinal);
            }
            
        }, 500
    
    );
}

                                                                //ESTADO A
function estadoA(){
   
    //MOVERSE A LA IZQ HASTA ENCONTRAR "_" (BLANCO)
    var interval4 = setInterval(
        function(){
            if(String[inx] != "_") moveLeft();
            else{
             //MOVERSE A LA DER HASTA ENCONTRAR LA PRIMERA A Y CAMBIARLA POR "_" 
                moveRight();
                if(String[inx] == "a"){
                    String = setCharAt(String, inx, "_");
                    $("#String").html(String);
                }
                else alert("Cadena invalida! ->" + String[inx]);
                clearInterval(interval4);
                if(!error) TuringMachine(String, inx);
            }
        },500
    );
  
}

                                                                    // ESTADO B
function estadoB(){
    var i=0;
    //MOVERSE A LA IZQ HASTA ENCONTRAR UNA "B"
    var interval3 = setInterval(
        function(){
            if(String[inx] != "b"){
                moveLeft();
        
            }else{
                clearInterval(interval3);
                var interval3a = setInterval(
                    function(){
                        if( i < 2){
                            if(String[inx] == "b"){
                                String = setCharAt(String, inx, "x");
                                $("#String").html(String);
                                moveLeft();
                                i++;
                            }else {
                                alert("Cadena no valida! -> " + String[inx]);
                                error=true;
                                i=2; // para parar el loop
                            }

                        }else{
                            clearInterval(interval3a);
                            if(!error) estadoA();
                        }
                
                    },500);            
            }
        
        },500        
    );
    
}


                                                                    // ESTADO C
function estadoC(){
    // MOVERSE A LA IZQ 3 VECES CON LA "C"
    var i = 0;
    var interval2 = setInterval(
        function(){
            if(i < 3 && error == false){
                if(String[inx] == "c"){
                    String = setCharAt(String, inx, "_");
                    $("#String").html(String);
                    moveLeft();
                    i++;
                }else{
                    alert("cadena no valida! -> " + String[inx]);
                    error=true;
                }
               
            }else{
                // pasamos al siguiente estado B...
                clearInterval(interval2);
                if(!error) estadoB();           
            }    
            
        },500
    );
    
}

function TuringMachine(str, ind){
    String = str;
    inx = ind+1;
    error=false;
    
    $("#String").html(String);
    
    //MOVERSE A LA DER HASTA ENCONTRAR UN BLANCO
   
    var interval1 = setInterval(
        function(){
            if(String[inx] != "_"){
                moveRight();
            }else {
                clearInterval(interval1);
                // Vamonos al estado C
                if(String[inx-1] == "c"){
                    moveLeft();
                    if(!error) estadoC();
                    // Vamos a verificar cadena
                }else if(String[inx-1] == "x"){ 
                    moveLeft();
                    verificarCadena();
                }
                 else{
                     showMessage("Cadena invalida :/ ¿Son caracteres válidos?");
                     clearInterval(interval1);
                 }
            }
        },500 );
                
}