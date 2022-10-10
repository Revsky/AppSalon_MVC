<?php 

namespace Clases;

class Email{

    public $mail;
    public $nombre;
    public $token;

    public function __construct( $email,$nombre,$token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

}

?>