📱 Mini WhatsApp Realtime (Laravel + React + WebSocket)

Este projeto é um simulador de chat em tempo real inspirado no WhatsApp, desenvolvido com foco em estudo de WebSockets, Laravel Broadcasting e React state management.

A aplicação simula dois dispositivos móveis interagindo entre si, permitindo envio e recebimento de mensagens instantâneas com status de entrega.

🚀 Objetivo

O objetivo do projeto é praticar conceitos modernos de desenvolvimento full-stack, incluindo:

Comunicação em tempo real com WebSockets
Broadcast de eventos no Laravel
Consumo de API via React
Manipulação de estado e UI dinâmica
Simulação de comportamento de aplicativos móveis
🧠 Funcionalidades
💬 Chat em tempo real entre dois dispositivos simulados
📡 Comunicação via Laravel Broadcasting (Reverb / WebSocket)
📱 Interface estilo iPhone com layout inspirado no WhatsApp
✔ Status de mensagem (sent, delivered, read)
🔒 Sistema de bloqueio entre dispositivos (simulado)
⏱ Timestamp de mensagens
🧩 Separação de canais por dispositivo
🏗️ Stack utilizada
Backend
Laravel 10+
Laravel Broadcasting
WebSockets (Reverb / Pusher compatível)
SQLite (modo desenvolvimento)
Frontend
React
Vite
TailwindCSS
Font Awesome (ícones)
📡 Arquitetura de comunicação

O sistema funciona com base em canais separados por dispositivo:

device.left   → mensagens do dispositivo esquerdo
device.right  → mensagens do dispositivo direito

Fluxo:

React → API Laravel → Event Broadcast → WebSocket → React Listener
🔥 Conceitos aplicados
Event-driven architecture
Real-time communication
Optimistic UI updates
Channel-based messaging
State synchronization entre dispositivos
📸 Interface

O projeto simula dois smartphones lado a lado com visual inspirado em dispositivos modernos, permitindo interação simultânea entre os dois lados do chat.

🧪 Status do projeto

🚧 Em desenvolvimento (versão de estudo / laboratório)

💡 Futuras melhorias
Autenticação de usuários reais
Salas privadas (chat rooms)
Persistência completa no banco
Indicador de digitação
Mensagens offline (fila)
Suporte a múltiplos usuários
🧑‍💻 Autor

Projeto desenvolvido para estudo de arquitetura realtime full-stack.