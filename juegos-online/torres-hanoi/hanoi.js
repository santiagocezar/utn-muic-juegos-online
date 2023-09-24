/* jslint devel: true */
/* jslint plusplus: true */

//Variables globales
var nube, error = "No se puede realizar este movimiento";
var nube, perfect = "¡Perfecto! Lo has resuelto en el número mínimo de movimientos.";
var nube, completo = "¡Muy bien! ¿Te animás a hacerlo en menos movimientos?";
var torres = new Array(3);
var contmovimientos = 0;
var cantidadtotalFichas = 0;
var min_movimientos = 0;

/* Objeto nube
    Funciones:
        ponerFichaNube(): Recibe la ficha y la torre y la coloca en la nube
        sacarFichaNube(): Saca la ficha de la nube y comprueba si la puede colocar en la torre seleccionada
*/
function ObjNube() {
    "use strict";
    this.hueco = null;
    this.ponerFichaNube = function (ficha) {
        this.hueco = ficha;
        document.getElementById("nube").innerHTML = this.hueco.datosFicha;
    };

    this.sacarFichaNube = function (num) {
        this.n = num;
        var index = torres[this.n].fichas.length;
        if (index === 0) { // Si el array de torres es 0 coloca la ficha en la torre
            torres[this.n].ponerFicha(this.hueco);
            this.hueco = null;
            document.getElementById("nube").innerHTML = this.hueco;
	    contmovimientos++;
            document.getElementById("movimientos").innerHTML = "Movimientos: " + contmovimientos;
        } else { //Si el array tiene fichas comprueba el tamaño de la ficha y la coloca
            if (this.hueco.numeroFicha < torres[this.n].fichas[0].numeroFicha) {
                torres[this.n].ponerFicha(this.hueco);
                this.hueco = null;
                document.getElementById("nube").innerHTML = this.hueco;
                document.getElementById("monitor").innerHTML = null;
		contmovimientos++;
		document.getElementById("movimientos").innerHTML = "Movimientos: " + contmovimientos;
		if (this.n === 1 || this.n === 2){
		var newindex = torres[this.n].fichas.length;
		if (newindex === cantidadtotalFichas) {
	  	  if (contmovimientos === min_movimientos){
		  document.getElementById("monitor").innerHTML = perfect;
                  document.getElementById("bloqueador").style.display = "block";
		  } else {
		  document.getElementById("monitor").innerHTML = completo;
                  document.getElementById("bloqueador").style.display = "block";
	          }
		}
		}

            } else {
                document.getElementById("monitor").innerHTML = error;
            }
        }
    };
}


function ObjFicha(num, dat) {
    "use strict";
    this.numeroFicha = num;
    this.datosFicha = dat;
}

/* Objeto torre
    Funciones del objeto torre:
        sacarFicha(): Extrae una ficha de la torre y la coloca en la nube.
        ponerFicha(): Devuelve la ficha de la nube a la torre seleccionada.
        verTorre(): Muestra el contenido de la torre
*/

function ObjTorre(num) {
    "use strict";
    var p, posicion;
    this.fichas = []; //Guarda los objetos ficha en el array de la torre
    this.numeroTorre = num;
    posicion = "t" + this.numeroTorre.toString(); //Guarda el numero de torre y se aplica a su div para poder ver el contenido (funcion verTorre)
    
    this.sacarFicha = function () {
        nube.ponerFichaNube(this.fichas.shift()); // Manda la ficha extraida a la nube
        this.verTorre();
    };
    
    this.ponerFicha = function (ficha) {
        this.fichas.unshift(ficha);
        this.verTorre();
    };
    
    this.verTorre = function () {
        var espacio, textoCompleto;
        espacio = (7 * 20) - (this.fichas.length * 20);
        textoCompleto = "<div style='height:" + espacio + "px" + "'></div>";
        for (p = 0; p < this.fichas.length; p++) {
            textoCompleto += this.fichas[p].datosFicha;
        }
        document.getElementById(posicion).innerHTML = textoCompleto;
    };
}


function iniciar() {
    "use strict";
    var cantidadFichas = parseInt(prompt("Bienvenido al juego interactivo Torres de Hanói de 'ConCiencia - Museo Interactivo de Ciencias'. Este juego pondrá a prueba tu lógica, mientras más piezas más dificultad. Lo primero que debes hacer es ingresar el número de piezas a usar (pueden ser entre 3 y 7): ", "0"), 10),  f, ficha, stiloWidth = 160, datos;
    /* var cantidadFichas = parseInt(prompt("Ingrese el número de fichas a usar (pueden ser entre 3 y 7): ", "0"), 10),  f, ficha, stiloWidth = 160, datos; */
    //Declaracion de los objetos torre
    torres[0] = new ObjTorre(1);
    torres[1] = new ObjTorre(2);
    torres[2] = new ObjTorre(3);
    nube = new ObjNube();
    //    var cantidadFichas = 6;
    if (cantidadFichas >= 3 && cantidadFichas <= 7) {
        cantidadtotalFichas = cantidadFichas;
    } else {
	cantidadFichas = 5;
	cantidadtotalFichas = cantidadFichas;
	}


      
      min_movimientos = 2**cantidadFichas-1;
    //Inicializa los objetos ficha y los asigna al array de la torre 1
    for (f = cantidadFichas; f > 0; f--) {
        ficha = new ObjFicha(f);
        stiloWidth -= 20;
        datos = "<div id='f" + f + "' class='ficha' style='width:" + stiloWidth + "px" + "'></div>";
        ficha.datosFicha = datos;
        torres[0].ponerFicha(ficha);
	document.getElementById("movimientos").innerHTML = "Movimientos mínimos: " + min_movimientos;
 	document.getElementById("bloqueador").style.display = "none";
    }
}

//Funcion donde se asignan/mueven las fichas de las torres
function mover(posicion) {
    "use strict";
    var n = posicion, index;
    if (nube.hueco !== null) {
        nube.sacarFichaNube(n);
    } else {
        index = torres[n].fichas.length; //Comprueba si el array fichas contine elementos
        if (index > 0) {
            torres[n].sacarFicha(n);
            document.getElementById("monitor").innerHTML = null;
	} else {
            document.getElementById("monitor").innerHTML = error;
        }
    }
}
