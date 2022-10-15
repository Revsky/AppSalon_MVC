<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia Sesión</p>

<?php 
    include_once __DIR__ . "/../template/alertas.php";
?>
<?php 

    $restore = $_GET['restore'];
    if($restore):
?>
<div class="alerta exito ">
    <?php echo "Contraseña Actualizada"?>
</div>
<?php endif?>

<form class="formulario" method="POST" action="/">
    <div class="campo">
        <label for="email">Email</label>
        <input 
            type="email"
            id="email"
            placeholder="correo@correo.com"
            name="email"
        />
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password"
            id="password"
            placeholder="Token"
            name="password"
        />
    </div>

    <input type="submit" class="boton" value="Entrar">
</form>

<div class="acciones">
    <a href="/crear-cuenta">¿Aún no tienes una cuenta?&nbsp&nbsp&nbspCrear una</a>
    <a href="/olvide">¿Olvidaste tu Constraseña?</a>
</div>