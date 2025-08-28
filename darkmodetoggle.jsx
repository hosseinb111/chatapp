import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if dark mode was previously set
        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'true' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
                <Moon className="w-5 h-5 text-gray-600" />
            )}
        </Button>
    );
}
