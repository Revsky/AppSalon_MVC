<?php 

namespace Controllers;

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

    public static function olvide( ) 
    {
        echo "dede olvide";
    }

    public static function recuperar( ) 
    {
        echo "dede recuperar";
    }

    public static function crear( ) 
    {
        echo "dede crear";
    }
}

?>