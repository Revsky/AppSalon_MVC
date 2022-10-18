<?php

$db = mysqli_connect('localhost', 'root', 'root', 'appsalon_mvc');
// Agregamos el charset para que pueda mostrar la información
mysqli_set_charset($db,'utf8mb4');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "Error de depuración: " . mysqli_connect_errno();
    echo "Error de depuración: " . mysqli_connect_error();
    exit;
}
