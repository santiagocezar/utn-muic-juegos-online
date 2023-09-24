navegador = navigator.userAgent; 
moviles=["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];
detector=0; 

for (i in moviles) { 
	compruebo=navegador.indexOf(moviles[i]); 
   	if (compruebo>-1) { 
      		detector=1; //Si es un móvil, cambio el valor del detector
      	}
}

var tamWidh = [320,160,160,160,110,160,240];
var tamHeight = [160,320,160,110,160,160,96];

var angle = [315,0,45,225,45,45,315];
var mirror = [1,1,1,1,1,1,-1];

var origX = [232,538,177,282,242,257,309];  
var origY = [317,110,208,196,288,49,229];

if (detector==1) { //si es un móvil redirecciono la página.
   	document.write('<script src="../js/main_mobile.js"></script>'); //Se redirecciona hacia la versión móvil.
   }
else {
	document.write('<script src="../js/main_web.js"></script>');
}