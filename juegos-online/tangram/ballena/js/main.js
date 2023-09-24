import { initTangram } from "../../js/main_web.js";

initTangram({
	width: 6.5,
	height: 4.5,
	widthPiezas: [3.2,1.6,1.6,1.6,1.1,1.6,2.4],
	heightPiezas: [1.6,3.2,1.6,1.1,1.6,1.6,1],

	angle: [45,315,0,180,0,45,45],
	mirror: [1,1,1,1,1,1,1],

	origX: [1.24,.9,3.75,2.94,4.40,4.55,-.05],
	origY: [2.64,0.7,2.4,2.25,1.6,-.3,2.95],
})
