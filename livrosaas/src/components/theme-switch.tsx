"use client";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

 
    return (
        <div className="flex items-center space-x-4">
            <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                id="theme"
            />
            {/* <Label htmlFor="theme">Tema Escuro</Label> */}
        </div>
    );
}