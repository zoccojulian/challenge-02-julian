var abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/*Valida que la letra ingresada sea la correcta
Devuelve TRUE si la letra esta en la palabra y todavia no se ingreso*/
function validacionLetraIngresada(letra){
    var letraCorrecta = false;
    var letraRepetida = false
    letraCorrecta = abecedario.includes(letra);
    letraRepetida = letrasEncontradas.includes(letra);
    if(letraCorrecta && !letraRepetida){
        return true;
    }else{
        return false
    }
}

/*Valida que la letra errada ya no este en el array de errores */
function validacionLetraError(letraError){
    var error = false;
    error = letrasErradas.includes(letraError)
    return error;
}

/*Valida que la palabra ingresada no tenga caracteres especiales */
function validarPalabraNueva(palabra){

    for(i=0;i<palabra.length;i++){
        if (!letraAbecedario(palabra[i])){
            return false;
        }
    }
    return true;
}

/*Valida que la letra este en el abecedario */
function letraAbecedario(letra){
    return abecedario.includes(letra);
}

/*Valida que la palabra ingresada no este en la lista de palabras */
function validarPalabraRepetida(palabra){
    return listaPalabras.includes(palabra);
}