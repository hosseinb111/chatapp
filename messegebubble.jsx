import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { User } from "lucide-react";

export default function MessageBubble({ message, isOwnMessage, currentUser }) {
    const isSystemMessage = message.message_type === "system";

    if (isSystemMessage) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-4"
            >
                <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
                    {message.content}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex mb-6 ${isOwnMessage ? "justify-end" : "justify-start"}`}
        >
            <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? "order-2" : ""}`}>
                <div className={`flex items-end gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                    {!isOwnMessage && (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mb-1">
                            {message.sender_name ? message.sender_name[0].toUpperCase() : <User className="w-4 h-4" />}
                        </div>
                    )}
                    
                    <div className="flex flex-col">
                        {!isOwnMessage && (
                            <div className="text-xs text-gray-500 mb-1 px-1">
                                {message.sender_name}
                            </div>
                        )}
                        
                        <div
                            className={`px-4 py-3 rounded-3xl shadow-sm ${
                                isOwnMessage
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-lg"
                                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-lg"
                            }`}
                        >
                            <p className="text-sm leading-relaxed break-words">
                                {message.content}
                            </p>
                        </div>
                        
                        <div className={`text-xs text-gray-400 mt-1 px-1 ${isOwnMessage ? "text-right" : ""}`}>
                            {format(new Date(message.created_date), "HH:mm")}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
