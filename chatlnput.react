import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Smile } from "lucide-react";
import { motion } from "framer-motion";

const EMOJI_LIST = ["😊", "😂", "❤️", "👍", "👎", "😢", "😮", "😡", "🔥", "💯", "🎉", "✨"];

export default function ChatInput({ onSendMessage, disabled }) {
    const [message, setMessage] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (trimmedMessage && !disabled) {
            onSendMessage(trimmedMessage);
            setMessage("");
            setShowEmojis(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const addEmoji = (emoji) => {
        setMessage(prev => prev + emoji);
    };

    return (
        <div className="relative bg-white border-t border-gray-100 p-4">
            {showEmojis && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-xl p-3 shadow-lg grid grid-cols-6 gap-2"
                >
                    {EMOJI_LIST.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => addEmoji(emoji)}
                            className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center text-xl transition-colors duration-200"
                        >
                            {emoji}
                        </button>
                    ))}
                </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <div className="flex-1 relative">
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="min-h-[44px] max-h-32 resize-none border-gray-200 rounded-full px-4 py-3 pr-12 focus:border-blue-400 focus:ring-blue-400 transition-colors duration-200"
                        disabled={disabled}
 
