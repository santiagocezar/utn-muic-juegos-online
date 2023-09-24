navegador = navigator.userAgent; 
moviles=["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];
detector=0; 

for (i in moviles) { 
	compruebo=navegador.indexOf(moviles[i]); 
   	if (compruebo>-1) { 
      		detector=1; //Si es un móvil, cambio el valor del detector
      	}
}

var tamWidh = [230,115,115,115,79,115,172];
var tamHeight = [115,230,115,79,115,115,69];

var angle = [45,315,0,0,0,180,90];
var mirror = [1,1,1,1,1,1,-1];

var origX = [263,428,365,425,300,217,132];  
var origY = [172,163,20,399,354,90,112];

if (detector==1) { //si es un móvil redirecciono la página.
   	document.write('<script src="../js/main_mobile.js"></script>'); //Se redirecciona hacia la versión móvil.
   }
else {
	document.write('<script src="../js/main_web.js"></script>');
}