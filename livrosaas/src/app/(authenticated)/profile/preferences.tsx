"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { updateUserSetting } from "./profileActions";
import { useSearchParams } from "next/navigation";

interface ThemeProps {
    userTheme: string;
}

export function Preferences({ userTheme }: ThemeProps) {
    const { theme, setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(userTheme);
    const searchParams = useSearchParams();
    const userId = parseInt(searchParams.get('id')!);

    useEffect(() => {
        setTheme(userTheme);
        setCurrentTheme(userTheme);
    }, [userTheme, setTheme]);

    const handleThemeToggle = async (checked: boolean) => {
        const newTheme = checked ? "dark" : "light";
        setTheme(newTheme); 
        setCurrentTheme(newTheme);

        try {
            await updateUserSetting(userId, "theme", newTheme);
        } catch (error) {
            setTheme(currentTheme);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>Personalize sua experiência no sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Switch checked={currentTheme === "dark"} onCheckedChange={handleThemeToggle} id="notifications" />
                    <span>{userTheme === "dark" ? "Tema escuro" : "Tema claro" }</span>
                </div>
            </CardContent>
        </Card>
    );
}