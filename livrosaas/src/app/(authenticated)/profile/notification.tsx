'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useSearchParams } from 'next/navigation';
import { updateUserSetting } from './profileActions';

export function Notification({ notificationsEnabled }: { notificationsEnabled: boolean }) {
    const [enabled, setEnabled] = useState(notificationsEnabled);
    const searchParams = useSearchParams();
    const userId = parseInt(searchParams.get('id')!);

    const handleToggle = async (checked: boolean) => {
        setEnabled(checked);

        try {
            const result = await updateUserSetting(userId, 'notifications', checked);
            if (!result.success) {
                setEnabled(!checked);
                console.error('Erro ao salvar preferência:', result.message);
            }
        } catch (error) {
            console.error('Erro ao alternar notificações:', error);
            setEnabled(!checked);
        }
    };

    useEffect(() => {
        setEnabled(notificationsEnabled)
    }, [notificationsEnabled, setEnabled]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Habilitar notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Switch checked={enabled} onCheckedChange={handleToggle} id="notifications" />
                    <span>{enabled ? 'Habilitado' : 'Desabilitado'}</span>
                </div>
            </CardContent>
        </Card>
    );
}