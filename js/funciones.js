function Apireloj(){
    fetch('http://worldtimeapi.org/api/timezone/America/Santiago')
        .then(response => response.json())
        .then(data =>{
            let hora = document.getElementById("hora");
            
            var reloj = data.datetime.substring(11, 19);

            hora.innerHTML = "Hora: " + reloj;
        })
}
function actualizaReloj(){
    Apireloj();
    setInterval(Apireloj, 1000);
}

$(function(){
    $("#loginform").validate({
        rules:{
            email:{
                required: true,
                email: true
            },
            password:{
                required:true,
                minlength: 8
            }
        },
        messages:{
            email:{
                required:"El Correo es Obligatorio.",
                email:"Formato correo no valido."
            },
            password:{
                required:"Debe Ingresar una Contraseña",
                minlength:"Debe contener al menos 8 Caracteres"
            }
        }
    })
})

$("#loginform").submit(function (e) {
    e.preventDefault();

    let usuario = document.getElementById("inptemail").value;
    let passw = document.getElementById("inptpassw").value;
    let logininfo = JSON.parse(localStorage.getItem("UserData"));
    
    if(logininfo.some(user => user.email === usuario) && logininfo.some(pass => pass.password == passw)){
        alert("Bienvenido");
        window.location.href = "index.html";
    
    }else if(usuario == "" || passw == ""){
        alert("Porfavor ingrese los datos solicitados");
    }else{
        alert("Usuario no Encontrado");
    }    
    
});

function userRegister(){
    var rnombre = document.getElementById("inptnombre").value;
    var rapellido = document.getElementById("inptapellido").value;
    var remail = document.getElementById("inptemail").value;
    var rpass = document.getElementById("inptpassw").value;
    let regArray = JSON.parse(localStorage.getItem("UserData")) || [];
    
    if (regArray.some(user => user.email === remail)) {
        alert("El Email ya esta registrado.");
        return;
    }
    regArray.push({nombre: rnombre, apellido: rapellido, email: remail, password: rpass});
    localStorage.setItem("UserData", JSON.stringify(regArray));
    window.location.replace = "login.html";
}

$(function(){
    $("#regform").validate({
        rules:{
            nombre:{
                required: true,
                minlength: 3
            },
            apellido:{
                required: true,
                minlength: 3
            },
            email:{
                required: true,
                email: true
            },
            password:{
                required:true,
                minlength: 8
            }
        },
        messages:{
            nombre:{
                required:"Debe Ingresar su Nombre",
                minlength:"Debe ingresar al menos 3 Caracteres"
            },
            apellido:{
                required:"Debe Ingresar su Apellido",
                minlength:"Debe ingresar al menos 3 Caracteres"
            },
            email:{
                required:"El Correo es Obligatorio.",
                email:"Formato correo no valido."
            },
            password:{
                required:"Debe Ingresar una Contraseña",
                minlength:"Debe contener al menos 8 Caracteres"
            }
        }
    })
})


var array_productos = [];

        if (localStorage.getItem('Productos')) {
            array_productos = JSON.parse(localStorage.getItem('Productos')) || [];
        }

        function comprar(id) {
            var producto = $('#producto-' + id);

            var p = {
                id: id,
                img: producto.data('img'),
                nombre: producto.data('nombre'),
                precio: producto.data('precio')
            };

            array_productos.push(p);

            localStorage.setItem('Productos', JSON.stringify(array_productos));
            llenar_carro();
        }

        function llenar_carro() {
            $('#carrito-producto').html('');   
            var texto = '';
            var total = 0;
            array_productos.forEach(producto => {
                texto = texto + `
                <tr>
                  <td><img src="${producto.img}" width="50px"></td>
                  <td>${producto.nombre}</td>
                  <td>$${producto.precio}</td>
                </tr>
                `;

                total += producto.precio;
            });

            $('#carrito-producto').append(texto);         
            $('#carrito-precio').html(total);       
            $('#carrito-precio1').append(total);    
        }

        function vaciarCarro(){
            localStorage.removeItem('Productos');
            alert("Compra enviada Exitosamente")
            window.location.href = "index.html"
        }



function onLoad(){
    actualizaReloj()
    llenar_carro()
}

function refresh() {
    window.location.href = "juego.html"
}

function refresh2() {
    window.location.href = "juego2.html"
}