const switchButton = document.getElementById('switch');
const login = document.getElementById("login")
const inputUser  = document.querySelector("#usuario")
const inputPass  = document.querySelector("#contrasenia")
const errorLogin = document.querySelector("#logint")
const logout = document.querySelector("#logout")
const contenedorLogin = document.querySelector(".container-login")

const nombre = document.getElementById("name")
const mail =  document.getElementById("mail")
const consulta =  document.getElementById("consulta")
const asunto =  document.getElementById("asunto")
const formConsulta =  document.getElementById("form")
const parrafo = document.getElementById("warnings")

//================================== FORMULARIO CONSULTAS ==================================


formConsulta.addEventListener("submit", e => {
    e.preventDefault()
    let warnings = ""
    let entrar = false
    
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML =""

    if(nombre.value.length < 4){
        console.log(nombre.value.length )
        
        warnings += "El nombre no es valido<br>"
        entrar = true
        
    }             
    if(!regexEmail.test(mail.value)){        
        warnings +=  "El email no es valido <br>" 
        entrar = true        
    }
    if(asunto.value.length < 6){
        warnings += "El asunto no es valido<br>"
        entrar = true
    
    } 
    if(consulta.value.length > 20 ){
        warnings += "La consulta es muy extensa<br>"
           entrar = true
    }
    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        swal({
            icon: "success",
            title: "Enviado",
            text: "Te responderemos a la brevedad",
            buttons: false,
            timer: 3500,
        });
        
    }
})




//===================================== MODO OSCURO ========================================

switchButton.addEventListener('click', () => {
    //toggle en el HTML body con la class 'light'   
    document.body.classList.toggle('light');
    //activa toggle del HTML button con el id='switch' 
    //guardar en ls
    switchButton.classList.toggle('active');
    if (document.body.classList.contains('light')){
        subirAlLocal("light-mode", true);
    }else{
        subirAlLocal("light-mode", false);
    }
});
//
//Obtener el modo actual
if (localStorage.getItem("light-mode") === "true"){
    document.body.classList.add('light');
    switchButton.classList.add('active');
}else {
    document.body.classList.remove('light');
    switchButton.classList.remove('active');
}



//===================================== LOGUIN ============================================


const subirAlLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const bajarDelLocal = (key) => {
    const clave = localStorage.getItem(key)
    return JSON.parse(clave)
}



login.onsubmit = ( event ) => {
    event.preventDefault()
        fetch("https://63c415a98067b6bef6d337d0.mockapi.io/belAPI/usuarios")
        .then( res => res.json())
        .then( data => {
            let usuarios = data
            // console.log(usuarios)
            let entrar = false
            usuarios.forEach(element => {
                // console.log(element.name)
                if ( inputUser.value === element.name && inputPass.value === element.password){
                    subirAlLocal("login", true)
                    entrar = true
                    contenedorLogin.style.display = "none"  
                    logout.style.display = "block"
                    swal({
                        icon: "success",
                        title: "Bienvenido a BEL PAESAGGIO",
                        text: "Empeza a disfrutar de nuestra web",
                        buttons: false,
                        timer: 3500,
                    });
                }else {        
                    errorLogin.style.display = "block"
                }
                
            });              
        })    
}
   


//para seguir conectado aunque se cierre el navegador

function validarLogin ( value ) {
    if ( value !== true ) {
        contenedorLogin.style.display = "flex"
        logout.style.display = "none"
    }else{
        contenedorLogin.style.display = "none"
        logout.style.display = "block"
    }
}


validarLogin(bajarDelLocal("login"))


//desloguear usuario

logout.onclick = () => {
    localStorage.removeItem( "login" )
    validarLogin(bajarDelLocal("login"))
    login.reset()
}

