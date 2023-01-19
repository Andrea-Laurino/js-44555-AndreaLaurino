const switchButton = document.getElementById('switch');
const login = document.getElementById("login")
const inputUser  = document.querySelector("#usuario")
const inputPass  = document.querySelector("#contrasenia")
const errorLogin = document.querySelector("#logint")
const logout = document.querySelector("#logout")
const contenedorLogin = document.querySelector(".container-login")

const inputName = document.querySelector("#input-name")
const inputMail = document.querySelector("#input-mail")
const inputTxt = document.querySelector("#input-txt")

const errorName = document.querySelector("#name-error")
const errorMail = document.querySelector("#mail-error")
const errorTxt = document.querySelector("#txt-error")

//================================== FORMULARIO CONSULTAS ==================================

formLogin.onsubmit = (e) =>{
    e.preventDefault()
    for ( let i = 0; i < inputMail.length; i++){
        let arroba = false
              if (inputMail.value[i] === "@"){
                  arroba = true;
              }else{
                  arroba != true;
                  errorMail.style.display = "block"
              }return arroba;
    }

}




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

const datosUsuario = {
    user: "andrea",
    password: "lopez123"
}


login.onsubmit = ( event ) => {
    event.preventDefault()
    if ( inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password ) {
        subirAlLocal("login", true)
        contenedorLogin.style.display = "none"  
        logout.style.display = "block"      
    } else {        
        errorLogin.style.display = "block"
    }
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


