var pantalla = document.querySelector("#ahorcado");
var pincel = pantalla.getContext("2d");

/*Posición donde comienzan las lineas para las letras */
var posicionLineasX = 300;
var posicionLineasY = 700;
var largoLinea = 70;

/*Dibuja el ahorcado a medida que erran las letras*/
function dibujarAhorcado(error){
    
    if(error == 0){
        /*Color de fondo*/
        pincel.beginPath();
        pincel.fillStyle = "lightblue"
        pincel.fillRect(0,0,1200,800);

        /*Base del ahorcado*/
        pincel.lineWidth = 7;
        pincel.strokeStyle = "black";
        pincel.beginPath();
        pincel.moveTo(45,700);
        pincel.lineTo(150,650);
        pincel.lineTo(250,700);
        pincel.lineTo(48,700);
        pincel.stroke();
    }

    if(error == 1){
        /*Mastil*/
        dibujarRecta(150,650,150,200);   
    }
    if(error == 2){
        /*Barra horizontal*/
        dibujarRecta(146,200,350,200);
    }
    if(error == 3){
        /*Barra vertical*/
        dibujarRecta(348,196,350,250);
    }
    if(error == 4){
        /*Cabeza*/
        pincel.beginPath();
        pincel.arc(350,300,50,0,2*Math.PI);
        pincel.stroke();
    }
    if(error == 5){
        /*Cuerpo*/
        dibujarRecta(350,350,350,500);
    }
    if(error == 6){
        /*Pierna izquierda*/
        dibujarRecta(350,497,280,580);
    }
    if(error == 7){
        /*Pierna derecha*/
        dibujarRecta(350,497,430,580);
    }
    if(error == 8){
        /*Brazo izquierdo*/
        dibujarRecta(350,400,430,350);
    }
    if(error == 9){
        /*Brazo Derecho*/
        dibujarRecta(350,400,280,350);
        /*Ojo Izquiero*/
        dibujarRecta(320,280,340,300);
        dibujarRecta(340,280,320,300);
        /*Ojo Derecho*/
        dibujarRecta(360,280,380,300);
        dibujarRecta(380,280,360,300);
    }
}

/*Dibuja las lineas donde aparece las letras correctas */
function dibujarLineas(palabra){
    pincel.beginPath()
    for(let i=0;i<palabra.length;i++){
        var posicion = posicionLineasX + (largoLinea*i);
        pincel.moveTo(posicion,posicionLineasY);
        pincel.lineTo(posicion + 50,posicionLineasY);
        pincel.stroke();
    }   
}

/*Funcion para dibujar todas las lineas del dibujo del ahorcado */
function dibujarRecta(inicioX,inicioY,finX,finY){
    pincel.beginPath();
    pincel.strokeStyle = "black";
    pincel.lineWidth = 7;
    pincel.moveTo(inicioX,inicioY);
    pincel.lineTo(finX,finY);
    pincel.stroke();
}

/*Escribe la letra arriba de su respectiva linea */
function escribirLetra(letra,linea,color){
    let posicion = posicionLineasX + (largoLinea*linea);
    pincel.beginPath()
    pincel.font = "40pt Verdana";
    pincel.fillStyle =color;
    pincel.fillText(letra,posicion+6,690);
}

/*Escribe las que son error */
function escribirLetraError(letra,error){
    let posicion = 600 + (50*error);
    pincel.beginPath();
    pincel.font = "40pt Verdana";
    pincel.fillStyle ="red";
    pincel.fillText(letra,posicion,500);

}

/*Escribe una palabra en un posicion determinada*/
function escribirPalabra(palabra,posicionX,posicionY,color){
    pincel.beginPath();
    pincel.font = "40pt Verdana";
    pincel.fillStyle =color;
    pincel.fillText(palabra,posicionX,posicionY);
}

function escribirPalabraChica(palabra,posicionX,posicionY,color){
    pincel.beginPath();
    pincel.font = "20pt Verdana";
    pincel.fillStyle =color;
    pincel.fillText(palabra,posicionX,posicionY);
}

/*Crea el Botón "INICIO" para volver al comienzo de la página */
function crearBotonVolver(){
    pincel.beginPath();
    pincel.fillStyle = "blue"
    pincel.fillRect(480,725,150,45);
    pincel.beginPath();
    pincel.font = "30pt Verdana";
    pincel.fillStyle = "white";
    pincel.fillText("Inicio",500,760);
}
