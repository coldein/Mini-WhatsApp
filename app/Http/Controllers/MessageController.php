<?php

namespace App\Http\Controllers;

use App\Events\DeviceMessage;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request)
    {

        $sender = strtolower(trim($request->sender));

        $targetChannel =
            $sender === 'left'
            ? 'device.right'
            : 'device.left';

        $message = [

            'target' => $targetChannel,

            'id' => uniqid('', true),

            'text' => $request->message,

            'sender' => $request->sender,

            'timestamp' => now(),

            'status' => 'delivered'
        ];

        broadcast(
            new DeviceMessage(
                $message,
                $targetChannel
            )
        )->toOthers();

        return response()->json([
            'success' => true
        ]);
    }
}
