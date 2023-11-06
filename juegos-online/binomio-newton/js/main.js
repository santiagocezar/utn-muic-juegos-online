import './piezas.js'

var tamWidh = [303,145,145,315];
var tamHeight = [303,145,315,145];

var angle = [0,0,0,0];
var mirror = [1,1,1,1];

var origX = [
	[346,201,201,340],
	[346,504,201,195],
	[346,201,201,340],
	[346,201,201,340],
	[346,201,201,340],
	[346,504,201,195],
	[201,504,504,195],
	[201,504,504,195],
	[201,201,504,340],
	[201,504,504,195],
	[201,504,504,195],
	[201,201,504,340]
];  
var origY = [
	[166,21,160,21],
	[166,21,160,21],
	[166,324,15,21],
	[21,21,160,324],
	[21,324,15,324],
	[21,324,15,324],
	[21,324,15,324],
	[21,21,160,324],
	[21,324,15,324],
	[166,324,15,21],
	[166,21,160,21],
	[166,21,160,21]
];

var num_soluciones = 12;

if (detector==1) { //si es un móvil redirecciono la página.
   	document.write('<script src="js/main_mobile.js"></script>'); //Se redirecciona hacia la versión móvil.
   }
else {
	document.write('<script src="js/main_web.js"></script>');
}
