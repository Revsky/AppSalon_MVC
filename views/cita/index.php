<h1 class="nombre-pagina">Nueva Cita</h1>
<p class="descripcion-pagina">Elige tu servicios y coloca tus datos</p>

<?php
    include_once __DIR__.'/../template/barra.php';
?>

<div class="app">
    <nav class="tabs">
        <button class="actual" type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">Información Cita</button>
        <button type="button" data-paso="3">Resumen</button>
    </nav>

    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios:</p>
        <div class="listado-servicios" id="servicios"></div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Tus Datos y Cita</h2>
        <p class="text-center">Coloca tus datos y fecha de cita:</p>

        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input
                    id="nombre",
                    type="text",
                    placeholder="Tu Nombre",
                    disabled
                    value="<?php echo $nombre; ?>"
                >
            </div>

            <div class="campo">
                <label for="fecha">Fecha:</label>
                <input
                    id="fecha",
                    type="date",
                    min="<?php echo date('Y-m-d', strtotime('+1 day')) ?>"
                >
            </div>
            <!-- strtotime permite agregar 1 día mas usando texto -->

            <div class="campo">
                <label for="hora">Hora:</label>
                <input
                    id="hora",
                    type="time",
                    
                >
            </div>
            <!-- Creamos un hidden input para que leeamos el id, este input no se puede ver -->
            <input type="hidden" id="id" value="<?php echo $id; ?>">
        </form>

    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Resumen</h2>
        <p class="text-center">Verifica que la información sea correcta.</p>
    </div>

    <div class="paginacion">
        <button
            id="anterior"
            class="boton"
        >&laquo; Anterior</button>

        <button
            id="siguiente"
            class="boton"
        >Siguiente &raquo;</button>
    </div>
</div>

<?php 
    $script = "
        <script src='//cdn.jsdelivr.net/npm/sweetalert2@11'></script>
        <script src = 'build/js/app.js'></script>
    "
?>