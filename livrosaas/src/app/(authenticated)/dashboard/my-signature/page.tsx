"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCard, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBillingHistory, getSubscriptionDetails } from '../actions/getSubscriptionDetails';
import { BillingHistory } from './billing-history';
import { useSearchParams } from 'next/navigation';
import { LoadingSpinner } from '@/components/loadingSpinner';
import BannerError from '@/components/banner-error';

type PlanCardProps = {
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  status: string;
  nextBillingDate: Date;
};

export type BillingHistoryItem = {
  id: number;
  userId: number;
  planId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId?: string | undefined | null;
  billingCycle: string;
  nextBillingDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export default function MySubscription() {
  const [signature, setSignature] = useState<PlanCardProps | null>(null);
  const [billingHistoryData, setBillingHistoryData] = useState<BillingHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {

      const subscriptionResult = await getSubscriptionDetails();
      if (subscriptionResult.success && subscriptionResult.data) {
        setSignature(subscriptionResult.data);
      } else {
        setError("Não foi possível carregar os detalhes da assinatura.");
      }
      const billingHistoryResult = await getBillingHistory(parseInt(id!));
      if (billingHistoryResult) {
        const formattedData = billingHistoryResult.map((item) => ({
          ...item,
          userId: item.userId || 0,
          planId: item.planId || 0,
          nextBillingDate: item.nextBillingDate || new Date(),
          updatedAt: item.updatedAt || new Date(),
        }));
        setBillingHistoryData(formattedData);
      } else {
        setError("Não foi possível carregar o histórico de assinatura.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setError("Ocorreu um erro ao carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <BannerError text={error} type="error" />
    // return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Minha Assinatura</h1>
      <div className="flex gap-10">
        {signature ? (
          <PlanCard
            name={signature.name}
            description={signature.description}
            price={signature.price}
            billingCycle={signature.billingCycle}
            status={signature.status}
            nextBillingDate={signature.nextBillingDate}
          />
        ) : (
          <div>Nenhum plano encontrado.</div>
        )}
        <ActionCard plan={signature?.name || "free"} />
      </div>
      <BillingHistory billingHistory={billingHistoryData} />
    </>
  );
}

function PlanCard({ name, billingCycle, nextBillingDate, price, status }: PlanCardProps) {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Detalhes da Assinatura</CardTitle>
        <CardDescription>Informações sobre seu plano atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Plano:</span>
            <span>{name === "free" ? "Gratuito" : "VIP"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`${status === "active" ? "text-green-600" : "text-red-600"}`}>
              {status === "active" ? "Ativo" : "Inativo"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Próxima cobrança:</span>
            <span>{nextBillingDate.toLocaleDateString("pt-br")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor:</span>
            <span>{price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ciclo:</span>
            <span>{billingCycle === "monthly" ? "Mensal" : "Anual"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionCard({ plan }: { plan: string }) {
  return (
    <Card className="w-full max-w-sm h-full">
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>
          {plan === "free" ? "Atualize seu plano para desbloquear mais recursos" : "Gerencie sua assinatura"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {plan === "free" ? (
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <CreditCard className="mr-2 h-5 w-5" />
              Atualizar para VIP
            </button>
          ) : (
            <>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                Atualizar método de pagamento
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <XCircle className="mr-2 h-5 w-5" />
                Cancelar assinatura
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}