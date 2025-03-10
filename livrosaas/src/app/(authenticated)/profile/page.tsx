"use client";
import ProfileForm from "./profile-form";
import { Security } from "./security";
import { Preferences } from "./preferences";
import { DeleteAccount } from "./delete-account";
import { Notification } from "./notification";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSettings } from "./profileActions";
import { useTheme } from "next-themes";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [userTheme, setUserTheme] = useState("");
    const { theme, setTheme } = useTheme();
    const id = searchParams.get("id");

    useEffect(() => {
        const fetchSettings = async () => {
            if (id) {
                const result = await getUserSettings(parseInt(id));
                if (result.success && result.settings) {
                    setNotificationsEnabled(result.settings.notifications);
                    setUserTheme(result.settings.theme);
                } else {
                    console.error("Erro ao buscar configurações:", result.message);
                }
            }
        };

        fetchSettings();
    }, [id]);

    return (
        <>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Perfil</h1>
                    <p className="text-gray-600 dark:text-gray-50">
                        Gerencie suas informações pessoais, segurança e preferências.
                    </p>
                </div>
                <ProfileForm />
                <Security />
                <Notification notificationsEnabled={notificationsEnabled} />
                <Preferences userTheme={theme!} />
                <DeleteAccount />
            </div>
        </>
    );
}