<h1 class="nombre-pagina">Recuperar Contraseña</h1>
<p class="descripcion-pagina">Restablece tu password con tu email</p>

<?php 

    include_once __DIR__ . '/../template/alertas.php';

?>

<form action="/olvide" class="formulario" method="POST" >

    <div class="campo">
        <label for="email">Email</label>
        <input 
            type="email"
            id="email"
            name="email"
            placeholder="correo@correo.com"
        />
    </div>

    <input type="submit" value="Enviar Instrucciones" class="boton">

</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta?&nbsp&nbspInica Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta?&nbsp&nbsp&nbspCrear una</a>
</div>