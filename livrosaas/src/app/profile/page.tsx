"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ProfileForm from "./profile-form";
import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/theme-switch";

export default function ProfilePage() {
    const { theme, setTheme } = useTheme();
    const [userData, setUserData] = useState({
        name: 'João Silva',
        email: 'joao@exemplo.com',
        phone: '(11) 99999-9999',
    });

    const handleDeleteAccount = () => {
        if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
            console.log('Conta excluída');
        }
    };

    return (
        <>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Perfil</h1>
                    <p className="text-gray-600">Gerencie suas informações pessoais, segurança e preferências.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações Pessoais</CardTitle>
                        <CardDescription>Atualize suas informações de contato.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ProfileForm />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Segurança</CardTitle>
                        <CardDescription>Proteja sua conta com senha forte e autenticação de dois fatores.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline">Alterar Senha</Button>
                        <div className="flex items-center space-x-4">
                            <Switch id="2fa" />
                            <Label htmlFor="2fa">Habilitar Autenticação de Dois Fatores (2FA)</Label>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Preferências</CardTitle>
                        <CardDescription>Personalize sua experiência no sistema.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            {/* <ThemeSwitch /> */}
                            <Label htmlFor="theme">Tema Escuro</Label>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-600">Excluir Conta</CardTitle>
                        <CardDescription className="text-red-600">
                            Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                            Excluir Conta Permanentemente
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}