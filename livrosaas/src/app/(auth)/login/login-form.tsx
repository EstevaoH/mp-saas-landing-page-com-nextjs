'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import loginAction from './loginActions';
import { useActionState, useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { FormLoginInputs, formLoginSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormLoginInputs>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });
  return (
    <>
      {state?.success === false && (
        <div
          className="grid gap-1 text-xs mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="">
            <strong className="font-bold">Erro!{' '}</strong>
            <span className="block sm:inline">{state?.message}</span>
          </div>
          {state?.errors?.map((error, index) => (
            <div key={index} className="text-red-500 text-sm">
              {error.message}
            </div>
          ))}
        </div>

      )}
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button disabled={isPending} className="w-full mt-6" type="submit">
              {isPending ? "Carregando" : "Entrar"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}