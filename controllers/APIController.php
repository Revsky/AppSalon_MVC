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
}

?>