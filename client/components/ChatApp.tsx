"use client"
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function getAvatarColor(sender) {
    let hash = 0;
    for (let i = 0; i < sender.length; i++) {
        hash = 31 * hash + sender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
}

export default function ChatApp() {
    const [username, setUsername] = useState('');
    const [enteredUsername, setEnteredUsername] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const stompClient = useRef(null);
    const messageAreaRef = useRef(null);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const connect = (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setConnecting(true);

        const socket = new SockJS('http://localhost:8080/ws');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                // console.log(str);
            },
            onConnect: () => {
                stompClient.current.subscribe('/user/queue/messages', onMessageReceived); // Private message receiver

                stompClient.current.publish({
                    destination: '/app/chat.addUser',
                    body: JSON.stringify({ sender: username, type: 'JOIN' }),
                });

                setEnteredUsername(true);
                setConnecting(false);
            },

            onStompError: (frame) => {
                setConnecting(false);
                alert('Could not connect to WebSocket server. Please refresh this page to try again!');
            },
        });

        stompClient.current.activate();
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInput.trim() && stompClient.current) {
            const chatMessage = {
                sender: username,
                content: messageInput,
                type: 'CHAT',
            };

            stompClient.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage),
            });

            setMessageInput('');
        }
    };

    const onMessageReceived = (message) => {
        const msg = JSON.parse(message.body);
        setMessages((prev) => [...prev, msg]);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {!enteredUsername && (
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                    <h1 className="text-2xl font-semibold mb-6">Type your username to enter the Chatroom</h1>
                    <form onSubmit={connect}>
                        <input
                            type="text"
                            placeholder="Username"
                            autoComplete="off"
                            className="bg-blue-600 w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                            disabled={connecting}
                        >
                            {connecting ? 'Connecting...' : 'Start Chatting'}
                        </button>
                    </form>
                </div>
            )}

            {enteredUsername && (
                <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full flex flex-col h-[600px]">
                    <header className="p-4 border-b border-gray-300 text-center font-semibold text-lg">
                        Spring WebSocket Chat Demo - By Alibou
                    </header>

                    <div
                        ref={messageAreaRef}
                        className="flex-1 overflow-y-auto p-4 space-y-3 bg-white"
                    >
                        {messages.length === 0 && (
                            <p className="text-center text-gray-500">No messages yet</p>
                        )}

                        {messages.map((message, idx) => {
                            if (message.type === 'JOIN' || message.type === 'LEAVE') {
                                return (
                                    <p
                                        key={idx}
                                        className="text-center text-gray-500 italic text-sm"
                                    >
                                        {message.sender} {message.type === 'JOIN' ? 'joined!' : 'left!'}
                                    </p>
                                );
                            } else {
                                return (
                                    <div key={idx} className="flex items-start space-x-3">
                                        <div
                                            className="flex-shrink-0 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold uppercase"
                                            style={{ backgroundColor: getAvatarColor(message.sender) }}
                                        >
                                            {message.sender[0]}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900">{message.sender}</span>
                                            <p className="text-gray-700">{message.content}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <form
                        onSubmit={sendMessage}
                        className="p-4 border-t border-gray-300 flex space-x-2"
                    >
                        <input
                            type="text"
                            placeholder="Type a message..."
                            autoComplete="off"
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
