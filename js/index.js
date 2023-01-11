const switchButton = document.getElementById('switch');
const login = document.getElementById("login")
const inputUser  = document.querySelector("#usuario")
const inputPass  = document.querySelector("#contrasenia")
const errorLogin = document.querySelector("#logint")
const logout = document.querySelector("#logout")
const contenedorLogin = document.querySelector(".container-login")




//modo oscuro

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



// login 

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
    swal({
        icon: "success",
        title: "Bienvenido a BEL PAESAGGIO",
        buttons: false,
        timer: 2500,
      });
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


//inicializacion de carrousel SWIPER

let swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });