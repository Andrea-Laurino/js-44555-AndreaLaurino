const productos = [{
    "id": 1,
    "nombre": "Pino",
    "precio": 1500,
    "categoria": "Arboles",
    "tipo": "planta de exterior",
    "oferta": false,
    },{
    "id": 2,
    "nombre": "Santa Rita",
    "precio": 4000,                                 //con el descuento quedaria 3200
    "categoria": "Planta",
    "tipo": "planta de interior",
    "oferta": true,
    },{
    "id": 3,
    "nombre": "Erica",
    "precio": 500,
    "categoria": "Arbusto",
    "tipo": "planta de exterior",
    "oferta": false,
    },{
    "id": 4,
    "nombre": "Latania",
    "precio": 6500,
    "categoria": "Palmera",
    "tipo": "planta de exterior",
    "oferta": false,
    },{
    "id": 5,
    "nombre": "Lavanda",
    "precio": 900,
    "categoria": "Floral",
    "tipo": "planta de exterior",
    "oferta": false,
    },{
    "id": 6,
    "nombre": "Rosales",
    "precio": 4500,
    "categoria": "Floral",
    "tipo": "planta de exterior",
    "oferta": false,
    },{
    "id": 7,
    "nombre": "Costilla de Adan",
    "precio": 1500,                                 //con el descuento quedaria en 1200
    "categoria": "Planta",
    "tipo": "planta de Interior",
    "oferta": true,
    },{
    "id": 8,
    "nombre": "Limon 4 Estaciones",
    "precio": 3500,
    "categoria": "Arbol Frutal",
    "tipo": "planta de exterior",
    "oferta": false,
    },{
    "id": 9,
    "nombre": "Narajo",
    "precio": 3500,                                      //con el descuento quedaria en 2800
    "categoria": "Arbol Frutal",
    "tipo": "planta de exterior",
    "oferta": true,
    },{
    "id": 10,
    "nombre": "Mandarino",
    "precio": 3500,
    "categoria": "Arbol Frutal",
    "tipo": "planta de exterior",
    "oferta": false,
    },{
    "id": 11,
    "nombre": "Maceta chica",
    "precio": 150,                                  //con el descuento quedaria en 120
    "categoria": "accesorio",
    "tipo": "Ceramica",
    "oferta": true,
    },{
    "id": 12,
    "nombre": "Maceta grande",
    "precio": 200,
    "categoria": "accesorio",
    "tipo": "Plastico",
    "oferta": false,
    },{
    "id": 13,
    "nombre": "tierra fertil de jardin",
    "precio": 1500,                                 //con el descuento quedaria en 1200
    "categoria": "Tierra x 2kg",
    "tipo": "Orgánico",
    "oferta": true,
    },{
    "id": 14,
    "nombre": "tierra fertil",
    "precio": 3500,
    "categoria": "tierra x 50kg",
    "tipo": "Orgánico",
    "oferta": false,
    },{
    "id": 15,
    "nombre": "Humus de lombris",
    "precio": 300,
    "categoria": "tierra",
    "tipo": "Orgánico",
    "oferta": false,
    }]
    


//funcion que verifica cual esta en oferta y le aplica un 20% de descuento
function descuento () {
    productos.forEach(elemento => {
        if (elemento.oferta) {
        console.log(elemento.precio * 0.80) 
        }
    })
   
}

descuento()

//funcion que ordena de manera ascendente con sort y realiza una copia segura
const productosAscendente = [...productos].sort((a, b) => {
    if ( a.nombre < b.nombre ){
        return -1
    } else if ( a.nombre > b.nombre){
        return 1
    } else {
        return 0
    }
})

console.table(productos) //lista los productos s/ordenar
console.table(productosAscendente) //lista la copia ordenada ascendente


//funcion que lista en consola las ofertas disponibles
function verOfertas (){
    let offer = confirm ("¿Quieres ver las OFERTAS de esta semana?")
    if (offer){
    let ofertaSemanal = productos.filter((a) => {
        return a.oferta
    })  
    console.table(ofertaSemanal)
   }
}  
verOfertas()

//funcion que verifica si la busqueda de un producto coincide con algun producto del array.
function buscarProducto () {
    let busqueda = prompt ("¿Quiere encontrar algun producto? Elige entre estos producto: Pino, Naranjo; Rosales, Lavanda, Maceta, Tierra Fertil")
	
    let producto = productos.find ((elemento) =>{
    return elemento.nombre === busqueda
    })
    alert ("Su producto seleccionado: " + `${producto.nombre}` + " Tiene un precio de: $" + `${producto.precio}` + " y Su categoria: " + `${producto.categoria}`)
}
buscarProducto();
