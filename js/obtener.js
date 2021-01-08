document.addEventListener("DOMContentLoaded",obtenerNombre)
function crearTabla(datos){
    var table = document.getElementById('myTable')
    const data = datos
		for (var i = 0; i < data.length; i++){
            nombre = data[i].NOMBRE.concat(" ",data[i].APELLIDO)
			var row = `<tr>
							<td>${nombre}</td>
							<td>${data[i].CORREO}</td>
							<td>${data[i].TELEFONO}</td>
					  </tr>`
			table.innerHTML += row
        }
    }

function obtenerNombre(){
    fetch('http://127.0.0.1:5000/clientes')
        .then(function(res){
            return res.json();
        })
        .then(function(clientes){
            crearTabla(clientes);
        })
}