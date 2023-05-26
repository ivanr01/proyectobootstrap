class Cliente {
    constructor(nombre, apellido, inversion, numeroDeDias, intereses, resultadoInversion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.inversion = inversion;
        this.numeroDeDias = numeroDeDias;
        this.intereses = intereses;
        this.resultadoInversion = resultadoInversion;
    }
}

const infoCliente = [];


let tasaInteres = 0;
let numeroDeDias =0; 

if (numeroDeDias < 60) {
    tasaInteres = (0.07 / 365)
} else if (numeroDeDias >= 60 && tiempo < 180) {
    tasaInteres = (0.09 / 365)
} else if (numeroDeDias >= 180) {
    tasaInteres = (0.12 / 365)
} else {
    while (numeroDeDias < 0) {
        alert('El plazo ingresado es invalido, por favor ingrese valores numericos')
        tiempo = parseInt(prompt('Ingrese el plazo de su inversión en días'));
    }
}

function intereses(numeroDeDias, inversion, tasaInteres) {
    return Math.round(numeroDeDias * inversion * tasaInteres);
}



const formulario = document.getElementById('formulario');
    
formulario.addEventListener("submit", () => {
    let nombre = document.getElementById("nombre").value;
    localStorage.setItem("nombre", nombre);
    let apellido = document.getElementById("apellido").value;
    localStorage.setItem("apellido", apellido);
    let inversion = document.getElementById("inversion").value;
    localStorage.setItem("inversion", inversion);
    let numeroDeDias = document.getElementById("numeroDeDias").value;
    localStorage.setItem("numeroDeDias", numeroDeDias);
    formulario.reset();
});

let nombre = localStorage.getItem('nombre');
let apellido = localStorage.getItem('apellido');
let inversion = parseInt(localStorage.getItem('inversion'));
numeroDeDias = parseInt(localStorage.getItem('numeroDeDias'));

let contenedor = document.getElementById('contenedor');

if (numeroDeDias>0) {
    contenedor.innerHTML += `<h4><center>Gracias por la información, ${nombre}. Con su inversión inicial de $${inversion} obtendrá unos intereses por $${intereses(numeroDeDias, inversion, tasaInteres)} y el monto inicial más intereses sería de $${inversion + intereses(numeroDeDias, inversion, tasaInteres)}</center></h4>`
} else {
    
}
localStorage.clear();