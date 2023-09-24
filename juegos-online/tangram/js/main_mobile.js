/*Programacion de JavaScript*/

document.getElementById("bloqueador").style.display = "none";

var complet = "¡Felicitaciones! La figura está completa.";

var piezas = document.getElementsByClassName('movil');
var cajas = document.getElementsByClassName('padre');

for(var i=0;i<piezas.length;i++){
	piezas[i].style.WebkitTransformOrigin = "50% 50%";
	piezas[i].style.WebkitTransform = "rotate("+angle[i]+"deg) scaleX("+mirror[i]+")";
	piezas[i].style.msTransformOrigin = "50% 50%";
	piezas[i].style.msTransform = "rotate("+angle[i]+"deg) scaleX("+mirror[i]+")";
	piezas[i].style.transformOrigin = "50% 50%";
	piezas[i].style.transform = "rotate("+angle[i]+"deg) scaleX("+mirror[i]+")";
	piezas[i].setAttribute("width", tamWidh[i]);
	piezas[i].setAttribute("height",tamHeight[i]);
	piezas[i].setAttribute("x", Math.floor((Math.random() * 150) + 1));
	piezas[i].setAttribute("y", Math.floor((Math.random() * 309) + 1));
	piezas[i].setAttribute("ontouchstart","seleccionarElemento(evt)");
}

var elementSelect = 0;  
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
 	elementSelect = reordenar(evt);
	evt.preventDefault();
	currentX =  evt.touches[0].clientX;        
	currentY =  evt.touches[0].clientY;
	currentPosx = parseFloat(elementSelect.getAttribute("x"));     
	currentPosy = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("ontouchmove","moverElemento(evt)");	
}

function moverElemento(evt){
	var padre = evt.target.parentNode;
	var id = padre.getAttribute("id");
	var dx =  evt.touches[0].clientX - currentX;
	var dy =  evt.touches[0].clientY - currentY;
	currentPosx = currentPosx + mirror[id]*(Math.cos(angle[id]*Math.PI/180)*dx + Math.sin(angle[id]*Math.PI/180)*dy);
	currentPosy = currentPosy - Math.sin(angle[id]*Math.PI/180)*dx + Math.cos(angle[id]*Math.PI/180)*dy;
	elementSelect.setAttribute("x",currentPosx);
	elementSelect.setAttribute("y",currentPosy);
	currentX =  evt.touches[0].clientX;        
	currentY =  evt.touches[0].clientY;
	elementSelect.setAttribute("ontouchcancel","deseleccionarElemento(evt)");
	elementSelect.setAttribute("ontouchend","deseleccionarElemento(evt)");
	elementSelect.setAttribute("ontouchleave","deseleccionarElemento(evt)");
	iman();
}

function deseleccionarElemento(evt){
	if(elementSelect != 0){			
		elementSelect.removeAttribute("ontouchmove");
		elementSelect.removeAttribute("ontouchcancel");
		elementSelect.removeAttribute("ontouchend");
		elementSelect.removeAttribute("ontouchleave");
		elementSelect = 0;
	}
	testing();
}

var entorno = document.getElementById('entorno');

function reordenar(evt){
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

function iman(){
	for(var i=0;i<piezas.length;i++){
		if (Math.abs(currentPosx-origX[i])<8 && Math.abs(currentPosy-origY[i])<8) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}

function testing() {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for(var i=0;i<piezas.length;i++){
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada = bien_ubicada + 1;
		}
	}
	if(bien_ubicada == piezas.length){
		document.getElementById("bloqueador").style.display = "block";
		document.getElementById("monitor").innerHTML = complet;
	}
}

