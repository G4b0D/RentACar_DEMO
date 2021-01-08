const client = JSON.parse(localStorage.getItem('usuario'));
const car = JSON.parse(localStorage.getItem('carro'));
document.addEventListener('DOMContentLoaded',llenar)


function imprimir(){
    let fecha = document.getElementById('fechaInicio').value;
    console.log(fecha)
}


function llenar(){
    document.getElementById('nombre').value = client.Nombre
    document.getElementById('apellido').value = client.Apellido
    document.getElementById('cedula').value = client.idCliente
    document.getElementById('marca').value = car.marca
    document.getElementById('modelo').value = car.modelo
}


function calcularprecio(){
    var date1 = Date.parse(document.getElementById('fechaInicio').value)
    var date2 = Date.parse(document.getElementById('fechaFinal').value)
    var timediff = date2 -date1
    var datediff = Math.floor(timediff / (1000 * 60 * 60 * 24))
    var precio = datediff * parseInt(car.precio)
    document.getElementById('precio').value = precio
    return precio;
}

function rentar(){
    let fechaIni = document.getElementById('fechaInicio').value
    let fechaFin = document.getElementById('fechaFinal').value
    let rentId = Date.now();
    let precio = calcularprecio();
    let metodoPago = document.getElementById("metodo").value
    let idCliente = parseInt(client.idCliente)
    let placa = car.placa
    let data = {
        idReserva: rentId,
        idCliente: idCliente,
        precio: precio,
        placa: placa,
        metodo: metodoPago,
        fechaIni: fechaIni,
        fechaFin: fechaFin
    }
    fetch('http://127.0.0.1:5000//reservar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text)
    .then(text=>{
        console.log(text);
        alert('Se ha completado la reserva');
        window.location.href='index.html'
    })
}