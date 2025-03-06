import { AlertMessage } from "@/components/alertMessage";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { desactiveAccountInputs, desactiveAccountSchema } from "./schema";
import { desactiveAccountActions } from "./profileActions";
import { signOut } from "next-auth/react";

export default function ConfirmDeactivationModal() {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(desactiveAccountActions, null);

    const form = useForm<desactiveAccountInputs>({
        resolver: zodResolver(desactiveAccountSchema),
        defaultValues: {
            desactiveAccountCode: "",
        },
    });

    useEffect(() => {
        if (state?.success) {
            const timer = setTimeout(() => {
                setOpen(false);
                form.reset();
                signOut({
                    // redirect: true,
                    redirectTo: '/login'
                });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state?.success, form]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Desativar Conta</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Desativar Conta</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza de que deseja desativar sua conta? Esta ação é irreversível e todos os seus dados serão permanentemente removidos. Para confirmar, insira sua senha atual.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertMessage
                    success={state?.success}
                    message={state?.message}
                    errors={state?.errors}
                />
                <Form {...form}>
                    <form action={formAction} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="desactiveAccountCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha Atual</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="password"
                                                placeholder="Digite sua senha atual"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <Button variant={'destructive'} type="submit" disabled={isPending}>
                                {isPending ? "Desativando..." : "Desativar Conta"}
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}