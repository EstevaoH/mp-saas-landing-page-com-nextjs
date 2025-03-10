"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    // useEffect(() => {
    //     const fetchTheme = async () => {
    //         if (id) {
    //             const result = await getUserSettings(parseInt(id));
    //             if (result?.success && result.settings) {
    //                 const themeSetting = result.settings.find(
    //                     (setting) => setting.key === 'theme'
    //                 );
    //                 if (themeSetting) {
    //                     setTheme(themeSetting.value);
    //                 }
    //             }
    //         }
    //     };

    //     fetchTheme();
    // }, [id, setTheme]);

    // Alterna o tema e salva a preferência
    // const handleThemeToggle = async (checked: boolean) => {
    //     const newTheme = checked ? 'dark' : 'light';
    //     setTheme(newTheme);

    //     if (id) {
    //         try {
    //             await updateUserSetting(
    //                 parseInt(id),
    //                 'theme',
    //                 newTheme
    //             );
    //         } catch (error) {
    //             console.error('Erro ao salvar preferência do tema:', error);
    //             setTheme(theme === 'dark' ? 'light' : 'dark');
    //         }
    //     }
    // };

    return (
        <div className="flex items-center space-x-4">
            <Switch
                checked={theme === 'dark'}
                // onCheckedChange={handleThemeToggle}
                id="theme"
            />
        </div>
    );
}