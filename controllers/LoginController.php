<?php 

namespace Controllers;

use Clases\Email;
use Model\Usuario;
use MVC\Router;

class LoginController{

    public static function login(Router $router ) 
    {
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarLogin();

            if(empty($alertas)){
                // comprobar que exista el usuario
                $usuario = Usuario::where('email',$auth->email);
                if($usuario){
                    // verificar el password
                    $usuario->comprobarPasswordAndVerificado($auth->password);

                    session_start();

                    $_SESSION['id'] = $usuario->id;
                    $_SESSION['nombre'] = $usuario->nombre." ".$usuario->apellido;
                    $_SESSION['email'] = $usuario->email;
                    $_SESSION['login'] = true;

                    // Redireccionamiento
                    if($usuario->admin === 1){
                        $_SESSION['admin'] = $usuario->admin ?? null;

                        header('Location: /admin');
                    }else{
                        
                        header('Location: /cita');
                    }

                    debuguear($_SESSION);

                }else{
                    Usuario::setAlerta('error','El usuario no esta registrado');
                }
            }
            
        }

        // Lllama a las alertas del else $usuario::setAlerta
        $alertas = Usuario::getAlertas();

        $router->render('/auth/login',[
            "alertas" => $alertas,
        ]);
    }

    public static function logout( ) 
    {
        echo "dede logout";
    }

    public static function olvide( Router $router) 
    {
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarEmail();
            
            if(empty($alertas)){
                $usuario = Usuario::where('email',$auth->email);
                if($usuario && $usuario->confirmado === "1"){
                    
                }else{
                    Usuario::setAlerta('error',"El usuario no existe o no esta confirmado");
                }

                debuguear($usuario);
            }
        }

        $alertas = Usuario::getAlertas();
        $router->render('/auth/olvide-password',[
            'alertas' => $alertas,
        ]);
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
        if(empty($usuario)){
            // Mostrar mensaje de error
            Usuario::setAlerta('error','Token No valido');
        }else{
            // Modificar el usuario confirmado
            $usuario->confirmado = 1;
            $usuario->token = '';
            $usuario->guardar();

            Usuario::setAlerta('exito',"Cuenta Compronada Correctamente");
        }

        // Mostrar alertas
        $alertas = Usuario::getAlertas();

        // Renderizar vista
        $router->render('auth/confirmar-cuenta',[
            'alertas' => $alertas
        ]);
    }
}

?>