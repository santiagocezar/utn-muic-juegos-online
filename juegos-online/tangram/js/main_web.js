/*Programacion de JavaScript*/

document.getElementById("bloqueador").style.display = "none";


var complet = "¡Felicitaciones! La figura está completa.";

/** @type {SVGElement} */
var entorno = document.getElementById('entorno');
/** @type {SVGImageElement} */
var fondo = document.getElementById('fondo').firstChild;
var piezas = document.getElementsByClassName('movil');
var cajas = document.getElementsByClassName('padre');

/** @type {Pieza[]} */
const datos = []

/**
 * @typedef Tangram
 * @prop {number} width Ancho del tablero
 * @prop {number} height Alto del tablero
 * @prop {number} padding Espacio alrededor
 * @prop {number[]} widthPiezas Ancho las piezas
 * @prop {number[]} heightPiezas Alto de las piezas
 * @prop {number[]} angle Ángulo de las piezas
 * @prop {number[]} mirror Invertir piezas
 * @prop {number[]} origX Posición X original
 * @prop {number[]} origY Posición Y original
})
 */

/**
 * @typedef Pieza
 * @prop {HTMLElement} el Elemento en el DOM
 * @prop {number} x Posición X
 * @prop {number} y Posición Y
 * @prop {number} w Ancho de la pieza
 * @prop {number} h Alto de la pieza
 * @prop {number} angle Ángulo de las piezas
 * @prop {number} mirror Invertir piezas
 * @prop {number} origX Posición X original
 * @prop {number} origY Posición Y original
})
 */

/**
 * @param {Tangram} opts
 */

const canonWidth = [501, 250, 250, 251, 125, 252, 376]
const canonHeight = [250, 501, 250, 125, 251, 252, 376]

export function initTangram(opts) {
	tangram = opts
	fondo.setAttribute("width", opts.width)
	fondo.setAttribute("height", opts.height)

	entorno.setAttribute("viewBox", `${-opts.padding} ${-opts.padding} ${opts.width + opts.padding * 2} ${opts.height + opts.padding * 2}`)

	entorno.addEventListener("mousemove", moverElemento)
	entorno.addEventListener("touchmove", moverElemento)
	entorno.addEventListener("mouseup", deseleccionarElemento);
	entorno.addEventListener("mouseleave", deseleccionarElemento)
	entorno.addEventListener("touchcancel",deseleccionarElemento);
	entorno.addEventListener("touchleave",deseleccionarElemento);
	entorno.addEventListener("touchend",deseleccionarElemento);

	for(let i = 0; i < piezas.length; i++){
		const el = piezas[i]
		/** @type {Pieza} */
		const pieza = {
			el,
			x: Math.floor(Math.random() * (opts.width))+ opts.padding,
			y: Math.floor(Math.random() * (opts.height))+ opts.padding,
			w: opts.widthPiezas[i],
			h: opts.heightPiezas[i],
			angle: opts.angle[i],
			mirror: opts.mirror[i],
			origX: opts.origX[i],
			origY: opts.origY[i],
		}
		//pieza.x = pieza.origX
		//pieza.y = pieza.origY
		datos.push(pieza)

		const sx= opts.widthPiezas[i]/ canonWidth[i]
		const sy= opts.heightPiezas[i]/canonHeight[i]

		const origin = `50% 50%`
		const transform = `translate(${pieza.x}px, ${pieza.y}px) rotate(${pieza.angle}deg) scaleX(${pieza.mirror*sx})`

		el.style.WebkitTransformOrigin = origin;
		el.style.msTransformOrigin = origin;
		el.style.transformOrigin = origin;
		el.style.WebkitTransform = transform;
		el.style.msTransform = transform;
		el.style.transform = transform;
		el.style.transformBox = "fill-box";
		el.setAttribute("width", pieza.w);
		el.setAttribute("height",pieza.h);
		el.addEventListener("mousedown", ev => {
			actual = i
			seleccionarElemento(ev)
		})
		el.addEventListener("touchstart", ev => {
			actual = i
			seleccionarElemento(ev)
		})
	}
}

var actual = -1
var startX = 0, startY = 0
var clickX = 0, clickY = 0
/** @type {Tangram} */
var tangram = null

/**
 * @param {Pieza} pieza
 */
