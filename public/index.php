<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\CitaController;
use MVC\Router;
use Controllers\LoginController;


$router = new Router();

// Iniciar Sesión
$router->get('/',[LoginController::class,'login']);
$router->post('/',[LoginController::class,'login']);
$router->get('/logout',[LoginController::class,'logout']);

// Recupear password
$router->get('/olvide',[LoginController::class,'olvide']);
$router->post('/olvide',[LoginController::class,'olvide']);
$router->get('/recuperar',[LoginController::class,'recuperar']);
$router->post('/recuperar',[LoginController::class,'recuperar']);

// Crear cuentas
$router->get('/crear-cuenta',[LoginController::class,'crear']);
$router->post('/crear-cuenta',[LoginController::class,'crear']);


// Condirma cuenta
$router->get('/confirmar-cuenta',[LoginController::class,'confirmar']);   
// Condirma cuenta
$router->get('/mensaje',[LoginController::class,'mensaje']);   

// Area privada
$router->get('/cita',[CitaController::class,'index']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();

