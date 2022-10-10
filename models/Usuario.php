<?php 

namespace Model;

class Usuario extends ActiveRecord{

    // Base de datos
    protected static $tabla = 'usuarios';
    protected static $columnasDb = ['id','nombre','apellido','email','password','telefono','admin','confirmado','token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    
    public function __construct( $args = [] )
    {       
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? null;
        $this->confirmado = $args['confirmado'] ?? null;
        
    }

    // Mensajes de validación para  la creación de una cuenta
    public function validarNuevaCuenta(){
        if(!$this->nombre){
            self::$alertas['error'][] = "El nombre del cliente es obligatorio";
        }
        if(!$this->apellido){
            self::$alertas['error'][] = "El apellido del cliente es obligatorio";
        }
        if(!$this->email){
            self::$alertas['error'][] = "El email del cliente es obligatorio";
        }
        if(!$this->password){
            self::$alertas['error'][] = "El password del cliente es obligatorio";
        }
        if(strlen($this->password)<6){
            self::$alertas['error'][] = "El password debe ser mayor a 6 caracteres";
        }
        if(!$this->telefono){
            self::$alertas['error'][] = "El telefono del cliente es obligatorio";
        }

        return self::$alertas;
    }

    // Revisa si el usuario existe
    public function existeUsusario(){
        $query = "SELECT * FROM " . self::$tabla. " WHERE email = '".$this->email. "' LIMIT 1";

        $resultado = self::$db->query($query);

        if($resultado->num_rows){
            self::$alertas['error'][] = "El usuario ya se encuentra registrado";
        
        }

        return $resultado;

    }  

    public function hashPassword( )
    {
        $this->password = password_hash($this->password,PASSWORD_BCRYPT);
    }

}

?>