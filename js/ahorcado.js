let jugar = document.querySelector("#iniciar-juego");
let agregarPalabra = document.querySelector("#nueva-palabra");
let palabraNueva = document.querySelector("#input-nueva-palabra");
let error = document.querySelector("#error");
let repetida = document.querySelector("#repetida");

/*Lista de palabras */
let listaPalabras = ["ALURA","ORACLE","CARTERA","MUSICA","COCODRILO","TELEFONO","ESGRIMA","COMPUTADORA",
    "PARRILLA","VACACIONES","AMERICA","ELECTRICIDAD","COMPETICION","GUITARRA","BATERIA","PALINDROMO",
    "ESTATUA","MARADONA","PERDIDA","TELEVISOR","PLASTICOLA","ZAPATILLA","JOROBA","ALCOHOL","CARACOL",
    "ARGENTINA","CELULAR"];

/*Chequea que las localStorage no este creada. Si esta creada la levanta, sino la crea */
if(!localStorage.getItem("listaDePalabras")){
    localStorage.setItem("listaDePalabras",JSON.stringify(listaPalabras));
}else{
listaPalabras = JSON.parse(localStorage.getItem("listaDePalabras"))
}

document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});

var letrasErradas = []; //Array donde se van guardando las letras equivocadas
var letrasEncontradas = []; //Array donde se guardan las letras que van adivinando
var palabra = "";

/**Escucha el boton de inicio y llama a la funcion comenzar con un click */
jugar.addEventListener("click",comenzar);

/*Inicia el juego */
function comenzar(event){
    palabraNueva.value="";
    jugar.blur(); //Saca el foco del botón. Para que no se acciones con la barra espaciadora.
    palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)]

    /*Inicia las variables en cero para cuando volves a empezar a jugar*/ 
    letrasErradas = [];
    letrasEncontradas = [];
    event.preventDefault();

    pantalla.scrollIntoView({block: "end", behavior: "smooth"}); //Se mueve la pantalla hasta el canvas
    dibujarAhorcado(letrasErradas.length);
    dibujarLineas(palabra);
    escribirPalabraChica("Ingrese las letras con el teclado",600,250,"blue");

    /*Captura la letra del teclado y se la pasa a la funcion teclado*/
    document.addEventListener("keypress",teclado);
};

/*Verifica la letra del teclado presionada. Si esta en la palabra la imprime y la ingresa
en el array de letras correctas; si no esta, la imprime con los errores y la ingresa
en el array de errores.*/
function teclado(event){
    var letraNoEncontrada = true; //Variable para saber si la letra esta NO está en la palabra
    var letraIngresada = event.key.toLocaleUpperCase()
    if ((letrasEncontradas.length<palabra.length)&&(letrasErradas.length<9)){
        if(validacionLetraIngresada(letraIngresada)){
            for(var z=0;z<palabra.length;z++){
                if (letraIngresada == palabra[z]){
                    letraNoEncontrada = false;
                    escribirLetra(palabra[z],z,"blue");
                    letrasEncontradas.push(letraIngresada);

                };
            };
            if ((letraNoEncontrada) && (!validacionLetraError(letraIngresada))){
                letrasErradas.push(letraIngresada);
                dibujarAhorcado(letrasErradas.length);
                escribirLetraError(letraIngresada,letrasErradas.length);
            }
        }
    }

    finDelJuego();
    
}

/*Verifica si se GANÓ o PERDIÓ. Genera Botón en canvas para volver al inicio de la página */
function finDelJuego(){
    if(letrasEncontradas.length==palabra.length){
        escribirPalabra("¡GANASTE!",600,400,"blue");
        crearBotonVolver();
        document.removeEventListener("keypress",teclado);
    }else{
        if (letrasErradas.length==9){
            escribirPalabra("¡FIN DEL JUEGO!",600,400,"RED");
            crearBotonVolver();
            document.removeEventListener("keypress",teclado);
            for(var t in palabra){
                escribirLetra(palabra[t],t,"red");
            }
        }
    }

    /*Chequea si el click en canvas se hizo cobre el botón */
    pantalla.onclick = inicio;
    function inicio(evento){
        var x = evento.pageX - pantalla.offsetLeft;
        var y = evento.pageY - pantalla.offsetTop;
        if ((x<630)&&(x>480)&&(y<770)&&(y>725)){
            document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});
        }
    }
}

agregarPalabra.addEventListener("click",function(event){
    let palabraIngresada = palabraNueva.value.toLocaleUpperCase();

    if ((!validarPalabraNueva(palabraIngresada)) || (palabraIngresada == "")){
        error.classList.remove("invisible");
        palabraNueva.focus();
        setTimeout(function(){
            error.classList.add("invisible");
        },2000);
        
    }else{
        if(validarPalabraRepetida(palabraIngresada)){
            repetida.classList.remove("invisible");
            palabraNueva.focus();
            setTimeout(function(){
            repetida.classList.add("invisible");
            },2000);
        }else{
            listaPalabras.push(palabraIngresada);
            localStorage.setItem("listaDePalabras",JSON.stringify(listaPalabras));
            agregada.classList.remove("invisible");
            setTimeout(function(){
            agregada.classList.add("invisible");
            },2000);
            palabraNueva.value="";
        }
    }
});