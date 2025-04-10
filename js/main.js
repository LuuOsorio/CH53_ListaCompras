//Validando los campos 
const txtName = document.getElementById("Name"); //campo de nombre
const txtNumber = document.getElementById("Number"); //campo de cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //regresa varios elementos de un elemento, pero con .item(0), que es el primer elemento que se requiere y así entramos al body del elemento.

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const btnLimpiarTodo = document.getElementById("btnClear");

//Numeración de la primera columna de la tabla
let cont = 0; // primer variable para tabla
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array(); //[]; nuevo arreglo almacena los elementos de la tabla


function validarCantidad() {
    if (txtNumber.value.trim().length <= 0) { //Si la cantidad es menor o igual a cero retorna falso 
        return false;
    }//length<=0

    if (isNaN(txtNumber.value)) { //Evalua si es un número
        return false;
    }//isNaN

    if (Number(txtNumber.value) <= 0) {
        return false;

    }//<=0

    return true;
}//validarCantidad


//función para inventar precio

function getPrecio() {
    return Math.round((Math.random() * 10000)) / 100;   //random da un numero aprox al número 100, y round da dos decimales
}//getPrecio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true; // bandera para que cada funcion sea valido

    //se limpia 
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    //txtNumber.value = txtNumber.value.trim();


    txtName.value = txtName.value.trim();  //hace referencia al input del tipo text y trim quita espacios al escribir
    txtNumber.value = txtNumber.value.trim();


    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red"; //borde en rojo
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false; //falso, cuando no se cumple la función
    } //length>=3

    if (!validarCantidad()) {
        txtNumber.style.border = "solid medium red"; //borde en rojo
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;  //falso, cuando no se cumple la función
    } //validarCantidad


    //función para validar funciones

    if (isValid) { // si paso las validaciones
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                   <td>${cont}</td>
                   <td>${txtName.value} </td>
                   <td>${txtNumber.value} </td>
                   <td>${precio} </td>
                   </tr>`;

        // se crea un objeto llamado, elemento, con notacion JSON.
        let elemento = {
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio
        };
        // agregar el objeto, al arreglo con push, en vez de unshift ya que push es más rápido.
        datos.push(elemento);

        // se almacena el arreglo de datos, en el navegador para que se queden ahí, con el localStorage, y con
        // JSON.stringify que convierte a string
        localStorage.setItem("datos", JSON.stringify(datos));




        cuerpoTabla.insertAdjacentHTML("beforebegin", row)


        //Asignacion de valores
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;

        let resumen = {
            "cont": cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        };

        // se almacena el arreglo de datos, en el navegador para que se queden ahí, con el localStorage, y con
        // JSON.stringify que convierte a string
        localStorage.setItem("resumen", JSON.stringify(resumen));


        // se va limpiando.
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isValid

}); //btnAgregar.addEventListener click


window.addEventListener("load", function (event) {
    event.preventDefault();

    if (this.localStorage.getItem("datos") != null) {
        datos = JSON.parse(this.localStorage.getItem("datos")); //aqui dentro del documento
    } // datos != null


    datos.forEach((d) => {
        let row = `<tr>
                <td>${d.cont} </td>
                <td>${d.nombre} </td>
                <td>${d.cantidad} </td>
                <td>${d.precio} </td>
                </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });//datos.forEach

    if (this.localStorage.getItem("resumen") != null) {
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }// resumen != null
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;


}); //window.addEvenListener load


//Agregar la funcionalidad del botón limpiar todo
//Resumen
//Tabla
//Campos
//Alerta
//localstorage

//no usar local storage.clear
btnLimpiarTodo.addEventListener("click", function(event) {
    event.preventDefault();

    // Limpiar variables
    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    datos = [];

    // Limpiar resumen
    contadorProductos.innerText = "";
    productosTotal.innerText = "";
    precioTotal.innerText = "$";
    
    // Limpiar tabla
    cuerpoTabla.innerHTML = "";

    // Limpiar campos del formulario
    txtName.value = "";
    txtName.style.border = "";
    txtNumber.value = "";
    txtNumber.style.border = "";

    // Limpiar alertas
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    // Limpiar localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
});//btnLimpiarTodo


