
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { formProfileInputs, formProfileSchema } from "./schema";
import profileActions, { getUserData } from "./profileActions";
import { useSearchParams } from "next/navigation";
import { AlertMessage } from "@/components/alertMessage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default function ProfileForm() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [state, formAction, isPending] = useActionState(profileActions, null);
    const form = useForm<formProfileInputs>({
        resolver: zodResolver(formProfileSchema),
        defaultValues: {
            email: '',
            lastName: '',
            name: '',
            username: '',
        },
    });
    useEffect(() => {
        async function fetchUserData() {
            try {
                if (id) {
                    const data = await getUserData(parseInt(id));
                    if (data) {
                        form.setValue('name', data.name);
                        form.setValue('lastName', data.lastName);
                        form.setValue('username', data.username);
                        form.setValue('email', data.email);
                    }

                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        }

        fetchUserData();
    }, [form, id]);
    return (
        <>
            <AlertMessage
                success={state?.success}
                message={state?.message}
                errors={state?.errors}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Atualize suas informações de contato.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...form} >
                        <form action={formAction}>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu nome de usuário" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Este será o seu nome de exibição público.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu sobrenome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="email@exemplo.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-center">
                                <Button disabled={isPending} className="w-1/3 mt-6" type="submit">
                                    {isPending ? 'Salvando' : 'Salvar Alterações'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}