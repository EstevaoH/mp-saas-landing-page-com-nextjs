import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePasswordModal } from "./change-password-modal";

export function Security() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>Proteja sua conta com senha forte e autenticação de dois fatores.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ChangePasswordModal />
                    {/* <div className="flex items-center space-x-4">
                        <Switch id="2fa" />
                        <Label htmlFor="2fa">Habilitar Autenticação de Dois Fatores (2FA)</Label>
                    </div> */}
                </CardContent>
            </Card>
        </>
    )
}