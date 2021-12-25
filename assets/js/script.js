var valorneto = 0
var indexx = 1
var fechacoti = prompt("Hola papá, pon la fecha de la cotización", "24 - 12 - 2021")

// Las funcione de correción tienen q estar afuera

function arreglarcotizacion(numerofila) {

    let iddemierda = "total" + numerofila
    let idfilaxcorregir = "fila" + numerofila
    let correccionValorNeto = document.getElementById(iddemierda).innerHTML

    valorneto = valorneto - parseInt(correccionValorNeto)

    let nuevoproducto = prompt(`corregir producto fila ${numerofila}`, "Nuevo producto fila " + numerofila + "Ej: Pistones")
    let nuevovalor = prompt(`corregir valor fila ${numerofila}`, "Nuevo valor fila " + numerofila + "Ej: 40000")
    let nuevacantidad = prompt(`corregir cantidad fila ${numerofila}`, "Nueva cantidad fila " + numerofila + "Ej: 3")

    let total = nuevovalor * nuevacantidad

    let tablacorregida = `
                         <th scope="row">
                         <p id="producto${numerofila}" onclick="arreglarcotizacion('${numerofila}')">
                         ${nuevoproducto}
                         </p></th>
                         <td> 
                         <p id="valorunitario${numerofila}" onclick="arreglarcotizacion('${numerofila}')">                                            
                         ${nuevovalor}</p></td>
                         <td>
                         <p id="cantidad${numerofila}" onclick="arreglarcotizacion('${numerofila}')">
                         ${nuevacantidad}</p></td>
                         <td>
                         <p id="total${numerofila}" onclick="arreglarcotizacion('${numerofila}')">
                         ${total}</p></td>   
                      `
    valorneto += parseInt(total)

    document.getElementById(idfilaxcorregir).innerHTML = tablacorregida

    return generartablavalores()
}

function ivaseparado(precio) {
    let iva = (precio * 1.19) - precio
    return iva.toFixed(0)
};

function preciototal(precio) {
    let ultimovalor = precio * 1.19
    return ultimovalor.toFixed(0)
}

function generartablavalores() {
    document.getElementById("valorneto").innerHTML = valorneto
    document.getElementById("iva").innerHTML = ivaseparado(valorneto)
    document.getElementById("totaltotal").innerHTML = preciototal(valorneto)
}


// test pdf

function generatePDF() {
    var doc = new jsPDF();  //create jsPDF object
    
     doc.fromHTML(document.getElementById("palpdf"), // page element which you want to print as PDF
     15,
     15, 
     margin = 
     {
       'width': 150  //set width
     },
     function(a) 
      {
       doc.save("Presupuesto SMIntegralesAgricolas" + fechacoti +".pdf"); // save file name as HTML2PDF.pdf
     });
   }













// eventos al cargar la página

window.addEventListener('load', () => {


    function generartabla(ind) {


        let producto = prompt("Escribe el nombre del producto", "Repuesto")
        let valorunitario = prompt("Precio unitario SIN IVA", 1000)
        let cantidad = prompt("Cantidad de productos", 2)

        let total = valorunitario * cantidad

        let dirialtabla = `<tr id="fila${ind}"> 
                         <th scope="row">
                         <p id="producto${ind}" onclick="arreglarcotizacion('${ind}')">
                         ${producto}
                         </p></th>
                         <td> 
                         <p id="valorunitario${ind}" onclick="arreglarcotizacion('${ind}')">                                            
                         ${valorunitario}</p></td>
                         <td>
                         <p id="cantidad${ind}" onclick="arreglarcotizacion('${ind}')">
                         ${cantidad}</p></td>
                         <td>
                         <p id="total${ind}" onclick="arreglarcotizacion('${ind}')">
                         ${total}</p></td>  
                         </tr> 
                      `
        valorneto += parseInt(total)
        console.log(ind)
        return document.getElementById("bodytabla").innerHTML += dirialtabla


    };


    function askfordata() {
        if (confirm("Agregar datos para la cotización")) {

            generartabla(indexx)
            indexx++
            askfordataItinerante()


        } else { alert("No se ha generado una cotización") }

    };

    function askfordataItinerante() {
        if (confirm("Item agregado correctamente. Deseas agregar más productos?")) {

            generartabla(indexx)
            indexx++
            askfordataItinerante()

        } else { alert("Presupuesto generado con éxito.") }

    };









    // Desarrollo

    

    document.getElementById("fecha").innerHTML = fechacoti

    askfordata()

    generartablavalores()



})