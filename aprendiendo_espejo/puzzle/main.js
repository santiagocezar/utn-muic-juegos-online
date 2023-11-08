class MUICPuzzle extends HTMLElement {
	/** @type {SVGImageElement | null} */
	currentPiece = null

	connectedCallback() {
		document.getElementById("bloqueador").style.display = "none";

		this.src = this.getAttribute("src")
		this.piezasH = parseInt(this.getAttribute("horizontal"))
		this.piezasV = parseInt(this.getAttribute("vertical"))

		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		this.appendChild(this.svg)

		this.svg.id = "entorno"

		this.frameImage = document.createElementNS("http://www.w3.org/2000/svg", "image")
		this.frameImage.setAttribute("href", this.getAttribute("fondo"))
		this.svg.appendChild(this.frameImage)

		this.img = new Image()
		this.img.src = this.src
		this.img.addEventListener("load", () => {
			this.splitImage()
		})

		this.addEventListener("mousemove", this.onMouseMove)
		this.addEventListener("touchmove", this.onMouseMove)
		this.addEventListener("mouseup", this.onMouseStop)
		this.addEventListener("touchend", this.onMouseStop)
		this.addEventListener("mouseleave", this.onMouseStop)
		this.addEventListener("touchcancel", this.onMouseStop)
	}

	splitImage() {
		const w = this.img.naturalWidth
		const h = this.img.naturalWidth
		const porcentaje = (100 - parseFloat(this.getAttribute("porcentaje-area"))) / 100

		this.piezaW = Math.floor(w / this.piezasH)
		this.piezaH = Math.floor(h / this.piezasV)

		this.width = this.piezaW * this.piezasH
		this.height = this.piezaH * this.piezasV

		const marcoW = this.width * porcentaje / 2
		const marcoH = this.height * porcentaje / 2

		this.frameImage.setAttribute("x", (-marcoW).toString())
		this.frameImage.setAttribute("y", (-marcoH).toString())
		this.frameImage.setAttribute("width", (this.width * (porcentaje + 1)).toString())
		this.frameImage.setAttribute("height", (this.height * (porcentaje + 1)).toString())

		this.viewWidth = this.width+marcoW*2
		this.viewHeight = this.height+marcoH*2

		this.svg.setAttribute("viewBox", `${-marcoW} ${-marcoH} ${this.viewWidth} ${this.viewHeight}`)

		const canvas = document.createElement("canvas")
		canvas.width = this.piezaW
		canvas.height = this.piezaH

		const ctx = canvas.getContext("2d")

		for (let x = 0; x < this.width; x += this.piezaW) {
			for (let y = 0; y < this.height; y += this.piezaH) {
				ctx.drawImage(this.img, x, y, this.piezaW, this.piezaH, 0, 0, this.piezaW, this.piezaH)

				canvas.toBlob(blob => {
					this.createImage(blob,x,y)
				})
			}
		}
		for (const crono of /** @type {HTMLCollectionOf<MUICCrono>} */ (document.getElementsByTagName("muic-crono"))) {
			crono.iniciar()
		}
	}

	/**
	 * @param {Blob | null} blob
	 * @param {number} x
	 * @param {number} y
	 */
	createImage(blob, x, y) {
		const image = document.createElementNS("http://www.w3.org/2000/svg", "image")

		const spawnX = Math.floor(Math.random() * (this.width - this.piezaW))
		const spawnY = Math.floor(Math.random() * (this.height - this.piezaH))

		image.setAttribute("data-x", spawnX.toString())
		image.setAttribute("data-orig-x", ""+x)
		image.setAttribute("data-y", spawnY.toString())
		image.setAttribute("data-orig-y", ""+y)

		image.setAttribute("href", URL.createObjectURL(blob))

		image.addEventListener("mousedown", this.onMouseStart)
		image.addEventListener("touchstart", this.onMouseStart)

		this.svg.appendChild(image)

		image.animate([{
			transform: `translate(${spawnX}px, ${spawnY}px)`
			// transform: `translate(${newX}px, ${newY}px) rotate(${newAngle}deg)`
		}], {
			duration: 0,
			fill: "forwards"
		})
	}

	/**
	 * @param {MouseEvent|TouchEvent} ev
	 */
	onMouseStart = (ev) => {
		this.currentPiece = ev.target

		const parent = this.currentPiece.parentNode;
		parent.removeChild(this.currentPiece);
		parent.appendChild(this.currentPiece);

		this.startX = parseFloat(this.currentPiece.getAttribute("data-x") ?? "0")
		this.startY = parseFloat(this.currentPiece.getAttribute("data-y") ?? "0")
		this.clickX = ev.clientX ?? ev.touches[0].clientX
		this.clickY = ev.clientY ?? ev.touches[0].clientY
		this.x = this.startX
		this.y = this.startY

		ev.preventDefault()
	}

	/**
	 * @param {MouseEvent|TouchEvent} ev
	 */
	onMouseMove = (ev) => {
		if (!this.currentPiece) return
		const rect = this.svg.getBoundingClientRect()

		const diffX = (ev.clientX ?? ev.touches[0].clientX) - this.clickX
		const diffY = (ev.clientY ?? ev.touches[0].clientY) - this.clickY

		let x = this.startX + diffX / rect.width * this.viewWidth
		let y = this.startY + diffY / rect.height * this.viewHeight

		if (x < 0) x = 0
		if (x > this.width - this.piezaW) x = this.width - this.piezaW
		if (y < 0) y = 0
		if (y > this.height - this.piezaH) y = this.height - this.piezaH

		this.x = x
		this.y = y

		this.currentPiece.animate([{
			transform: `translate(${x}px, ${y}px)`// scale(1.2)`
		}], {
			duration: 0,
			fill: "forwards"
		})
	}


	/**
	 * @param {MouseEvent|TouchEvent} ev
	 */
	onMouseStop = (ev) => {
		if (!this.currentPiece) return

		let x = this.x
		let y = this.y

		const closestX = Math.round(x / this.piezaW) * this.piezaW
		const closestY = Math.round(y / this.piezaH) * this.piezaH

		let snap = Math.abs(x - closestX) < this.piezaW / 4 && Math.abs(y - closestY) < this.piezaH / 4
		let occupied = false

		if (snap) {
			for (const piece of this.svg.children) {
				const x = piece.getAttribute("data-x")
				const y = piece.getAttribute("data-y")
				if (piece != this.currentPiece && x == closestX && y == closestY) {
					console.log("nah bruh")
					occupied = true
					break
				}
			}
			if (!occupied) {
				x = closestX
				y = closestY

				const parent = this.currentPiece.parentNode
				parent.removeChild(this.currentPiece);
				parent.insertBefore(this.currentPiece, parent.children[1]);

				this.currentPiece.animate([{
					transform: `translate(${x}px, ${y}px)`
				}], {
					duration: 200,
					easing: "cubic-bezier(.01,.68,.23,1.2)",
					fill: "forwards"
				})
			} else {


				this.currentPiece.animate([{
					transform: `translate(${x}px, ${y}px) rotate(6deg)`
				},{
					transform: `translate(${x}px, ${y}px) rotate(-6deg)`
				},{
					transform: `translate(${this.startX}px, ${this.startY}px) rotate(0deg)`
				}], {
					duration: 200,
					easing: "cubic-bezier(.01,.68,.23,1.2)",
					fill: "forwards"
				})
				x = this.startX;
				y = this.startY;
			}
		}/* else {
			this.currentPiece.animate([{
				transform: `translate(${x}px, ${y}px)`
			}], {
				duration: 200,
				easing: "cubic-bezier(.01,.68,.23,1.2)",
				fill: "forwards"
			})
		} */

		this.currentPiece.setAttribute("data-x", x.toString())
		this.currentPiece.setAttribute("data-y", y.toString())
		this.currentPiece = null
		this.checkWin()
	}

	checkWin() {
		let yeah = true
		for (const piece of this.svg.children) {
			const x = piece.getAttribute("data-x")
			const origX = piece.getAttribute("data-orig-x")
			const y = piece.getAttribute("data-y")
			const origY = piece.getAttribute("data-orig-y")
			if (x != origX || y != origY) {
				yeah = false
				break
			}
		}
		if (yeah) {
			/** @type {MUICCrono} */
			const crono = document.getElementsByTagName("muic-crono")[0]
			crono.parar()
			const tiempoTotal = crono.formato()

			const now = new Date()
			const año = now.getFullYear();
			const mes = now.getMonth()+1;
			const dia = now.getDate();

			document.getElementById("bloqueador").style.display = "block";
			document.getElementById("btnModal").style.display = "block";
			document.getElementById("fechajuego").value = `${año}/${mes}/${dia}`;
			document.getElementById("tiempototal").value = tiempoTotal;
		}
	}
}

