<?php 

namespace Controllers;

use Clases\Email;
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
                $resultado = $usuario->existeUsusario();

                if($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
                }else{
                    // Hashear password
                    $usuario->hashPassword();

                    // Generar un token unico
                    $usuario->crearToken();

                    // Enviar el email
                    $email = new Email($usuario->email,$usuario->nombre,$usuario->token);
                    $email->enviarConfirmacion();

                    // Crear el usuario
                    
                    $resultado = $usuario->guardar();
                    if($resultado){
                        header('Location: /mensaje');
                    }
                    
                }
           }
           

        }
        $router->render('/auth/crear-cuenta',[
            'usuario' => $usuario,
            'alertas' => $alertas,
        ]);
    }

    public static function mensaje(Router $router){
        $router->render('auth/mensaje');
    }

    public static function confirmar(Router $router )
    {

        $alertas = [];

        $token = sanitizar($_GET['token']);
        
        $usuario = Usuario::where('token',$token);
        debuguear($usuario);

        $router->render('auth/confirmar-cuenta',[
            'alertas' => $alertas
        ]);
    }
}

?>