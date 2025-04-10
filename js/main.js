//Validando los campos 
let txtName = document.getElementById("Name"); //campo de nombre
let txtNumber = document.getElementById("Number"); //campo de cantidad
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //regresa varios elementos de un elemento, pero con .item(0), que es el primer elemento que se requiere y así entramos al body del elemento.

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

//Numeración de la primera columna de la tabla
let cont = 0; // primer variable para tabla
let costoTotal = 0;
let totalEnProductos = 0;

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

        cuerpoTabla.insertAdjacentHTML("beforebegin", row)


        //Asignacion de valores
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;

        // se va limpiando.
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isValid

}); //btnAgregar

