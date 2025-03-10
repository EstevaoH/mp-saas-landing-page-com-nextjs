"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { CheckoutForm } from "./checkout-form";

export default function CheckoutPage() {


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription className="text-lg font-semibold">Plano VIP</CardDescription>
          <p className="text-gray-600">R$29,00</p>
          <small className="text-sm text-gray-500">
            Com o Plano VIP, você terá acesso ilimitado a uma curadoria exclusiva de livros selecionados por
            especialistas, além de benefícios premium que vão elevar seus estudos e seu conhecimento a um novo patamar.
          </small>
        </CardHeader>
        <CardContent>
          <CheckoutForm />

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Ao continuar, você concorda com os{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}