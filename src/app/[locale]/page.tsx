import Card from '@/components/card'
import Footer from '@/components/footer'
import HeaderForUser from '@/components/header-for-user'
import { useTranslations } from 'next-intl'

export default function Home() {

  const t = useTranslations('Index')

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-second">
      <HeaderForUser />
      <h1>{t('title')}</h1>
      <div className="lg:container flex w-full gap-4 items-center justify-evenly mt-[120px] md:mt-[80px] mb-10 overflow-x-auto px-3 md:py-3">
        <Card imgSrc="/mac.svg" title="MacBook Air M1 13&quot; (8GB/256GB) - Chính hãng" price="$599" rating={3.5} tag="-10%" />
        <Card imgSrc="/iphone.svg" title="MacBook Air M1 13&quot; (8GB/256GB) - Chính hãng" price="$599" rating={3.5} />
        <Card imgSrc="/mac.svg" title="MacBook Air M1 13&quot; (8GB/256GB) - Chính hãng" price="$599" rating={3.5} />
        <Card imgSrc="/iphone.svg" title="MacBook Air M1 13&quot; (8GB/256GB) - Chính hãng" price="$599" rating={3.5} />
        <Card imgSrc="/mac.svg" title="MacBodok Air M1 13&quot; (8GB/256GB) - Chính hãng" price="$599" rating={3.5} />
      </div>
      <Footer />
    </div>
  )
}
