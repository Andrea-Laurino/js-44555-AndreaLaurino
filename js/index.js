const switchButton = document.getElementById('switch');
const login = document.getElementById("login")
const inputUser  = document.querySelector("#usuario")
const inputPass  = document.querySelector("#contrasenia")
const errorLogin = document.querySelector("#logint")
const logout = document.querySelector("#logout")
const contenedorLogin = document.querySelector(".container-login")




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


//=============================== CARROUSEL CON SWIPER ===================================== 

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