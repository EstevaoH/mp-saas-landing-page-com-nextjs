"use client";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Efeito para garantir que o componente seja renderizado apenas no cliente
    useEffect(() => {
        setMounted(true);
    }, []);

    // Se o componente ainda não foi montado, não renderize nada
    if (!mounted) {
        return null;
    }

    return (
        <div className="flex items-center space-x-4">
            <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                id="theme"
            />
            <Label htmlFor="theme">Tema Escuro</Label>
        </div>
    );
}