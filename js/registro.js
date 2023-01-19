const nombre = document.getElementById ("name")
const email = document.getElementById ("email")
const pass = document.getElementById ("password")
const form = document.getElementById ("form")
const parrafo = document.getElementById ("warnings")


form.addEventListener("submit", e => {
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if(nombre.value.length < 4){
        warnings += "El nombre no es valido<br>"
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += "El email no es valido <br>"
        entrar = true
    }
    if(pass.value.length < 8){
        warnings += "La contraseña no es valida <br>"
        entrar = true
    }
    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        swal({
            icon: "success",
            title: "Enviado",
            text: "Ya podes ingresar a nuestra web",
            buttons: false,
            timer: 3500,
        });
    }
           
    fetch ("https://63c415a98067b6bef6d337d0.mockapi.io/belAPI/usuarios",{
		method: "POST",	 
		body: JSON.stringify({
			"name": nombre.value,
			"password" : pass.value,
			"mail": email.value
		}),
		headers: {
			"content-Type": "application/json"
		}
	})

	.then(res => res.json())
	.then(data => console.log(data))
})

