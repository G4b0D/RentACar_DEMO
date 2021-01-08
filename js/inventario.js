document.addEventListener("DOMContentLoaded",obtenerInventario)

function obtenerInventario(){
    fetch('http://127.0.0.1:5000/obtenerInventario')
        .then(function(res){
            return res.json();
        })
        .then(function(inventario){
            crearTabla(inventario);
        })
}


function crearTabla(datos){
    var table = document.getElementById('myTable')
    const data = datos
		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].PLACA}</td>
							<td>${data[i].MARCA}</td>
							<td>${data[i].MODELO}</td>
					  </tr>`
			table.innerHTML += row
        }
}