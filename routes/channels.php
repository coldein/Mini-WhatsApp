<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('device.left', function () {
    return true;
});

Broadcast::channel('device.right', function () {
    return true;
});