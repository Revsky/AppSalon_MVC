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
        $this->email = $args['email'] ?? null;
        $this->password = $args['password'] ?? null;
        $this->telefono = $args['telefono'] ?? null;
        $this->admin = $args['admin'] ?? null;
        $this->confirmado = $args['confirmado'] ?? null;
        
    }

}

?>