import { initTangram, compatCoordinates } from "../../js/main_web.js";

var tamWidh = [328,164,164,164,112,164,246];
var tamHeight = [164,328,164,112,164,164,98];

var angle = [0,270,45,0,180,0,315];
var mirror = [1,1,1,1,1,1,-1];

var origX = [259,311,191,259,344,423,235];
var origY = [288,220,53,355,48,288,165];

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
