<?php 

namespace Controllers;

use Model\Usuario;
use MVC\Router;

class LoginController{

    public static function login(Router $router ) 
    {
        $router->render('/auth/login');
    }

    public static function logout( ) 
    {
        echo "dede logout";
    }

    public static function olvide( Router $router) 
    {
        $router->render('/auth/olvide-password',[]);
    }

    public static function recuperar( ) 
    {
        echo "dede recuperar";
    }

    public static function crear(Router $router ) 
    {
        $usuario = new Usuario();

        // Alertas vacias
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
        
            // Sincronizar con los datos de POST
           $usuario->sincronizar($_POST);
           $alertas = $usuario->validarNuevaCuenta();

           // Revisar que alertas este vacio
           if(empty($alertas)){
                echo "pasaste la validación";
                // Verificar que el usuario no este registrado
           }
           

        }
        $router->render('/auth/crear-cuenta',[
            'usuario' => $usuario,
            'alertas' => $alertas,
        ]);
    }
}

?>