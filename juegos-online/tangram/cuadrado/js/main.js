import { initTangram } from "../../js/main_web.js";

initTangram({
	width: 4,
	height: 4,
	widthPiezas: [4,2,2,2,1,2,3],
	heightPiezas: [2,4,2,1,2,2,1],

	angle: [0,0,0,0,0,0,0],
	mirror: [1,1,1,1,1,1,1],

	origX: [0,0,2,1,3,2,0],
	origY: [0,0,1,2,0,2,3],
})
