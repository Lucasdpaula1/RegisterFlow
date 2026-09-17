<?php

require __DIR__ . '/../vendor/autoload.php';

use PhpAmqpLib\Message\AMQPMessage;

$connection = RabbitMQConnection::make();
$channel = $connection->channel();

$channel->queue_declare('user.welcome', false, true, false, false);

echo " [*] Aguardando mensagens em user.welcome\n";

$callback = function (AMQPMessage $msg) {
    $payload = json_decode($msg->getBody(), true);
    $mailer = new MailSender();
    $mailer->sendWelcome($payload);

    $msg->ack();
};

$channel->basic_qos(null, 1, null);
$channel->basic_consume('user.welcome', '', false, false, false, false, $callback);

while ($channel->is_consuming()) {
    $channel->wait();
}