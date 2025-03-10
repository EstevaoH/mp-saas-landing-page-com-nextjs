"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BillingHistoryItem } from "./page";

type BillingHistoryProps = {
    billingHistory: BillingHistoryItem[];
  };

export function BillingHistory({ billingHistory }: BillingHistoryProps) {
    return (
        <Card className="my-4">
            <CardHeader>
                <CardTitle>Histórico de Cobranças</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {billingHistory.map((bill, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">{bill.nextBillingDate.toLocaleString("pt-BR",{dateStyle: "short"})}</p>
                                <p className="text-sm text-gray-500">{bill.planId === 1 ? "Gratutito" : ""}</p>
                            </div>
                            <div>
                                <p className="font-medium">{bill.amount.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                                <p className={`text-sm ${bill.status === "Pago" ? "text-green-500" : "text-red-500"}`}>
                                    {bill.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}