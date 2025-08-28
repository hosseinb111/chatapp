
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Message, User } from "@/entities/all";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Wifi, WifiOff, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import MessageBubble from "../components/chat/MessageBubble";
import ChatInput from "../components/chat/ChatInput";
import UserList from "../components/chat/UserList";
import DarkModeToggle from "../components/chat/DarkModeToggle";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const loadMessages = useCallback(async () => {
        try {
            const allMessages = await Message.list('-created_date', 100);
            setMessages(allMessages.reverse());
            setIsConnected(true);
        } catch (error) {
            console.error("Failed to load messages:", error);
            setIsConnected(false);
        }
    }, []);

    const initializeChat = useCallback(async () => {
        try {
            const user = await User.me();
            setCurrentUser(user);
            await loadMessages();
            
            // Send welcome message for new users
            const userMessages = await Message.filter({ sender_email: user.email });
            if (userMessages.length === 0) {
                await Message.create({
                    content: `${user.full_name} joined the chat!`,
                    sender_name: "System",
                    sender_email: "system@chat.app",
                    message_type: "system"
                });
            }
        } catch (error) {
            console.error("Failed to initialize chat:", error);
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    }, [loadMessages]);

    useEffect(() => {
        initializeChat();
        
        const interval = setInterval(() => {
            loadMessages();
        }, 2000); // Poll every 2 seconds for real-time updates

        return () => clearInterval(interval);
    }, [initializeChat, loadMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (content) => {
        if (!currentUser || isSending) return;

        setIsSending(true);
        try {
            const newMessage = await Message.create({
                content,
                sender_name: currentUser.full_name,
                sender_email: currentUser.email,
                room: "general"
            });

            // Immediately add to local state for instant feedback
            setMessages(prev => [...prev, newMessage]);
            setIsConnected(true);
        } catch (error) {
            console.error("Failed to send message:", error);
            setIsConnected(false);
        } finally {
            setIsSending(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getUniqueUsers = () => {
        const users = messages.filter(msg => msg.message_type !== "system");
        return users.reduce((acc, msg) => {
            if (!acc.find(u => u.email === msg.sender_email)) {
                acc.push({
                    email: msg.sender_email,
                    sender_name: msg.sender_name
                });
            }
            return acc;
        }, []);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loading Chat...</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Getting everything ready</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="flex h-screen max-w-7xl mx-auto">
                {/* Sidebar for larger screens */}
                <div className={`hidden lg:flex lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300 ${showUserList ? '' : ''}`}>
                    <div className="flex flex-col w-full">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">ChatApp</h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Real-time messaging</p>
                                    </div>
                                </div>
                                <DarkModeToggle />
                            </div>
                        </div>
                        
                        <div className="flex-1 p-4 overflow-y-auto">
                            <UserList users={getUniqueUsers()} currentUser={currentUser} />
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden"
                                    onClick={() => setShowUserList(!showUserList)}
                                >
                                    <Users className="w-5 h-5" />
                                </Button>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Chat</h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        {isConnected ? (
                                            <>
                                                <Wifi className="w-4 h-4 text-green-500" />
                                                Connected
                                            </>
                                        ) : (
                                            <>
                                                <WifiOff className="w-4 h-4 text-red-500" />
                                                Disconnected
                                            </>
                                        )}
                                        <span>•</span>
                                        <span>{getUniqueUsers().length + 1} online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="lg:hidden">
                                    <DarkModeToggle />
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isConnected && (
                        <Alert variant="destructive" className="m-4">
                            <WifiOff className="h-4 w-4" />
                            <AlertDescription>
                                Connection lost. Messages may not be sent or received.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Messages Area */}
                    <div 
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
                        style={{ minHeight: 0 }}
                    >
                        <AnimatePresence>
                            {messages.map((message) => (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    isOwnMessage={message.sender_email === currentUser?.email}
                                    currentUser={currentUser}
                                />
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <ChatInput 
                        onSendMessage={sendMessage} 
                        disabled={!isConnected || isSending}
                    />
                </div>

                {/* Mobile User List Overlay */}
                {showUserList && (
                    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex">
                        <div className="bg-white dark:bg-gray-800 w-80 h-full overflow-y-auto">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <h3 className="text-lg font-semibold dark:text-white">Online Users</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowUserList(false)}
                                >
                                    ×
                                </Button>
                            </div>
                            <div className="p-4">
                                <UserList users={getUniqueUsers()} currentUser={currentUser} />
                            </div>
                        </div>
                        <div 
                            className="flex-1" 
                            onClick={() => setShowUserList(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
