<?php 

namespace Clases;

use PHPMailer\PHPMailer\PHPMailer;

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

    public function enviarConfirmacion( )
    {
        // Crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '7a04bb0fbe1c0b';
        $mail->Password = '33419297dd4dff';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('Cuentas@appsalon.com','Appsalon.com');
        $mail->Subject = "Confirma tu cuenta";

        // Set HTML
        $mail->isHTML(TRUE);        
        $mail->CharSet='UTF-8';

        $contenido = "<html>";
        $contenido.= "<p><Strong>Hola ".$this->nombre."</Strong> Has creado tu cuenta en appsalon , solo debes confirmarla clickeando el siguiente enlance</p>";
        $contenido.= "<p>Presiona aquí: <a href='http://localhost:8000/confirmar-cuenta?token=".$this->token."'>Confirmar cuenta</a></p>";
        $contenido.= "<p>Si tu no solicitaste este cambio o esta cuenta ignora el mensaje</p>";
        $contenido.= "</html>";

        $mail->Body = $contenido;

        // Enviar el emaik
        $mail->send();
    }

    public function enviarInstrucciones()
    {
        // Crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '7a04bb0fbe1c0b';
        $mail->Password = '33419297dd4dff';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('Cuentas@appsalon.com','Appsalon.com');
        $mail->Subject = "Restablecer tu password";

        // Set HTML
        $mail->isHTML(TRUE);        
        $mail->CharSet='UTF-8';

        $contenido = "<html>";
        $contenido.= "<p><Strong>Hola ".$this->nombre."</Strong>Has solicitado restablecer tu password</p>";
        $contenido.= "<p>Presiona aquí: <a href='http://localhost:8000/recuperar?token=".$this->token."'>Restablecer password</a></p>";
        $contenido.= "<p>Si tu no solicitaste este cambio o esta cuenta ignora el mensaje</p>";
        $contenido.= "</html>";

        $mail->Body = $contenido;

        // Enviar el emaik
        $mail->send();
    }
}

?>