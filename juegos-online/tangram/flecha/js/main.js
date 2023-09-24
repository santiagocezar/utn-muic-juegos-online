import { initTangram, compatCoordinates } from "../../js/main_web.js";

var tamWidh = [320,160,160,160,110,160,240];
var tamHeight = [160,320,160,110,160,160,96];

var angle = [315,0,45,225,45,45,315];
var mirror = [1,1,1,1,1,1,-1];

var origX = [232,538,177,282,242,257,309];
var origY = [317,110,208,196,288,49,229];

initTangram({
	padding: 50,

	...compatCoordinates({
		widthPiezas: tamWidh,
		heightPiezas: tamHeight,
		angle,
		mirror,
		origX,
		origY,
	})
})
