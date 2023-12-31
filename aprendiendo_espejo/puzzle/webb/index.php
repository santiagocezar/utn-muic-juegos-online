﻿<!DOCTYPE html>
<html lang="es">

<head>
	<title>Puzzles</title>
	<link href="../img/ConCiencia-sinletras.png" rel="shortcut icon">
	<meta charset="utf-8">
	<meta name="ConCiencia">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="../css/main.css">

	<link href="https://fonts.googleapis.com/css?family=Quicksand:700" rel="stylesheet">
</head>


<body>

<h1>Telescopio Espacial James Webb</h1>

<p>Arrastra las piezas para moverlas y armar la figura dentro del recuadro. Registra el tiempo e ingresa entre los 10 mejores.</p>

<div class="contenido" style="position: relative;">
	<div id="sectorderecho" width="22%">
	
	<div id="cronometro">
  		<div id="reloj">
	  	0:00:00.00
		</div>
	</div>
	<br>	
	<div id="ranking">
	<h2>Ranking</h2>

	<table width="100%" class="table_style">
	<thead>
	<th><strong>Pos.</strong></th>
	<th><strong>Nombre y Apellido</strong></th>
	<th><strong>Tiempo</strong></th>
	</thead>
	<tbody>
		<tr>
	<td>1</td>
	<td>Lucas Gilli</td>
	<td>00:03:07.830</td>
	</tr>
    	<tr>
	<td>2</td>
	<td>Sofia Bovo</td>
	<td>00:03:26.930</td>
	</tr>
    	</tbody>
	</table>
	</div>
	</div>
<div id="bloqueador" class="bloquer"> </div>
<svg id="entorno"  width="70%" height="500">
<g id="fondo"><image xlink:href="img/fondo.png" width="450" height="450"></g>
<g class="padre" id="0"><image xlink:href="img/w1.png" class="movil"></g>
<g class="padre" id="1"><image xlink:href="img/w2.png" class="movil"></g>
<g class="padre" id="2"><image xlink:href="img/w3.png" class="movil"></g>
<g class="padre" id="3"><image xlink:href="img/w4.png" class="movil"></g>
<g class="padre" id="4"><image xlink:href="img/w5.png" class="movil"></g>
<g class="padre" id="5"><image xlink:href="img/w6.png" class="movil"></g>
<g class="padre" id="6"><image xlink:href="img/w7.png" class="movil"></g>
<g class="padre" id="7"><image xlink:href="img/w8.png" class="movil"></g>
<g class="padre" id="8"><image xlink:href="img/w9.png" class="movil"></g>
<g class="padre" id="9"><image xlink:href="img/w10.png" class="movil"></g>
<g class="padre" id="10"><image xlink:href="img/w11.png" class="movil"></g>
<g class="padre" id="11"><image xlink:href="img/w12.png" class="movil"></g>
<g class="padre" id="12"><image xlink:href="img/w13.png" class="movil"></g>
<g class="padre" id="13"><image xlink:href="img/w14.png" class="movil"></g>
<g class="padre" id="14"><image xlink:href="img/w15.png" class="movil"></g>
<g class="padre" id="15"><image xlink:href="img/w16.png" class="movil"></g>
<g class="padre" id="16"><image xlink:href="img/w17.png" class="movil"></g>
<g class="padre" id="17"><image xlink:href="img/w18.png" class="movil"></g>
<g class="padre" id="18"><image xlink:href="img/w19.png" class="movil"></g>
<g class="padre" id="19"><image xlink:href="img/w20.png" class="movil"></g>
<g class="padre" id="20"><image xlink:href="img/w21.png" class="movil"></g>
<g class="padre" id="21"><image xlink:href="img/w22.png" class="movil"></g>
<g class="padre" id="22"><image xlink:href="img/w23.png" class="movil"></g>
<g class="padre" id="23"><image xlink:href="img/w24.png" class="movil"></g>
<g class="padre" id="24"><image xlink:href="img/w25.png" class="movil"></g>
</svg>
</div>

<div id="boton">
<a type="button" class="boton-personalizado" href="../index.html">Volver a Jugar</a></div>

<div id="botones">
<button class="boton-personalizado" id="btnModal">Registrar Tiempo</button> 
<div id="myModal" class="modalContainer">
<div class="modal-content">
<span class="close">&times;</span> <h2>Registro de Tiempo</h2>
<form method="POST" action="php/registrar_telescopio.php">
<label><strong>Nombre y Apellido</strong></label>
<br>
<input type="text" name="nombreapellido" class="form-control" required>
<br>
<label><strong>Correo Electrónico</strong></label>
<br>
<input type="email" name="email" class="form-control" required>
<input type="text" id="tiempototal" name="tiempototal" class="form-control" style="display: none">
<input type="text" id="fechajuego" name="fechajuego" class="form-control" style="display: none">
<br>
<button type="submit" class="boton-personalizado btn-derecha">Guardar</button> 
</form>
</div> 
</div>

<a class="boton-personalizado" href="../index.html">Volver a Jugar</a> 
</div>


<script type="text/javascript" src="js/main.js"></script>


</body>
