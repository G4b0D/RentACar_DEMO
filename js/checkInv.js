document.addEventListener("DOMContentLoaded",addlisteners);

function carro(idCarro,marca,modelo,placa, precio){
    this.idCarro = idCarro;
    this.marca = marca;
    this.modelo = modelo;
    this.placa = placa;
    this.precio = precio;
}                                                          
function addlisteners(){
    document.querySelectorAll('.rentbtn').forEach(item =>{
        item.addEventListener('click', () => {
            check(item.id);
        })
    })
}

function check(carId){
    localStorage.clear()
    let myurl = new URL("http://127.0.0.1:5000/cantidad")
    myurl.searchParams.set("cID",carId)
    fetch(myurl)
        .then(response => response.json())
        .then(data =>{
            if (data > 0){
                aceptar(carId);
            }
            else{
                alert('No hay carros en el inventario');
            }
        })
}


function aceptar(cId){
    data = {idCarro: cId}
    fetch('http://127.0.0.1:5000/obtenerCarro',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data =>{
        localStorage.removeItem('carro');
        let car = new carro(data[0].ID_CARRO,data[0].MARCA,data[0].MODELO,data[0].PLACA,data[0].PRECIO)
        localStorage.setItem('carro',JSON.stringify(car))
        window.location.href = "nuevoCliente.html"
    })
}