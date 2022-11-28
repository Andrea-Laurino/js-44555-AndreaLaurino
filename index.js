
let nombre = prompt ("ingrese su nombre");
let nota = prompt ("ingrese su nota");

const ingresoNota = (nombre,nota) => {
    if (nota.length <= 30){ //aca paso los 'string' a number para poder hacer la comparacion
    alert ("tu nombre es:" + " " + `${nombre}`+ " " + "Tu comentario: " + `${nota}`); // podria haber puesto una alerta diciendo que era true, pero preferi diera alerta de lo que habia ingresado en el prompt
    }else{
    alert ("Esta nota excede la cantidad de caracteres disponibles.") //siendo esta falsa, daria el mensaje q excede caracteres.
    }
}

ingresoNota (nombre,nota);


const solicitud = () => {
    for ( let i = 1; i <= 3; i++ ) { //bucle con 3 iteraciones en las cuales envian una alerta de nueva amistad 
        confirm ("El usuario " + `${i}` + " te envió una solicitud de amistad")
    }
}

solicitud();