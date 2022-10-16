<h1 class="nombre-pagina">Nueva Cita</h1>
<p class="descripcion-pagina">Elige tu servicios y coloca tus datos</p>

<div class="app">
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
                    
                >
            </div>

            <div class="campo">
                <label for="hora">Hora:</label>
                <input
                    id="hora",
                    type="time",
                    
                >
            </div>
        </form>

    </div>
    <div id="paso-3" class="seccion">
        <h2>Resumen</h2>
        <p class="text-center">Verifica que la información sea correcta.</p>
    </div>
</div>