function updatePos({x, y, angle, mirror, el}) {
	const transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scaleX(${mirror})`

	el.style.msTransform = transform;
	el.style.transform = transform;
	el.style.transformBox = "fill-box";
}

function seleccionarElemento(ev) {
	reordenar(ev);

	const pieza = datos[actual]
	startX = pieza.x
	startY = pieza.y

	clickX = ev.clientX ?? ev.touches[0].clientX,
	clickY = ev.clientY ?? ev.touches[0].clientY

	/*
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentPosX = parseFloat(evt.target.getAttribute("x"));
	currentPosY = parseFloat(evt.target.getAttribute("y"));*/
	ev.preventDefault()
}

function moverElemento(ev){
	if (actual < 0) return

	const pieza = datos[actual]
	const el = pieza.el

	const rect = entorno.getBoundingClientRect()

	const diffX = (ev.clientX ?? ev.touches[0].clientX) -clickX
	const diffY = (ev.clientY ?? ev.touches[0].clientY) -clickY

	const relX = (diffX) / rect.width * (tangram.width + tangram.padding * 2);
	const relY = (diffY) / rect.height * (tangram.height + tangram.padding * 2);

	//pieza.x = pieza.mirror * (Math.cos(angle)*relX + Math.sin(angle)*relY);
	//pieza.y = Math.sin(angle)*relX - Math.cos(angle)*relY;

	pieza.x = startX + relX;
	pieza.y = startY + relY;

	updatePos(pieza)
}

function deseleccionarElemento(ev){
	if (actual < 0) return

	const pieza = datos[actual]
	const el = pieza.el

	// pieza.x = Math.round(pieza.x)
	// pieza.y = Math.round(pieza.y)
	if (Math.abs(pieza.x-pieza.origX)<20 && Math.abs(pieza.y-pieza.origY)<20) {
		pieza.x = pieza.origX;
		pieza.y = pieza.origY;
	}
	updatePos(pieza)
	actual = -1
	testing();
}

function reordenar(evt){/*
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
		*/
	var padre = evt.target.parentNode;
	entorno.removeChild(padre);
	entorno.appendChild(padre);
}

function testing() {
	var bien_ubicada = 0;
	for(const pieza of datos){
		if(pieza.x == pieza.origX && pieza.y == pieza.origY){
			bien_ubicada ++;
		}
	}
	if(bien_ubicada == piezas.length){
		document.getElementById("bloqueador").style.display = "block";
		document.getElementById("monitor").innerHTML = complet;
	}
}


/**
 * @typedef TransformArgs
 * @prop {number[]} origX
 * @prop {number[]} origY
 * @prop {number[]} widthPiezas
 * @prop {number[]} heightPiezas
 * @prop {number[]} angle
 * @prop {number[]} mirror
 */

/**
 * @param {TransformArgs} args
 */
export function compatCoordinates({origX, widthPiezas, heightPiezas, origY, angle, mirror}) {
	const middleX = 350
	const middleY = parseInt(entorno.getAttribute("height")) / 2
	const offsetX = parseInt(fondo.getAttribute("x"))
	const offsetY = parseInt(fondo.getAttribute("y"))
	const width = parseInt(fondo.getAttribute("width"))
	const height = parseInt(fondo.getAttribute("height"))
	fondo.removeAttribute("x")
	fondo.removeAttribute("y")

	entorno.removeAttribute("height")
	const rads = angle.map(n =>  n * Math.PI / 180);
	const newX = [], newY = []

	for (let i = 0; i < 7; i ++) {
		const ang = rads[i]
		const relX = origX[i] - middleX
		const relY = origY[i] - middleY
		const centerX = widthPiezas[i] / 2
		const centerY = heightPiezas[i] / 2

		let viewX =
			relX * Math.cos(ang) * mirror[i]
			- relY * Math.sin(ang)
			+ centerX * Math.cos(ang) * mirror[i]
			- centerY * Math.sin(ang)
			+ middleX
		let viewY = mirror[i] * relX * Math.sin(ang)
			+ relY * Math.cos(ang)
			+ centerX * Math.sin(ang) * mirror[i]
			+ centerY * Math.cos(ang)
			+ middleY


		//const viewX = (origX[i] / mirror[i] - Math.tan(rads[i]) * origY[i]) / (Math.cos(rads[i])+Math.sin(rads[i]) * Math.sin(rads[i]))
		//const viewY = (origY[i] + viewX * Math.sin(rads[i])) / Math.cos(rads[i]);

		const x = viewX - offsetX
		const y = viewY - offsetY

		newX.push(x)
		newY.push(y)
	}
	return {
		width,
		height,
		widthPiezas,
		heightPiezas,
		origX: newX,
		origY: newY,
		angle,
		mirror,
	}
}
