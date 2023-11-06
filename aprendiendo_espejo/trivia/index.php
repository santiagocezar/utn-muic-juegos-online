<!DOCTYPE html>
<html lang="en">
<head>
  
<meta charset="UTF-8">
  
<title>Trivia Telescopio J. Webb</title>
  
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.3.0/dist/sweetalert2.all.min.js"></script>
<link rel="stylesheet" href="css/main.css">

</head>

<body>

<h1>Trivia</h1>
<h2>Información</h2>

<p>Pon aprueba tus conocimientos acerca del Telescopio Espacial James Webb (JWST) y equipos y objetos espaciales. Responde las 10 preguntas en el menor tiempo posible y registra tu puntuación.</p>
<div class="contenido" style="position: relative;">
	<div id="sectorderecho" width="20%">
	
	<div id="ranking">
	<h2>Ranking</h2>

	<table width="100%" class="table_style">
	<thead>
	<th><strong>Pos.</strong></th>
	<th><strong>Nombre y Apellido</strong></th>
	<th><strong>Puntaje</strong></th>
	</thead>
	<tbody>
		<tr>
	<td>1</td>
	<td>Mauricio Casalis</td>
	<td>1087</td>
	</tr>
    	<tr>
	<td>2</td>
	<td>Hernán Amil</td>
	<td>1028</td>
	</tr>
    	<tr>
	<td>3</td>
	<td>Hernán Amil</td>
	<td>895</td>
	</tr>
    	<tr>
	<td>4</td>
	<td>Edgardo Benvenuto</td>
	<td>864</td>
	</tr>
    	<tr>
	<td>5</td>
	<td>Hernán Amil</td>
	<td>782</td>
	</tr>
    	<tr>
	<td>6</td>
	<td>Hernán Amil</td>
	<td>747</td>
	</tr>
    	<tr>
	<td>7</td>
	<td>Hernán Amil</td>
	<td>746</td>
	</tr>
    	<tr>
	<td>8</td>
	<td>Francisco Colombatti</td>
	<td>745</td>
	</tr>
    	<tr>
	<td>9</td>
	<td>Santiago Cézar</td>
	<td>632</td>
	</tr>
    	<tr>
	<td>10</td>
	<td>Santiago Cézar</td>
	<td>555</td>
	</tr>
    	</tbody>
	</table>
	</div>
	</div>
<div id="bloqueador" class="bloquer"> </div>
<div id="entorno"  width="70%">
<div class="contenedor">
<div class="puntaje" id="puntaje"></div>
<div class="encabezado">
    
<div class="categoria" id="categoria"></div>
<div class="numero" id="numero"></div>
<div class="pregunta" id="pregunta"></div>
<img src="#" class="imagen" id="imagen">
</div>

<div class="btn" id="btn1" onclick="oprimir_btn(0)"></div>
<div class="btn" id="btn2" onclick="oprimir_btn(1)"></div>
<div class="btn" id="btn3" onclick="oprimir_btn(2)"></div>
<div class="btn" id="btn4" onclick="oprimir_btn(3)"></div>
</div>
</div>
</div>

<br>
<div id="boton">
<a type="button" class="boton-personalizado" href="../index.html">Volver a Jugar</a></div>

<div id="botones">
<button class="boton-personalizado" id="btnModal">Registrar Puntuación</button> 
<div id="myModal" class="modalContainer">
<div class="modal-content">
<span class="close">&times;</span> <h2>Registro de Puntuación</h2>
<form method="POST" action="php/registrar_trivia.php">
<label><strong>Nombre y Apellido</strong></label>
<br>
<input type="text" name="nombreapellido" class="form-control" required>
<br>
<label><strong>Correo Electrónico</strong></label>
<br>
<input type="email" name="email" class="form-control" required>
<input type="text" id="puntajetotal" name="puntajetotal" class="form-control" style="display: none">
<input type="text" id="fechajuego" name="fechajuego" class="form-control" style="display: none">
<br>
<button type="submit" class="boton-personalizado btn-derecha">Guardar</button> 
</form>
</div> 
</div>

<a class="boton-personalizado" href="../index.html">Volver a Jugar</a> 
</div>

<script  src="js/index.js"></script>
</body>
</html>