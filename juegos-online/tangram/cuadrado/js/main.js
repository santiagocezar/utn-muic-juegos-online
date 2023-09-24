import { initTangram, compatCoordinates } from "../../js/main_web.js";

var tamWidh = [400,200,200,200,137,200,300];
var tamHeight = [200,400,200,137,200,200,120];

var angle = [0,0,0,0,0,0,0];
var mirror = [1,1,1,1,1,1,1];

var origX = [200,200,400,300,481,400,200];
var origY = [100,100,200,281,100,300,390];

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
