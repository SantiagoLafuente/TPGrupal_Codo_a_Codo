//Botones flotantes

//Ir hacia arriba
function irArriba(){
	window.addEventListener("scroll", () =>{
		var scroll = document.documentElement.scrollTop;
		var up = document.getElementById("button_up");
		
		if(scroll > 300){
			up.style.visibility = "visible";
		}else if(scroll <= 300){
			up.style.visibility = "hidden";
		}
	});
}
irArriba();

///Ventana de productos
function abrir(){
	document.getElementById("ventana").style.visibility = "visible";
} 
document.getElementById("carrito").onclick = abrir();

function cerrar(){
	var ventana = document.getElementById("ventana");
	ventana.style.visibility = "hidden";
}
document.getElementById("cerrar").onclick = ()=>{
	cerrar();
}
