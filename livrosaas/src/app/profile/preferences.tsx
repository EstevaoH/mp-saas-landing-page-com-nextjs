import ThemeSwitch from "@/components/theme-switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function Preferences() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>Personalize sua experiência no sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <ThemeSwitch />
                    <Label htmlFor="theme">Tema Escuro</Label>
                </div>
            </CardContent>
        </Card>
    )
}