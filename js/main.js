class Tarjeta {
    constructor(id, nombre, costoManejo, costoEnvio, img){
        this.id = id;
        this.nombre = nombre;
        this.costoManejo = costoManejo;
        this.costoEnvio = costoEnvio;
        this.img = img;
        this.cantidad = 1;
    }
}

const tarjetaDiez = new Tarjeta(10, 'Tarjeta Mastercard Standard con un 10% de rentabilidad EA en todos tus ahorros', 25000, 9900, "../img/card10.png");
const tarjetaVeinte = new Tarjeta(20, 'Tarjeta Mastercard Platinum con un 20% de rentabilidad EA en todos tus ahorros', 45000, 5900, "../img/card20.png");

const arrayTarjetas = [tarjetaDiez, tarjetaVeinte];

let shoppingBag = [];

const contenedorTarjetas = document.getElementById("contenedorTarjetas");

const mostrarTarjetas = () => {
    arrayTarjetas.forEach(tarjeta => {
        const card = document.createElement('div');
        card.classList.add('col-xl-6', 'col-md-6', 'mt-5', 'justify-content-center');
        card.innerHTML = `
        <div class="card text-center mb-3 justify-content-center" >
            <img src="${tarjeta.img}" class="card-img-top w-75 mx-auto" alt="${tarjeta.nombre}">
            <div class="card-body">
                <h5 class="card-title pb-4">${tarjeta.nombre}</h5>
                <p class="card-text">Cuota de manejo: $${tarjeta.costoManejo}</p>
                <p class="card-text">Costo de envío: $${tarjeta.costoEnvio}</p>
                <p class="card-text">Valor a pagar: $${tarjeta.costoEnvio+tarjeta.costoManejo}</p>

                <button id="boton${tarjeta.id}" class="m-3 botoncss rounded-4 p-3 fw-bold text-white">Adquirir</button>
            </div>
      </div>`
      contenedorTarjetas.appendChild(card);


      const boton = document.getElementById(`boton${tarjeta.id}`);
      boton.addEventListener('click', () =>{
        agregarCarrito(tarjeta.id);
        Toastify({
            text: "La tarjeta se añadió a tu carrito de compras",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
            background: "#F64740"}
          }).showToast();
      })

    })
}


mostrarTarjetas();




const agregarCarrito = (id) => {
    const tarjetaEnCarrito = shoppingBag.find(tarjeta => tarjeta.id == id);

    if(tarjetaEnCarrito) {
        tarjetaEnCarrito.cantidad++;

    } else {
        const tarjeta = arrayTarjetas.find(tarjeta => tarjeta.id === id);
        shoppingBag.push(tarjeta);
    }
    calcularTotal();
}


const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    shoppingBag.forEach(tarjeta => {
        const card = document.createElement("div");
        card.classList.add('col-xl-6', 'col-md-6', 'mt-5', 'justify-content-center');
        card.innerHTML = `
                        <div class="card text-center mb-3 justify-content-center">
                            <img src="${tarjeta.img}" class="card-img-top  w-75 mx-auto" alt="${tarjeta.nombre}">
                            <div class="card-body">
                            <p class="card-text">Cuota de manejo: $${tarjeta.costoManejo}</p>
                            <p class="card-text">Costo de envío: $${tarjeta.costoEnvio}</p>
                            <p class="card-text">Valor a pagar: $${tarjeta.costoEnvio+tarjeta.costoManejo}</p>  
                                <p> Cantidad: ${tarjeta.cantidad}</p>
                                <button id="eliminar${tarjeta.id}" class="m-3 botoncss rounded-4 p-3 fw-bold text-white"> Eliminar </button>
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${tarjeta.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(tarjeta.id);
        })
    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const tarjeta = shoppingBag.find(tarjeta => tarjeta.id === id);
    const indice = shoppingBag.indexOf(tarjeta);
    shoppingBag.splice(indice, 1);
    mostrarCarrito();
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    shoppingBag.forEach(tarjeta => {
        totalCompra += tarjeta.costoManejo * tarjeta.cantidad + tarjeta.costoEnvio;
    })
    total.innerHTML = `$${totalCompra}`;
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    shoppingBag = [];
    mostrarCarrito();
}






const input_currency = document.querySelector('#input_currency');
const output_currency = document.querySelector('#output_currency');
const input_amount = document.querySelector('#input_amount');
const output_amount = document.querySelector('#output_amount');
const exchange = document.querySelector('#exchange');
const rate = document.querySelector('#rate');

input_currency.addEventListener('change', compute);
output_currency.addEventListener('change', compute);
input_amount.addEventListener('input', compute);
output_amount.addEventListener('input', compute);

exchange.addEventListener('click', ()=>{
    const temp = input_currency.value;
    input_currency.value = output_currency.value;
    output_currency.value= temp;
    compute();
});

function compute(){
    const input_currency1 = input_currency.value;
    const output_currency1 = output_currency.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${input_currency1}`)
    .then(res => res.json())
    .then(res => {
        const new_rate = res.rates[output_currency1];
        rate.innerText = `1 ${input_currency1} = ${new_rate} ${output_currency1}`
        output_amount.value = (input_amount.value * new_rate).toFixed(2);
    })
}

compute();