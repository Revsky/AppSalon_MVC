<?php 

namespace Controllers;

use Model\Cita;
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
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();
        $respuesta = [
            'cita' => $cita
        ];
        
    }
}

?>