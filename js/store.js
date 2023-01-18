const switchButton = document.getElementById('switch');
const login = document.getElementById("login")
const inputUser  = document.querySelector("#usuario")
const inputPass  = document.querySelector("#contrasenia")
const errorLogin = document.querySelector("#logint")
const logout = document.querySelector("#logout")
const contenedorLogin = document.querySelector(".container-login")

const contadorCarrito = document.getElementById("contadorCarrito")

let shoppingCartArray = JSON.parse(localStorage.getItem('shoppingCartArray')) || [];
// INSERTAR PRODUCTOS A LA VENTA CON DOM

fetch('https://63c415a98067b6bef6d337d0.mockapi.io/belAPI/productos')
    .then( res => res.json())
    .then( data => {
        let productosArray = data
        //console.log(productosArray)         
        const contenedor = document.querySelector(".container-productos")
        //console.log (contenedor)
            //imprimir productos en pantalla desordenado
            productosArray.forEach( ( productos ) => {
                const card = document.createElement("div")
                card.className = "card h-70"
                card.innerHTML += `
                    <div class="shop-item" id="${productos.id}">
                            <span class="shop-item-title">${productos.name}</span>
                            <img class="shop-item-image" src="${productos.img}">
                        <div class="shop-item-details">
                            <span class="shop-item-price">$${productos.price}</span>
                            <button id = "boton-${productos.id}" class="btn btn-primary shop-item-button" type="button">COMPRAR</button>
                        </div>
                    </div>`
                contenedor.appendChild(card)
                
            })
        })        
    .catch(() => console.log("lo hiciste mal!! Te dio error"))

  
//ORDENAR DE MENOR PRECIO A MAYOR


const btnCambio = document.getElementById("btn-menor")
btnCambio.addEventListener('click', menorMayor)

function menorMayor(){
    fetch('https://63c415a98067b6bef6d337d0.mockapi.io/belAPI/productos')
    .then( res => res.json())
    .then( data => cargarProductosOrdenados(data))
    .catch(() => console.log("lo hiciste mal!! Te dio error"))        

    function cargarProductosOrdenados (data) { 
        //llamo al btn ordenar
        let ascBtn = document.querySelectorAll("#btn-menor");
        //obtengo mi array de productos de la api
        let productosArray = data 
        //convierto de NodeList a array
        ascBtn = [... ascBtn]
        //ordenar productos 
            ascBtn.forEach( ( btn ) => {
                //console.log (ascBtn)
                //llamo al div contenedor de productos para ordenarlo
                let contenedorLleno = document.querySelector(".container-productos")
                //vacio el div donde se insertan
                contenedorLleno.innerHTML = ``;
                //console.log(contenedorLleno)
                //filtro por precio ascendente
                productosArray = data.sort((a, b) => {
                    if ( a.price < b.price ){
                        return -1
                    } else if ( a.price > b.price){
                        return 1
                    } else {
                        return 0
                    }
                })
                //console.log (productosArray)
                //imprimo en pantalla ordenado
                productosArray.forEach( ( productos ) => {
                            let card = document.createElement("div")
                            card.innerHTML += `
                            <div class="card h-70">
                                <div class="shop-item" id="${productos.id}">
                                        <span class="shop-item-title">${productos.name}</span>
                                        <img class="shop-item-image" src="${productos.img}">
                                    <div class="shop-item-details">
                                        <span class="shop-item-price">$${productos.price}</span>
                                        <button id = "boton-${productos.id}" class="btn btn-primary shop-item-button" type="button">COMPRAR</button>
                                    </div>
                                </div>
                            </div>`
                        contenedorLleno.appendChild(card)
                    })      
            })            
    }

}
    

// AGREGAR AL CARRITO
fetch('https://63c415a98067b6bef6d337d0.mockapi.io/belAPI/productos')
    .then( res => res.json())
    .then( data => {
        //obtengo mi array de productos de la api
        let productosArray = data 
        //let total = 0
        
        //llamo al btn comprar
        let addBtns = document.querySelectorAll(".shop-item-button");
        //convierto de NodeList a array
        addBtns=[... addBtns]
        
        //llamo al div del carrito para imprimir lo seleccionado 
        const cartContainer = document.querySelector(".cart-select")
        let totalElement = document.querySelector(".cart-total-title");
        addBtns.forEach(btn=>{
                btn.addEventListener('click', event =>{
                    //AGREGAR PRODUCTOS AL CARRO
                    
                    //buscar el id del producto clickeado    
                    let actualID = parseInt(event.target.parentNode.parentNode.id)
                    
                    //comparo los id del clickeado del array original
                    let actualProduct = productosArray.find(item => item.id == actualID)
                    
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
      
                    //fc que incrementa el carrito
                    function getTotal(){
                        let sumTotal
                        let total = shoppingCartArray.reduce( (sum, item)=>{
                            sumTotal = sum + (item.quantity*item.price)
                            return sumTotal
                        }, 0);
                        totalElement.innerText = `$${total}`
                    }
                    
                    //fc que imprime item en el contenedor carrito
                    function imprimirItemSelect(){
                        //para no repetir el mismo producto en carro
                        cartContainer.innerHTML = ``; 
                        
                        shoppingCartArray.forEach(item =>{
                            cartContainer.innerHTML += `
                                <div class="cart-row">
                                    <div class="cart-item cart-column-title">
                                        <img class="cart-item-image" src=${item.img} width="100" height="100">
                                        <span class="cart-item-title ">${item.name}</span>
                                    </div>
                                    <span class="cart-price cart-column">$${item.price}</span>
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
                                let itemElegido = shoppingCartArray.find( item => item.name === itemTitle)
                                    //console.log(itemElegido)
                                itemElegido.quantity = itemCantidad;
                                    //actualizar el precio con el incremento anterior
                                getTotal()
                            });
                        });
                    }
                    // //funcion de eliminar items
                    function eliminaItems(){
                        let eliminaBtns = document.querySelectorAll ('.btn-danger');
                        eliminaBtns = [...eliminaBtns]
                        eliminaBtns.forEach (btn => {
                            btn.addEventListener('click', event=>{
                                //busco nombre del producto elegido usando la variable anterior
                            let itemTitle = event.target.parentElement.parentElement.childNodes[1].innerText    
                                //busco el obj con ese titulo
                            let itemElegido = shoppingCartArray.find( item => item.name === itemTitle)
                                //eliminar objeto   
                                shoppingCartArray = shoppingCartArray.filter(item => item != itemElegido)
                                //con DOM actualizo el carrito
                                
                        imprimirItemSelect()
                        getTotal()
                        actualizarNumbersItems()
                            })
                        })
                        document.addEventListener ("DOMContentLoaded", () =>{
                             if (localStorage.getItem('shoppingCartArray')){
                                 shoppingCartArray = JSON.parse(localStorage.getItem('shoppingCartArray'))
                                 imprimirItemSelect()
                             }
                        })
                    }
                })
            })
    })
    .catch(() => console.log("lo hiciste mal!! Te dio error"))







   

//==================================modo oscuro==================================

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

//==================================login==================================

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

