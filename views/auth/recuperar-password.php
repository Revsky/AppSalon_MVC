<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo password acontinuacíon</p>

<?php 

    include_once __DIR__ . '/../template/alertas.php';

?>
<!-- Colocamos este if, para que en el caso de que el token no sea valido no muestre el fomulario -->
<?php if($error) return;?>

<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Password:</label>
        <input 
            type="password",
            id="password",
            name="password",
            placeholder="Tu Nuevo Password"
        >
    </div>
    <input type="submit" class="boton" value="Guardar">

</form>

<div class="acciones">
    <a href="/">¿Ya tienes cuenta?&nbsp&nbspIniciar Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta?&nbsp&nbspCrea Una</a>
</div>