class MUICCrono extends HTMLElement {
	connectedCallback() {
		this.stopped = false
	}
	iniciar() {
		this.cro = 0
		this.inicio = new Date() //fecha inicial (en el momento de pulsar)
		requestAnimationFrame(this.tiempo)
		//this.interval=setInterval(() => this.tiempo(), 10); //función del temporizador.
	}
	tiempo = () => {
		const actual = new Date(); //fecha a cada instante

		//tiempo del crono (cro) = fecha instante (actual) - fecha inicial (emp)
		this.cro = actual - this.inicio; //milisegundos transcurridos.

		//llevar resultado al visor.
		this.innerHTML = this.formato()

		if (!this.stopped)
			requestAnimationFrame(this.tiempo)
	}
	formato() {
		let centimas = Math.floor(this.cro / 10)
		let segundos = Math.floor(centimas / 100)
		let minutos = Math.floor(segundos / 60)
		let horas = Math.floor(minutos / 60)

		centimas %= 100
		segundos %= 60
		minutos %= 60

		if (centimas < 10) centimas = "0"+centimas
		if (segundos < 10) segundos = "0"+segundos
		if (minutos < 10) minutos = "0"+minutos
		if (horas < 10) horas = "0"+horas

		return `${horas}:${minutos}:${segundos}.${centimas}`
	}
	parar() {
		this.stopped = true
	}
}

customElements.define("muic-puzzle", MUICPuzzle)
customElements.define("muic-crono", MUICCrono)

const btn = document.getElementById("btnModal")
if(btn){
	const modal = document.getElementById("myModal");
	const span = document.getElementsByClassName("close")[0];
	const body = document.getElementsByTagName("body")[0];

	btn.onclick = function() {
		modal.style.display = "block";

		body.style.position = "static";
		body.style.height = "100%";
		body.style.overflow = "hidden";
	}

	span.onclick = function() {
		modal.style.display = "none";

		body.style.position = "inherit";
		body.style.height = "auto";
		body.style.overflow = "visible";
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";

			body.style.position = "inherit";
			body.style.height = "auto";
			body.style.overflow = "visible";
		}
	}
}
