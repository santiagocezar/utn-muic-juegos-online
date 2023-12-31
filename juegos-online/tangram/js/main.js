/**
 * @type {SVGElement}
 */
const tangram = document.getElementById("tangram")
const pieces = [...tangram.getElementsByTagName("path")]

const viewBox = tangram.getAttribute("viewBox").split(" ")
let width = parseFloat(viewBox[2])
let height = parseFloat(viewBox[3])
const padding = width / 10
width += padding * 2
height += padding * 2
tangram.setAttribute("viewBox", `${-padding} ${-padding} ${width} ${height}`)

tangram.style.display = "block"
/**
* @type {SVGPathElement} 
*/
var currentPiece = null
var startX = 0, startY = 0
var clickX = 0, clickY = 0
var relX = 0, relY = 0
var minX = 0, minY = 0
var maxX = 0, maxY = 0

// var angle = 0
// var doubleClick = false

const group = pieces[0].parentElement
const guide = document.createElementNS("http://www.w3.org/2000/svg", "g")
guide.setAttribute("filter", "opacity(0.5)")
group.prepend(guide)

for (const piece of pieces) {
    const gary = piece.cloneNode()
    gary.setAttribute("fill", "#fff")
    gary.setAttribute("stroke", "#fff")
    guide.appendChild(gary)
}

for (const piece of pieces) {
    const tangramRect = tangram.getBoundingClientRect()
    const rect = piece.getBoundingClientRect()
    const x = (rect.x - tangramRect.x) / tangramRect.width * width;
    const y = (rect.y - tangramRect.y) / tangramRect.height * height;
    const w = rect.width / tangramRect.width * width;
    const h = rect.height / tangramRect.height * height;

    const newX = -x + Math.random() * (width - w)
    const newY = -y + Math.random() * (height - h)
    // const newAngle = Math.floor(Math.random() * 4) * 90

    piece.setAttribute("data-x", newX.toString())
    piece.setAttribute("data-y", newY.toString())
    // piece.setAttribute("data-angle", newAngle)
    piece.setAttribute("data-min-x", -x)
    piece.setAttribute("data-min-y", -y)
    piece.setAttribute("data-max-x", -x + width - w)
    piece.setAttribute("data-max-y", -y + height - h)
    piece.setAttribute("data-h", h)
    piece.animate([{
        transform: `translate(${newX}px, ${newY}px)`
        // transform: `translate(${newX}px, ${newY}px) rotate(${newAngle}deg)`
    }], {
        duration: 0,
        fill: "forwards"
    })
}

/**
* @param {MouseEvent|TouchEvent} ev
*/
function startMoving(ev) {
    currentPiece = ev.target



    const parent = currentPiece.parentNode;
    parent.removeChild(currentPiece);
    parent.appendChild(currentPiece);

    startX = parseFloat(currentPiece.getAttribute("data-x") ?? "0")
    startY = parseFloat(currentPiece.getAttribute("data-y") ?? "0")
    clickX = ev.clientX ?? ev.touches[0].clientX
    clickY = ev.clientY ?? ev.touches[0].clientY
    minX = parseFloat(currentPiece.getAttribute("data-min-x"))
    minY = parseFloat(currentPiece.getAttribute("data-min-y"))
    maxX = parseFloat(currentPiece.getAttribute("data-max-x"))
    maxY = parseFloat(currentPiece.getAttribute("data-max-y"))
    // angle = parseInt(currentPiece.getAttribute("data-angle") ?? "0")
    relX = 0
    relY = 0
    ev.preventDefault()

    /*
    if (doubleClick) {
        angle += 90
        currentPiece.setAttribute("data-angle", angle)

        currentPiece.animate([{
            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
        }], {
            duration: 200,
            easing: "cubic-bezier(.01,.68,.23,1.2)",
            fill: "forwards"
        })
    }
    doubleClick = true
    setTimeout(() => doubleClick = false, 200)
    */
}

function stopMoving(ev) {
    if (!currentPiece) return
    let x = startX + relX, y = startY + relY

    if (Math.abs(x) < height / 50 && Math.abs(y) < height / 50 /* && angle % 360 == 0 */) {
        x = 0
        y = 0
    }

    currentPiece.animate([{
        transform: `translate(${x}px, ${y}px)`
        // transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
    }], {
        duration: 200,
        easing: "cubic-bezier(.01,.68,.23,1.2)",
        fill: "forwards"
    })

    currentPiece.setAttribute("data-x", x.toString())
    currentPiece.setAttribute("data-y", y.toString())
    currentPiece = null

    checkWin()
}


function checkWin() {
    let yeah = true
    for (const piece of pieces) {
        const x = parseFloat(piece.getAttribute("data-x") ?? "0")
        const y = parseFloat(piece.getAttribute("data-y") ?? "0")
        if (x != 0 || y != 0) {
            yeah = false
            break
        }

    }
    if (yeah) {
        let i = 0
        for (const piece of pieces) {
            piece.animate([{
                fill: "#fff"
            }, {
            }], {
                duration: 200,
                delay: (i++) * 10,
            })
        }
        document.getElementById("bloqueador").style.display = "block";
        document.getElementById("monitor").innerHTML = "¡Felicitaciones! La figura está completa.";
    }
}

/**
* @param {MouseEvent|TouchEvent} ev
*/
function move(ev) {
    if (!currentPiece) return
    const rect = tangram.getBoundingClientRect()

    const diffX = (ev.clientX ?? ev.touches[0].clientX) - clickX
    const diffY = (ev.clientY ?? ev.touches[0].clientY) - clickY

    relX = (diffX) / rect.width * (width);
    relY = (diffY) / rect.height * (height);

    // console.log({ startX, relX, minX })
    if (startX + relX < minX) {
        relX = minX - startX
    }
    if (startX + relX > maxX) {
        relX = maxX - startX
    }
    if (startY + relY < minY) {
        relY = minY - startY
    }
    if (startY + relY > maxY) {
        relY = maxY - startY
    }

    currentPiece.animate([{
        transform: `translate(${startX + relX}px, ${startY + relY}px)`
        // transform: `translate(${startX + relX}px, ${startY + relY}px) rotate(${angle}deg)`
    }], {
        duration: 0,
        fill: "forwards"
    })
}
tangram.addEventListener("mousemove", move)
tangram.addEventListener("touchmove", move)
tangram.addEventListener("mouseup", stopMoving)
tangram.addEventListener("touchend", stopMoving)
tangram.addEventListener("mouseleave", stopMoving)
tangram.addEventListener("touchcancel", stopMoving)
for (const piece of pieces) {
    piece.addEventListener("mousedown", startMoving)
    piece.addEventListener("touchstart", startMoving)
}
