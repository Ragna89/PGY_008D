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