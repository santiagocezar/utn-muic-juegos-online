import { initTangram, transformCoords } from "../../js/main_web.js";

initTangram({
	width: 450,
	height: 450,
	padding: 50,
	widthPiezas: [328,164,164,164,112,164,246],
	heightPiezas: [164,328,164,112,164,164,98],


	...transformCoords({
		offset: [200, 30],
		viewBox: [700, 500],
		angle: [0,270,45,0,180,0,315],
		mirror: [1,1,1,1,1,1,-1],
		width: [328,164,164,164,112,164,246],
		height: [164,328,164,112,164,164,98],
		origX: [259,311,191,259,344,423,235],
		origY: [288,220,53,355,48,288,165],
	})
/*
	origX: [.6,2,.95,.6,.45,2.22,0],
	origY: [2.57,.12,.3,3.25,2.6,2.6,1.52],*/
})

