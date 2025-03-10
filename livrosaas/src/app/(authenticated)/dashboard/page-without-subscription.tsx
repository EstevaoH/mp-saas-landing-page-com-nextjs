import BannerWarning from '@/components/banner-warning';
import PricingCard from '@/components/pricing-card';

export default function WithoutSubscription() {
  return (
    <>
      <BannerWarning text="Para acessar o livro do mês, você precisa de uma assinatura ativa. Quer tal assinar agora?" />
      <PricingCard />
    </>
  );
}