document.addEventListener("keyup", e=>{
  if (e.target.matches("#buscador")){
      if (e.key ==="Escape")e.target.value = ""
      document.querySelectorAll(".tarjeta").forEach(producto =>{

          producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
      })
  }
});



///Agregar productos
var botonesAgregarAlCarrito = document.getElementsByClassName('container_agregar');
var lista = document.getElementById("lista_productos");
var suma = 0;

// Contador
var contador = document.querySelector("#carrito");
function contar(cantidad){
	var añadido = document.createElement("div");
	añadido.innerHTML = '<span class="contador"><p>'+ cantidad.toString() +'</p></span>';
	
	if(contador.childNodes[1] == null){
		contador.appendChild(añadido);
		console.log("continue");
	}else{
		contador.appendChild(añadido);
		contador.removeChild(contador.childNodes[2]);
	}
}

// Sumar el total de los productos
function sumarLosProductos(sumaResultado){
	var total = document.getElementById("resultado");
	var resultado = document.createElement("p");
	resultado.setAttribute("class","listado")
	resultado.innerHTML = 'Total..........................$'+ sumaResultado.toFixed(2).toString();
	if(total.childNodes[0] == null){
		total.appendChild(resultado);
		console.log("continue");
	}else{
		total.appendChild(resultado);
		total.removeChild(total.childNodes[0]);
	}
}


for(var i=0; i<botonesAgregarAlCarrito.length;i++){
    var button = botonesAgregarAlCarrito[i]
    button.addEventListener("click", (function(titulo, precio) {
        return function(event) {
			event.stopImmediatePropagation();
			suma += parseFloat(precio.textContent);
			var sumaResultado = Math.round(suma * 100)/100
			console.log(suma.toString())

            var nuevoElemento = document.createElement("div");
            nuevoElemento.innerHTML = '<p class="listado">'+ titulo.textContent +'<img src="../img/eliminar.png" class="eliminar"></p>';
            lista.appendChild(nuevoElemento);

			sumarLosProductos(sumaResultado);

			var cantidad = lista.childElementCount;
			contar(cantidad);

			//Eliminar producto y descontarlo
			var eliminar = nuevoElemento.querySelectorAll(".eliminar");
			eliminar.forEach(function (elemento) {
			  elemento.addEventListener("click", function () {
				var elementoPadre = this.closest(".listado").parentElement;
				lista.removeChild(elementoPadre);

				suma -= parseFloat(precio.textContent);
				var sumaResultado = Math.round(suma * 100)/100
				console.log(suma.toString());
				sumarLosProductos(sumaResultado);
				
				var cantidad = lista.childElementCount;
				contar(cantidad);
			  });
			});
        }
    })(button.parentElement.querySelector(".detalle"),button.parentElement.querySelector(".precio")));
}



//Formulario
const formulario = document.getElementById("formulario");
formulario.addEventListener('submit', async(e)=>{
	e.preventDefault();
	try{	
		const respuesta = await fetch('https://sheet.best/api/sheets/b237fa91-ef7c-49f5-ab2d-75a371e83cd3', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"Nombre/s": formulario.nombre.value,
				"Apellido/s": formulario.apellido.value,
				"Email": formulario.email.value,
				"Pais/Provincia": formulario.pais.value,
				"Direccion": formulario.direccion.value,
				"Piso": formulario.piso.value,
				"Tipo de tarjeta": formulario.tipo_tarjeta.value,
				"Numero de tarjeta": formulario.tarjeta_num.value
			})
		});
	
		const contenido = await respuesta.json();
		console.log(contenido)
	} catch(error){
		console.log(error);
	}
})