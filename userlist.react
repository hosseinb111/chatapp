import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function UserList({ users, currentUser }) {
    const otherUsers = users.filter(user => user.email !== currentUser?.email);
    const uniqueUsers = otherUsers.reduce((acc, user) => {
        if (!acc.find(u => u.email === user.email)) {
            acc.push(user);
        }
        return acc;
    }, []);

    return (
        <Card className="h-fit shadow-sm border-gray-200">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                    Online Users
                    <Badge variant="secondary" className="ml-auto">
                        {uniqueUsers.length + 1}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Current User */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-100"
                >
                    <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {currentUser?.full_name?.[0]?.toUpperCase() || "Y"}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">
                            {currentUser?.full_name || "You"}
                        </p>
                        <p className="text-xs text-gray-500">You</p>
                    </div>
                </motion.div>

                {/* Other Users */}
                {uniqueUsers.map((user, index) => (
                    <motion.div
                        key={user.email}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {user.sender_name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
 
