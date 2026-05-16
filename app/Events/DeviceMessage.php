<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;

class DeviceMessage implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $message;

    public string $targetChannel;

    public function __construct(array $message, string $targetChannel)
    {
        $this->message = $message;

        $this->targetChannel = $targetChannel;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel($this->targetChannel)
        ];
    }

    public function broadcastAs(): string
    {
        return 'message.received';
    }
}