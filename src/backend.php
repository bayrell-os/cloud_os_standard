#!/usr/bin/php
<?php

define ('ROOT_PATH', __DIR__);
ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(0);

// Include vendor
require ROOT_PATH . "/vendor/autoload.php";

use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Wire\AMQPTable;

$env = getenv();

// AMQP constants
define('AMQP_APP_EXCHANGE', 'Bayrell.CloudOS');
define('AMQP_APP_QUEUE', 'Bayrell.CloudOS');
$AMQP_HOST = isset($env['AMQP_HOST']) ? $env['AMQP_HOST'] : "";
$AMQP_PORT = isset($env['AMQP_PORT']) ? $env['AMQP_PORT'] : "";
$AMQP_LOGIN = isset($env['AMQP_LOGIN']) ? $env['AMQP_LOGIN'] : "guest";
$AMQP_PASSWORD = isset($env['AMQP_PASSWORD']) ? $env['AMQP_PASSWORD'] : "guest";
$AMQP_RESPONSE_TIME = 20000;
$AMQP_MESSAGE_TTL = 10000;


// AMQP connection
$amqp_connection = null;
$amqp_channel = null;


// Callback
$callback = function ($msg)
{
	if ($msg->has('reply_to') && $msg->has('correlation_id'))
	{
		
		// Call bus
		try
		{
			$cmd = __DIR__ . "/bus.php";
			$spec =
			[
				0 => ["pipe", "r"],
				1 => ["pipe", "w"],
			];
			$process = proc_open($cmd, $spec, $pipes);
			if (is_resource($process))
			{
				fwrite($pipes[0], $msg->body);
				fclose($pipes[0]);
				
				$result = stream_get_contents($pipes[1]);
				fclose($pipes[1]);
				
				proc_close($process);
			}
		}
		catch (Exception $e)
		{
			$result = json_encode
			([
				"code" => -1,
				"error_message" => $e->getMessage(),
			]);
		}
		
		echo "Send answer " . $msg->get('correlation_id') .  " to " . $msg->get('reply_to') . "\n";
		
		// Send result
		$answer = new AMQPMessage
		(
			(string) $result,
			[
				'correlation_id' => $msg->get('correlation_id')
			]
		);
		$msg->delivery_info['channel']->basic_publish
		(
			$answer, 
			'', 
			$msg->get('reply_to')
		);
		
	}
};


try
{
	// Connect to AMQP
	$amqp_connection = @new AMQPStreamConnection($AMQP_HOST, $AMQP_PORT, $AMQP_LOGIN, $AMQP_PASSWORD);
	$amqp_channel = $amqp_connection->channel();
	
	
	// Create exchange
	$amqp_channel->exchange_declare
	(
		// Exchange name
		AMQP_APP_EXCHANGE,  // string $exchange
		
		// Type
		'direct',
		
		// Passive
		false,
		
		// Durable
		true,
		
		// Auto delete
		true,
		
		// Internal
		false,
		
		// No wait
		false,
		
		// Arguments
		null,
		
		// Ticket
		null
	);
	
	
	
	// Create temp queue
	list($amqp_tmp_queue) = $amqp_channel->queue_declare
	(
		// Queue name
		AMQP_APP_QUEUE,
		
		// Passive
		false,
		
		// Durable. The queue deleted when broker restart
		true,
		
		// Exclusive. Scopes the queue to the current connection
		false,
		
		// Auto Delete. The queue will be deleted when the number of consumers drops to zero
		false,
		
		// No wait
		false,
		
		// Arguments
		null,
		
		// Ticket
		null
	);
	
	
	// Bind exchange to queue
	$amqp_channel->queue_bind
	(
		// Queue name
		AMQP_APP_QUEUE,
		
		// Exchange name
		AMQP_APP_EXCHANGE,
		
		// Routing key
		'',
		
		// No wait
		false,
		
		// Arguments
		null,
		
		// Ticket
		null
	);
	
	
	// Start recieve messages
	$amqp_channel->basic_qos(null, 1, null);
	$amqp_channel->basic_consume
	(
		// Queue name
		AMQP_APP_QUEUE,
		
		// Consumer tag
		'',
		
		// No local
		false,
		
		// No ack. The broker won't expect an acknowledgement of messages delivered to this consumer
		true,
		
		// Exclusive. The broker won't let anyone else consume from this queue
		false,
		
		// No wait
		false,
		
		// Callback function
		$callback,
		
		// Ticket
		null,
		
		// Arguments
		null
	);
	
	
	// Waiting for messages
	while (count($amqp_channel->callbacks))
	{
		$amqp_channel->wait();
	}
	
	
	// Disconnect
	$amqp_channel->close();
	$amqp_connection->close();	
}
catch (Exception $err)
{
	echo $err->getMessage() . "\n";
}