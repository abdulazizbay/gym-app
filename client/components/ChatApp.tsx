"use client"
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import {useRouter} from "next/navigation";
import { toast } from "sonner"
import { useSearchParams } from "next/navigation";
import {jwtDecode} from "jwt-decode";
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
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

    const [username, setUsername] = useState("");
    const [receiver, setReceiver] = useState(searchParams.get("receiver") || "");
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [enteredUsername, setEnteredUsername] = useState(false);

    const stompClient = useRef(null);

    useEffect(() => {
        if (!token) {
            toast("Login first");
            router.push("/auth/login");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const extractedUsername = decoded.sub || decoded.username;

            if (!extractedUsername) throw new Error("Invalid token");

            setUsername(extractedUsername);

            const trainer = localStorage.getItem("trainerUsername");
            const client = localStorage.getItem("clientUsername");

            if (extractedUsername === trainer && client) {
                setReceiver(client);
            } else if (trainer) {
                setReceiver(trainer);
            }

        } catch (error) {
            toast("Invalid token");
            router.push("/auth/login");
        }
    }, []);

    useEffect(() => {
        if (username && receiver && !enteredUsername) {
            connect();
        }
    }, [username, receiver]);

    const connect = () => {
        if (!username.trim()) return;

        stompClient.current = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
            onConnect: () => {
                stompClient.current.subscribe("/user/queue/messages", onMessageReceived);

                stompClient.current.publish({
                    destination: "/app/chat.addUser",
                    body: JSON.stringify({
                        sender: username,
                        receiver: receiver,
                        type: "JOIN",
                    }),
                });

                setEnteredUsername(true);
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
                toast("Could not connect");
            },
            debug: () => {},
        });

        stompClient.current.activate();
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInput.trim() && stompClient.current) {
            const chatMessage = {
                sender: username,
                receiver: receiver,
                content: messageInput,
                type: "CHAT",
            };

            setMessages((prev) => [...prev, chatMessage]);

            stompClient.current.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(chatMessage),
            });

            setMessageInput("");
        }
    };

    const onMessageReceived = (message) => {
        const msg = JSON.parse(message.body);
        console.log("Received:", msg);

        if (msg.type === "JOIN" && msg.sender !== username) {
            localStorage.setItem("clientUsername", msg.sender);
            setReceiver(msg.sender);
        }

        setMessages((prev) => [...prev, msg]);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-black">


                <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full flex flex-col h-[600px]">
                    <header className="p-4 border-b border-gray-300 text-center font-semibold text-lg">
                        Chat
                    </header>

                    <div
                        // ref={messageAreaRef}
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
                                const isOwnMessage = message.sender === username;

                                return (
                                    <div
                                        key={idx}
                                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[75%] p-3 rounded-lg shadow
                    ${isOwnMessage ? 'bg-green-100 text-right' : 'bg-blue-100 text-left'}`}>
                                            <div className="text-xs text-gray-500 font-semibold mb-1">
                                                {message.sender}
                                            </div>
                                            <div className="text-sm">{message.content}</div>
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
        </div>
    );
}
