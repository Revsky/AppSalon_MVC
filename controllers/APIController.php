<?php 

namespace Controllers;

use Model\Cita;
use Model\Servicio;

use function PHPSTORM_META\type;

class APIController{

    public static function index( )
    {
        $servicios = Servicio::all();
        echo json_encode($servicios);
        
    }

    public static function guardar(){
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();
        echo json_encode($resultado);
    }
}

?>