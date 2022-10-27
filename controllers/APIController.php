<?php 

namespace Controllers;

use Model\Servicio;

use function PHPSTORM_META\type;

class APIController{

    public static function index( )
    {
        $servicios = Servicio::all();
        $nuevo = json_encode($servicios);
        echo $nuevo;
    }

    public static function guardar(){
        /* Praa obtener informacion lo hacemos mediante $_post */
        $respuesta = [
            'datos' => $_POST
        ];
        echo json_encode($respuesta);
    }
}

?>