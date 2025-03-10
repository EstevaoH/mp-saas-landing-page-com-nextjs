"use client"
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkUserPlan } from './actions/checkUserPlan';
import WithoutSubscription from './page-without-subscription';

export default function MonthlyBook() {
  const [signature, setSignature] = useState<boolean>();
  const handleCheckPlan = async () => {
    const result = await checkUserPlan();
    if (result.planId === 1) {
      setSignature(true);
    } else {
      setSignature(false);
    }
  };

  useEffect(() => {
    handleCheckPlan();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Livro do Mês</h1>
      {signature ? (
        <WithoutSubscription />
      ) : (
        <Link
          className={cn(
            'flex items-center justify-center gap-4 mt-10',
            buttonVariants()
          )}
          href="/livro.pdf"
          target="_blank"
        >
          <Download className="h-4 w-4" /> Download do Pdf
        </Link>
      )}
    </>
  );
}