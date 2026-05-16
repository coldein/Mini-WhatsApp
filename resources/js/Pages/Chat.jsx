import React, { useEffect, useRef, useState } from 'react';

/*
|--------------------------------------------------------------------------
| API SERVICE
|--------------------------------------------------------------------------
*/

const api = {

    async sendMessage(sender, message) {

        const response = await fetch(
            'http://127.0.0.1:8000/api/send-message',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                body: JSON.stringify({
                    sender,
                    message
                })
            }
        );

        return await response.json();
    }
};

/*
|--------------------------------------------------------------------------
| MESSAGE BUBBLE
|--------------------------------------------------------------------------
*/

function MessageBubble({
    message,
    isMine
}) {

    const formatTime = (timestamp) => {

        return new Date(timestamp).toLocaleTimeString(
            'pt-BR',
            {
                hour: '2-digit',
                minute: '2-digit'
            }
        );
    };

    const renderStatus = () => {

        switch (message.status) {

            case 'sent':

                return (
                    <i className="fas fa-check text-[11px] opacity-70"></i>
                );

            case 'delivered':

                return (
                    <i className="fas fa-check-double text-[11px] opacity-70"></i>
                );

            case 'read':

                return (
                    <i className="fas fa-check-double text-[11px] text-sky-400"></i>
                );

            default:
                return null;
        }
    };

    return (

        <div
            className={`
                flex
                ${isMine ? 'justify-end' : 'justify-start'}
            `}
        >

            <div
                className={`
                    max-w-[78%]
                    rounded-3xl
                    px-4
                    py-2.5
                    shadow-xl
                    border
                    ${isMine
                        ? 'bg-[#005C4B] border-emerald-900/30 text-white rounded-br-md'
                        : 'bg-[#202C33] border-zinc-700/20 text-white rounded-bl-md'
                    }
                `}
            >

                <p className="text-[14px] break-words">
                    {message.text}
                </p>

                <div className="flex justify-end items-center gap-1 mt-1">

                    <span className="text-[10px] opacity-70">

                        {formatTime(message.timestamp)}

                    </span>

                    {isMine && renderStatus()}

                </div>

            </div>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| PHONE
|--------------------------------------------------------------------------
*/

function Phone({
    title,
    myChannel,
    sender,
    inputPlaceholder
}) {

    const [messages, setMessages] = useState([]);

    const [inputText, setInputText] = useState('');

    const messagesEndRef = useRef(null);

    /*
    |--------------------------------------------------------------------------
    | SOCKET LISTENER
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const channel = window.Echo.channel(myChannel);

        channel.listen('.message.received', (e) => {

            setMessages(prev => {

                const exists = prev.some(msg => msg.id === e.message.id);

                if (exists) return prev;

                return [...prev, e.message];
            });

        });

        return () => {

            window.Echo.leave(myChannel);

        };

    }, [myChannel]);

    /*
    |--------------------------------------------------------------------------
    | AUTO SCROLL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });

    }, [messages]);


    /*
    |--------------------------------------------------------------------------
    | SEND MESSAGE
    |--------------------------------------------------------------------------
    */

    const handleSendMessage = async () => {

        if (!inputText.trim()) {
            return;
        }

        const localMessage = {

            id: Date.now(),

            text: inputText,

            sender,

            status: 'sent',

            timestamp: new Date().toISOString()
        };

        setMessages(prev => [

            ...prev,

            localMessage

        ]);

        const currentText = inputText;

        setInputText('');

        try {

            await api.sendMessage(
                sender,
                currentText
            );

            setTimeout(() => {

                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === localMessage.id
                            ? {
                                ...msg,
                                status: 'delivered'
                            }
                            : msg
                    )
                );

            }, 400);

        } catch (e) {

            console.error(e);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | ENTER SEND
    |--------------------------------------------------------------------------
    */

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            handleSendMessage();
        }
    };

    const [isBlocked, setIsBlocked] = useState(false);

    const toggleBlock = () => {
        if (isBlocked) {
            setIsBlocked(false);
        } else {
            setIsBlocked(true);
        }
    };

    // const toggleBlock = async () => {

    //     // const response = await fetch('http://127.0.0.1:8000/api/block', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: JSON.stringify({
    //     //         blocker: sender,
    //     //         blocked: sender === 'left' ? 'right' : 'left'
    //     //     })
    //     // });

    //     // const data = await response.json();

    //     setIsBlocked(data.blocked);
    // };

    return (

        <div className={`
            relative
            transition-all duration-300
        `}>

            {/* Glow */}

            <div className="absolute inset-0 bg-white/5 blur-3xl scale-110 rounded-[60px]"></div>

            {/* Device */}

            <div
                className={`
                    relative
                    w-[390px]
                    h-[844px]
                    rounded-[58px]
                    p-[3px]
                    bg-gradient-to-b
                    from-zinc-500
                    via-zinc-700
                    to-zinc-950
                    shadow-[0_0_80px_rgba(0,0,0,0.95)]
                `}
            >

                {/* Frame */}

                <div
                    className="
                        relative
                        w-full
                        h-full
                        rounded-[55px]
                        overflow-hidden
                        bg-black
                        border
                        border-white/10
                    "
                >

                    {/* Reflection */}

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-br
                            from-white/10
                            via-transparent
                            to-transparent
                            z-50
                            pointer-events-none
                        "
                    ></div>

                    {/* Dynamic Island */}

                    <div
                        className="
                            absolute
                            top-3
                            left-1/2
                            -translate-x-1/2
                            w-[126px]
                            h-[37px]
                            bg-black
                            rounded-full
                            z-[60]
                            border
                            border-zinc-800
                            flex
                            items-center
                            justify-end
                            pr-3
                        "
                    >

                        <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700"></div>

                    </div>

                    {/* Status Bar */}

                    <div className="absolute top-0 left-0 right-0 z-40 px-8 pt-4 flex justify-between text-white text-[13px] font-semibold">

                        <span></span>

                        <div className="flex items-center gap-2">

                            <i className="fas fa-signal text-[11px]"></i>

                            <i className="fas fa-wifi text-[11px]"></i>

                            <i className="fas fa-battery-full text-[11px]"></i>


                            <button
                                onClick={toggleBlock}
                                className="text-xs bg-red-600 px-3 py-1 rounded-full"
                            >
                                {isBlocked ? 'Desbloquear' : 'Bloquear'}
                            </button>
                        </div>

                    </div>

                    {/* CONTENT */}

                    <div className={`relative flex flex-col h-full ${isBlocked ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>

                        {/* HEADER */}

                        <div className="bg-[#075E54] text-white px-4 pt-16 pb-3 flex items-center justify-between border-b border-black/20">

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        w-11
                                        h-11
                                        rounded-full
                                        bg-gradient-to-br
                                        from-emerald-400
                                        to-teal-700
                                        flex
                                        items-center
                                        justify-center
                                        font-bold
                                    "
                                >

                                    {title.charAt(0)}

                                </div>

                                <div>

                                    <h2 className="font-semibold text-[15px]">

                                        {title}

                                    </h2>

                                    <span className="text-[11px] opacity-80">

                                        online

                                    </span>

                                </div>

                            </div>

                            <div className="flex gap-5 text-lg">

                                <i className="fas fa-video"></i>

                                <i className="fas fa-phone"></i>

                                <i className="fas fa-ellipsis-v"></i>

                            </div>

                        </div>

                        {/* CHAT */}

                        <div
                            className={`
                                flex-1
                                overflow-y-auto
                                px-3
                                py-4
                                space-y-2
                            `}

                            style={{
                                backgroundImage:
                                    'url(https://www.transparenttextures.com/patterns/cartographer.png)',

                                backgroundColor: '#0B141A'
                            }}
                        >

                            {messages.map((message) => (

                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    isMine={message.sender === sender}
                                />

                            ))}

                            <div ref={messagesEndRef}></div>

                        </div>

                        {/* INPUT */}

                        <div
                            className="
                                bg-[#111B21]/95
                                backdrop-blur-xl
                                px-3
                                py-3
                                flex
                                items-center
                                gap-2
                                border-t
                                border-white/5
                            "
                        >

                            <button className="text-zinc-400 text-2xl">

                                <i className="far fa-face-smile"></i>

                            </button>

                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={inputPlaceholder}
                                className="
                                    flex-1
                                    bg-[#202C33]
                                    rounded-full
                                    px-5
                                    py-3
                                    text-sm
                                    text-white
                                    outline-none
                                    border
                                    border-white/5
                                "
                            />

                            <button
                                onClick={handleSendMessage}
                                className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-[#00A884]
                                    flex
                                    items-center
                                    justify-center
                                    shadow-lg
                                    transition
                                    active:scale-95
                                "
                            >

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                >
                                    <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                                </svg>

                            </button>

                        </div>

                    </div>

                    {/* HOME BAR */}

                    <div
                        className="
                            absolute
                            bottom-1
                            left-1/2
                            -translate-x-1/2
                            w-[140px]
                            h-[5px]
                            bg-white/70
                            rounded-full
                            z-50
                        "
                    ></div>

                </div>

            </div>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| MAIN CHAT
|--------------------------------------------------------------------------
*/

export default function Chat() {

    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-br
                from-zinc-950
                via-black
                to-zinc-900
                flex
                items-center
                justify-center
                gap-12
                px-10
                py-10
                overflow-hidden
            "
        >

            {/* BACKGROUND */}

            <div className="fixed inset-0 pointer-events-none">

                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>

                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>

            </div>

            {/* LEFT */}

            <Phone
                title="Marcos"
                sender="left"
                myChannel="device.left"
                inputPlaceholder="Digite uma mensagem..."
            />

            {/* RIGHT */}

            <Phone
                title="Julia"
                sender="right"
                myChannel="device.right"
                inputPlaceholder="Responder..."
            />

        </div>
    );
}