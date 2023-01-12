const switchButton = document.getElementById('switch');
const login = document.getElementById("login")
const inputUser  = document.querySelector("#usuario")
const inputPass  = document.querySelector("#contrasenia")
const errorLogin = document.querySelector("#logint")
const logout = document.querySelector("#logout")
const contenedorLogin = document.querySelector(".container-login")
let totalElement = document.querySelector(".cart-total-title");
const contadorCarrito = document.getElementById("contadorCarrito")







// insertar productos a la venta con DOM
let shoppingCartArray = []
let total = 0


function productosAHtml ( array ) {

    const contenedor = document.querySelector(".container-productos")

    array.forEach( ( productos ) => {
        const card = document.createElement("div")
        card.className = "card h-70" 
        card.innerHTML = `
        <div class="shop-item" id="${productos.id}">
            <span class="shop-item-title">${productos.nombre}</span>
            <img class="shop-item-image" src="${productos.img}">
        <div class="shop-item-details">
            <span class="shop-item-price">$${productos.precio}</span>
            <button class="btn btn-primary shop-item-button" type="button">COMPRAR</button>
        </div>
    </div>`
        contenedor.appendChild(card)
    })
}
productosAHtml(productos)



let addBtns = document.querySelectorAll(".shop-item-button");

addBtns=[...addBtns]

const cartContainer = document.querySelector(".cart-select")

//agrego prod al carro
addBtns.forEach(btn=>{
    btn.addEventListener('click', event =>{
    //buscar por id un producto     
        let actualID = parseInt(event.target.parentNode.parentNode.id)
        let actualProduct = productos.find(item => item.id === actualID)
        if(actualProduct.quantity === undefined){
            actualProduct.quantity = 1
        }
        //devuelve el cantidad del producto seleccionado
        //producto ya existe buscado por id
        let existe = false
        shoppingCartArray.forEach(producto =>{
            if(actualID == producto.id){
                existe = true
            }
        })
        if(existe){
            actualProduct.quantity++
        }else{
            shoppingCartArray.push(actualProduct)
        }
        //con DOM actualizo el carrito
       imprimirItemSelect()
        //actualizar valor total
       getTotal()
       //actualiza item seleccionado
       actualizarNumbersItems()
       //elimina item seleccionado
       eliminaItems()
                }) 
                
})
            


function getTotal(){
    let sumTotal
    let total = shoppingCartArray.reduce( (sum, item)=>{
        sumTotal = sum + item.quantity*item.precio
        return sumTotal
    }, 0);
    totalElement.innerText = `$${total}`
}

function imprimirItemSelect(){
    cartContainer.innerHTML = ``; //para no repetir el mismo producto en carro
    
    shoppingCartArray.forEach(item =>{
        cartContainer.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column-title">
                    <img class="cart-item-image" src=${item.img} width="100" height="100">
                    <span class="cart-item-title ">${item.nombre}</span>
                </div>
                <span class="cart-price cart-column">$${item.precio}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                    <button class="btn btn-danger" type="button">Eliminar</button>
                </div>
            </div>`
            
    });
    localStorage.setItem('shoppingCartArray', JSON.stringify(shoppingCartArray))
    // actualizamos con la longitud del carrito.
    contadorCarrito.innerText = shoppingCartArray.length 
    eliminaItems()
}

//incrementar la cantidad de items
function actualizarNumbersItems(){
    let inputNumber = document.querySelectorAll('.cart-quantity-input');
    inputNumber = [...inputNumber]
    inputNumber.forEach(item => {
        item.addEventListener('click', event=>{
                //busco nombre del producto elegido
            let itemTitle = event.target.parentElement.parentElement.childNodes[1].innerText
            let itemCantidad =parseInt(event.target.value);
                //busco el obj con ese titulo
            let itemElegido = shoppingCartArray.find( item => item.nombre === itemTitle)
                //console.log(itemElegido)
            itemElegido.quantity = itemCantidad;
                //actualizar el precio con el incremento anterior
            getTotal()
        });
    });
}
//funcion de eliminar items
function eliminaItems(){
    let eliminaBtns = document.querySelectorAll ('.btn-danger');
    eliminaBtns = [...eliminaBtns]
    eliminaBtns.forEach (btn => {
        btn.addEventListener('click', event=>{
            //busco nombre del producto elegido usando la variable anterior
        let itemTitle = event.target.parentElement.parentElement.childNodes[1].innerText    
            //busco el obj con ese titulo
        let itemElegido = shoppingCartArray.find( item => item.nombre === itemTitle)
            //eliminar objeto   
            shoppingCartArray = shoppingCartArray.filter(item => item != itemElegido)
             //con DOM actualizo el carrito
             
       imprimirItemSelect()
       getTotal()
       actualizarNumbersItems()
        })
    })
}
document.addEventListener ("DOMContentLoaded", () =>{
    if (localStorage.getItem('shoppingCartArray')){
        shoppingCartArray = JSON.parse(localStorage.getItem('shoppingCartArray'))
        imprimirItemSelect()
    }
})

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


// funcion ordenar, no logro que se impriman en html


const btnMenor = document.getElementById ("btn-menor");
let precio = document.querySelectorAll(".shop-item-price")    

btnMenor.onclick = () =>{ 
    console.log ("me hiciste click")
        const productosOrdenados = [...productos].sort((a, b) => {
            if ( a.nombre < b.nombre ){
                return -1
            } else if ( a.nombre > b.nombre){
                return 1
            } else {
                return 0
            }
        })
        console.log(productosOrdenados)
} 

  

   

