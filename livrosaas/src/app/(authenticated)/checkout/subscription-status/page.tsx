import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SubscriptionStatusPage() {
    return (   
        <div className="flex justify-center">
            <Card className="max-w-sm w-full rounded-2xl shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-gray-800">Assinatura Confirmada!</h2>
                    <CardDescription className="mt-2 text-gray-600">
                        Obrigado por se juntar a nossa comunidade LivroSaaS
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="mt-4 text-gray-600">
                        Sua assinatura foi processada com sucesso e sua conta está ativa agora.
                    </p>
                    <p className="mt-4 text-gray-600">
                        Agora é só aproveitar nosso conteúdo.
                    </p>
                    <Button className="w-full mt-6">
                        Ir para Dashboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}