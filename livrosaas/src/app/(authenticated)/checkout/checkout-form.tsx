import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckoutFormInputs, checkoutFormSchema } from "./schema";
import { formatCardNumber } from "@/app/utils/formatCardNumber";
import { formatZipCode } from "@/app/utils/formatZipCode";
import checkoutAction from "./actions/checkoutActions";
import { AlertMessage } from "@/components/alertMessage";

export function CheckoutForm() {
    const [state, formAction, isPending] = useActionState(checkoutAction, null);
    const [saveInfo, setSaveInfo] = useState(false);

    const form = useForm<CheckoutFormInputs>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            cardholderName: '',
            cardNumber: '',
            country: '',
            cvc: '',
            expiryDate: '',
            zipCode: '',
        },
    });


    return (
        <>
            <AlertMessage
                success={state?.success}
                message={state?.message}
                errors={state?.errors}
            />
            <Form {...form}>
                <form action={formAction} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número do Cartão</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="0000 0000 0000 0000"
                                        {...field}
                                        onChange={(e) => {
                                            const formattedValue = formatCardNumber(e.target.value);
                                            field.onChange(formattedValue);
                                        }}
                                        value={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Validade (MM/AA)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="MM/AA" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                        <Input placeholder="000" {...field} maxLength={3} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="cardholderName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Titular</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome completo no cartão" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecione um país</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um país" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="United States">Estados Unidos</SelectItem>
                                        <SelectItem value="Brazil">Brasil</SelectItem>
                                        <SelectItem value="Canada">Canadá</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="00000-000"
                                        {...field}
                                        onChange={(e) => {
                                            const formattedValue = formatZipCode(e.target.value);
                                            field.onChange(formattedValue);
                                        }}
                                        value={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="save-info"
                            checked={saveInfo}
                            onCheckedChange={(checked) => setSaveInfo(!!checked)}
                        />
                        <label htmlFor="save-info" className="text-sm text-gray-700">
                            Salvar minhas informações para futuras compras
                        </label>
                    </div>
                    <Button type="submit" className="w-full">
                        Finalizar Compra
                    </Button>
                </form>
            </Form>
        </>
    );
}