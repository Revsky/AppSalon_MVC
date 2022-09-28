<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia Sesión</p>

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
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
    <a href="/olvide">¿Olvidaste tu Constraseña?</a>
</div>