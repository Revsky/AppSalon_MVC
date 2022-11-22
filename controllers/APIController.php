<?php 

namespace Controllers;

use Model\Cita;
use Model\Servicio;
use Model\CitaServicio;

use function PHPSTORM_META\type;

class APIController{

    public static function index( )
    {
        $servicios = Servicio::all();
        echo json_encode($servicios);
        
    }

    public static function guardar(){

        // Almacena la cita y devuelve el ID
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();

        $id = $resultado['id'];
        // Almacena los servicios con el id de la cita
        $idServicios = explode(",",$_POST['servicios']);
        foreach($idServicios as $idServicio){
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServico = new CitaServicio($args);
            $citaServico->guardar();
        };


        echo json_encode(['resultado'=>$resultado]);
    }
}

?>