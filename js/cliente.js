function cliente(idCliente,Nombre,Apellido,Correo,Telefono){
    this.idCliente = idCliente;
    this.Nombre = Nombre;
    this.Apellido = Apellido;
    this.Correo = Correo;
    this.Telefono = Telefono;
}

function verificarCliente(){
    localStorage.removeItem('cliente')
    let continuar = document.getElementById('registrar');
    continuar.removeEventListener('click',registrar);
    continuar.removeEventListener('click',ready);
    let idCliente = document.getElementById('cedula').value;
    let data = {idCliente: parseInt(idCliente)};
    fetch('http://127.0.0.1:5000/buscarCliente',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data =>{
        if(data){
            llenarDatos(parseInt(idCliente))
            continuar.addEventListener('click',ready)
        }
        else{
            continuar.addEventListener('click',registrar)
        }
    })
    .catch((error)=>{
        console.error('Error: ',error);
    })

}

function llenarDatos(n){
    let data = {idCliente: n}
    fetch('http://127.0.0.1:5000/obtenerCliente',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('nombre').value = data.NOMBRE;
        document.getElementById('apellido').value = data.APELLIDO;
        document.getElementById('email').value = data.CORREO;
        document.getElementById('telefono').value = data.TELEFONO;
        ready(n,data.NOMBRE,data.APELLIDO,data.CORREO,data.TELEFONO)
    })
    .catch((error)=>{
        console.error('Error: ',error);
    })
}

function registrar(){
    let cedula = parseInt(document.getElementById('cedula').value)
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let correo = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let data = {
            idCliente: cedula,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono
            }
    fetch('http://127.0.0.1:5000/agregarCliente',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(function(response){
        return response.text
    })
    .then(function(text){
        console.log(text)
        ready(cedula,nombre,apellido,correo,telefono)
    })
    .catch(function(error){
        console.error(error)
    })
}

function ready(idCliente,nombre,apellido,correo,telefono){
    let client = new cliente(idCliente,nombre,apellido,correo,telefono);
    localStorage.setItem('usuario',JSON.stringify(client));
    window.location.href = "rentar.html"
}

