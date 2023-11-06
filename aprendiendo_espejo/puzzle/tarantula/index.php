﻿<!DOCTYPE html>
<html lang="es">

<head>
	<title>Puzzles</title>
	<link href="../img/ConCiencia-sinletras.png" rel="shortcut icon">
	<meta charset="utf-8">
	<meta name="ConCiencia">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="../css/main.css">

	<link href="https://fonts.googleapis.com/css?family=Quicksand:700" rel="stylesheet">
</head>

<body>
	<header>
		<a class="volver" href="../index.html">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/></svg>
		</a>
		<h1>Nebulosa de la Tarántula</h1>
	</header>
	<p>Arrastra las piezas para moverlas y armar la figura dentro del recuadro. Registra el tiempo e ingresa entre los 10 mejores.</p>
	<div class="contenido">
		<muic-puzzle src="img/tarantula.jpeg" horizontal="1" vertical="1" fondo="../img/fondo.png" porcentaje-area="66">
			<div id="bloqueador" class="bloquer"> </div>
		</muic-puzzle>
		<div id="sectorderecho">

		<muic-crono>
		00:00:00.00
		</muic-crono>

		<button class="boton-personalizado" id="btnModal" style="display: none;">Registrar Tiempo</button>
		<br>
		<div id="ranking">
		<h2>Ranking</h2>

		<table class="table_style">
		<thead>
		<th><strong>Pos.</strong></th>
		<th><strong>Nombre y Apellido</strong></th>
		<th><strong>Tiempo</strong></th>
		</thead>
		<tbody>
			<tr>
		<td>1</td>
		<td>MATIAS FANTIN</td>
		<td>00:01:33.290</td>
		</tr>
			<tr>
		<td>2</td>
		<td>Hugo Pipino</td>
		<td>00:02:02.660</td>
		</tr>
			<tr>
		<td>3</td>
		<td>Luciano</td>
		<td>00:03:05.360</td>
		</tr>
			</tbody>
		</table>
		</div>
		</div>
	</div>

	<div id="myModal" class="modalContainer">
		<div class="modal-content">
			<div class="top">
			<h2>Registro de Tiempo</h2>
			<span class="close">&times;</span>
			</div>
			<form method="POST" action="php/registrar_tarantula.php">
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

	<script type="module" src="../main.js"></script>
</body>
