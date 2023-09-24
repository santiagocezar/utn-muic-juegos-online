navegador = navigator.userAgent; 
moviles=["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];
detector=0; 

for (i in moviles) { 
	compruebo=navegador.indexOf(moviles[i]); 
   	if (compruebo>-1) { 
      		detector=1; //Si es un móvil, cambio el valor del detector
      	}
}

var tamWidh = [328,164,164,164,112,164,246];
var tamHeight = [164,328,164,112,164,164,98];

var angle = [180,90,0,0,180,270,0];
var mirror = [1,1,1,1,1,1,1];

var origX = [3,329,368,286,235,207,204];  
var origY = [271,-97,311,49,107,104,139];

if (detector==1) { //si es un móvil redirecciono la página.
   	document.write('<script src="../js/main_mobile.js"></script>'); //Se redirecciona hacia la versión móvil.
   }
else {
	document.write('<script src="../js/main_web.js"></script>');
}