<?php


use PhpAmqpLib\Connection\AMQPStreamConnection;

class RabbitMQConnection
{
    public static function make(): AMQPStreamConnection
    {
        return new AMQPStreamConnection(
            getenv('RABBITMQ_HOST') ?: 'rabbitmq',
            getenv('RABBITMQ_PORT') ?: 5672,
            getenv('RABBITMQ_USER') ?: 'guest',
            getenv('RABBITMQ_PASS') ?: 'guest'
        );
    }
}