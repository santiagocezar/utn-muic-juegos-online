import { initTangram, compatCoordinates } from "../../js/main_web.js";

var tamWidh = [320,160,160,160,110,160,240];
var tamHeight = [160,320,160,110,160,160,96];

var angle = [45,315,0,180,0,45,45];
var mirror = [1,1,1,1,1,1,1];

var origX = [310,129,425,195,490,357,230];
var origY = [311,49,332,73,252,-74,463];

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
