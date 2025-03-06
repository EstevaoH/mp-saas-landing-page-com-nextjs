"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProfileForm from "./profile-form";
import { useTheme } from "next-themes";
import { Security } from "./security";
import { Preferences } from "./preferences";
import { DeleteAccount } from "./delete-account";

export default function ProfilePage() {
    return (
        <>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Perfil</h1>
                    <p className="text-gray-600">Gerencie suas informações pessoais, segurança e preferências.</p>
                </div>
                <ProfileForm />
                <Security />
                <Preferences />
                <DeleteAccount />
            </div>
        </>
    );
}