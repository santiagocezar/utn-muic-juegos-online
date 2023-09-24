import { initTangram, compatCoordinates } from "../../js/main_web.js";

var tamWidh = [328,164,164,164,112,164,246];
var tamHeight = [164,328,164,112,164,164,98];

var angle = [180,90,0,0,180,270,0];
var mirror = [1,1,1,1,1,1,1];

var origX = [3,329,368,286,235,207,204];
var origY = [271,-97,311,49,107,104,139];

initTangram({
	padding: 50,
	widthPiezas: tamWidh,
	heightPiezas: tamHeight,

	...compatCoordinates({
		angle,
		mirror,
		origX,
		origY,
	})
})
