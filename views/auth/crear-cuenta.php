<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear una cuenta</p>

<form action="/crear-cuenta" class="formulario" method="POST">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu Nombre"
        />
    </div>

    <div class="campo">
        <label for="apellido">Apellido:</label>
        <input 
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Tu Apellido"
        />
    </div>

    <div class="campo">
        <label for="telefono">Telefono:</label>
        <input 
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="+52 "
        />
    </div>

    <div class="campo">
        <label for="email">Email:</label>
        <input 
            type="email"
            id="email"
            name="email"
            placeholder="correo@correo.com"
        />
    </div>

    <div class="campo">
        <label for="password">Password:</label>
        <input 
            type="password"
            id="password"
            name="password"
            placeholder="Token"
        />
    </div>

    <input type="submit" value="Crear Cuenta" class="boton">

</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta?&nbsp&nbspInica Sesión</a>
    <a href="/olvide">¿Olvidaste tu Constraseña?</a>
</div>