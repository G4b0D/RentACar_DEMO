document.addEventListener("DOMContentLoaded",obtenerRentas)

function obtenerRentas(){
    fetch('http://127.0.0.1:5000/obtenerRentas')
        .then(function(res){
            return res.json();
        })
        .then(function(rentas){
            crearTabla(rentas);
        })
}


function crearTabla(datos){
    var table = document.getElementById('myTable')
    const data = datos
		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].idReserva}</td>
							<td>${data[i].idCliente}</td>
                            <td>${data[i].Nombre}</td>
                            <td>${data[i].MARCA}</td>
                            <td>${data[i].MODELO}</td>
                            <td>${data[i].fechaInicio}</td>
                            <td>${data[i].fechaFin}</td>
                            <td><button type="button" class="btn btn-primary" onclick="liberar(${data[i].Placa})">Terminar</button></td>
					  </tr>`
			table.innerHTML += row
        }
}


function liberar(plc){
    const data = {
        placa: plc
    }
    fetch('http://127.0.0.1:5000/liberar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text)
    .then(text=>{
        console.log(text);
        alert('Se ha terminado la reserva');
    })
}