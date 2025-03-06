
"use client"
import { useFormState, useFormStatus } from "react-dom";
import { sendPasswordResetEmail } from "../authActions";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswrodInputs, forgotPasswrodSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertMessage } from "@/components/alertMessage";

export function ForgotPasswordForm() {
    const [state, formAction, isPending] = useActionState(sendPasswordResetEmail, null);
    const form = useForm<forgotPasswrodInputs>({
        resolver: zodResolver(forgotPasswrodSchema),
        defaultValues: {
            email: '',
        },
    });
    return (
        <>
            <AlertMessage
                success={state?.success}
                message={state?.message}
                errors={state?.errors}
            />
            <Form {...form} >
                <form action={formAction}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="Seu e-mail" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div>
                        <Button disabled={isPending} className="w-full mt-6" type="submit">
                            {isPending ? "Carregando" : "Enviar link de Recuperação"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {pending ? "Enviando..." : "Enviar Link de Recuperação"}
        </button>
    );
}