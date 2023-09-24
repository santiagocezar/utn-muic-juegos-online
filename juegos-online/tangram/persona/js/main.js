import { initTangram, compatCoordinates } from "../../js/main_web.js";

var tamWidh = [230,115,115,115,79,115,172];
var tamHeight = [115,230,115,79,115,115,69];

var angle = [45,315,0,0,0,180,90];
var mirror = [1,1,1,1,1,1,-1];

var origX = [263,428,365,425,300,217,132];
var origY = [172,163,20,399,354,90,112];

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
