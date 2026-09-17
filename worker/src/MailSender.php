<?php


use eftec\bladeone\BladeOne;
use PHPMailer\PHPMailer\PHPMailer;

class MailSender
{
    private BladeOne $blade;

    public function __construct()
    {
        $this->blade = new BladeOne(
            __DIR__ . '/../templates/emails',
            __DIR__ . '/../storage/cache',
            BladeOne::MODE_AUTO
        );
    }

    public function sendWelcome(array $data): void
    {
        $html = $this->blade->run('welcome', [
            'name' => $data['name'],
            'address' => $data['address'],
        ]);

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST');
        $mail->Port = getenv('SMTP_PORT');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USER');
        $mail->Password = getenv('SMTP_PASS');
        $mail->setFrom('noreply@seudominio.com', 'Register Flow');
        $mail->addAddress($data['email']);
        $mail->isHTML(true);
        $mail->Subject = 'Bem-vindo(a) à Plataforma Register Flow';
        $mail->Body = $html;

        $mail->send();
    }
}