import Card from '@/components/card'
import FlashSaleTag from '@/components/flash-sale-tag'
import Footer from '@/components/footer'
import HeaderForUser from '@/components/header-for-user'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const CountDowntNoSSR = dynamic(() => import('@/components/count-down'), { ssr: false })

export default function Home() {

  const t = useTranslations('Index')

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-second">
      <HeaderForUser />

      <main className="lg:container flex flex-col w-full gap-4 items-center justify-evenly mt-[140px] md:mt-[80px] mb-10 px-3 md:py-3">
        <div className="hidden md:flex justify-center py-2 bg-white w-full rounded-md ">
          <div className="flex gap-20 px-4 lg:gap-32 overflow-x-auto scrollbar-hide">
            <div className="flex grow-0 shrink-0 items-center gap-4">
              <Image
                src='/icon-shipping.svg'
                width={30}
                height={30}
                alt='Icon shipping'
                className='w-[30px] h-[30px] text-black'
              />
              <div className="text-black">
                <p className="font-bold">Free ship</p>
                <p>Oder over $100</p>
              </div>
            </div>

            <div className="flex grow-0 shrink-0 items-center gap-4">
              <Image
                src='/icon-gift.svg'
                width={30}
                height={30}
                alt='Icon gift'
                className='w-[30px] h-[30px] text-black'
              />
              <div className="text-black">
                <p className="font-bold">Daily Surprise offers</p>
                <p>Save up to 25% off</p>
              </div>
            </div>

            <div className="flex grow-0 shrink-0 items-center gap-4">
              <Image
                src='/icon-seal-percent.svg'
                width={30}
                height={30}
                alt='Icon seal percent'
                className='w-[30px] h-[30px] text-black'
              />
              <div className="text-black">
                <p className="font-bold">Affordable prices</p>
                <p>Get factory direct price</p>
              </div>
            </div>

            <div className="flex grow-0 shrink-0 items-center gap-4">
              <Image
                src='/icon-advise.svg'
                width={30}
                height={30}
                alt='Icon advise'
                className='w-[30px] h-[30px] text-black'
              />
              <div className="text-black">
                <p className="font-bold">Support 24/7</p>
                <p>Shop with an expert</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="flex w-full gap-4">
          <div className="w-9/12 rounded-md">
            <Image
              src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/poco-m6-sliding-cate-27-6-2024.jpg'
              width={200}
              height={200}
              quality={100}
              alt='Banner primary'
              className='w-full h-full rounded-md'
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 rounded-md">
              <Image
                src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-15-pm-nang-cap-5-7-2024.jpg'
                width={20}
                height={20}
                quality={100}
                alt='Banner primary'
                className='w-full h-full rounded-md'
              />
            </div>

            <div className="flex-1 rounded-md">
              <Image
                src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dknt-galaxy-moi-sliding-010724.png'
                width={20}
                height={20}
                quality={100}
                alt='Banner primary'
                className='w-full h-full rounded-md'
              />
            </div>
          </div>

        </div>
        {/* End banner */}

        {/* Nav categories */}
        <div className="w-full bg-[#1a8a9e] rounded-md px-4">
          <div className="flex justify-evenly md:justify-center gap-5 md:gap-8 w-full overflow-x-auto scrollbar-hide">
            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-laptop.svg'
                width={30}
                height={30}
                alt='Laptop icon'
                className='w-[30px] h-[30px]'
              />
              <p>Laptop</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-phone.svg'
                width={30}
                height={30}
                alt='Phone icon'
                className='w-[30px] h-[30px]'
              />
              <p>Smart Phone</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-fashion.svg'
                width={30}
                height={30}
                alt='Fashion icon'
                className='w-[30px] h-[30px]'
              />
              <p>Fashion</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-shopping-bag.svg'
                width={30}
                height={30}
                alt='Shopping bag icon'
                className='w-[30px] h-[30px]'
              />
              <p>Beauty</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-heart-pulse.svg'
                width={30}
                height={30}
                alt='Heart pulse icon'
                className='w-[30px] h-[30px]'
              />
              <p>Health</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-trophy.svg'
                width={30}
                height={30}
                alt='Trophy icon'
                className='w-[30px] h-[30px]'
              />
              <p>Sport</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-toy.svg'
                width={30}
                height={30}
                alt='Toys icon'
                className='w-[30px] h-[30px]'
              />
              <p>Toys</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-book.svg'
                width={30}
                height={30}
                alt='Book icon'
                className='w-[30px] h-[30px]'
              />
              <p>Books</p>
            </Button>

            <Button className="h-fit flex flex-col bg-transparent">
              <Image
                src='/nav-categories/icon-pet.svg'
                width={30}
                height={30}
                alt='pet icon'
                className='w-[30px] h-[30px]'
              />
              <p>Pets</p>
            </Button>
          </div>
        </div>
        {/* End nav categories */}

        {/* Flash sale */}
        <div className="w-full py-6 md:py-10 px-2 md:px-4 bg-gradient-to-b from-main to-[#FAFAFA] rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="ml-10 mr-12">
                <FlashSaleTag />
              </div>

              <CountDowntNoSSR />
            </div>

            <Button variant='link' className="text-white font-semibold text-lg">
              See all
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex w-full gap-2 items-center justify-evenly overflow-x-auto my-10 px-0 md:px-3 md:gap-4 scrollbar-hide">
            <Card title='Màn hình Monitor Xiaomi 27 inch A27i ELA5345EU' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple_m3_slot.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_3.png' price='$500' rating={4} />
            <Card title=' Tai nghe Bluetooth Apple AirPods 3 2022 sạc có dây | Chính hãng Apple Việt Nam' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_170_1_1.png' price='$500' rating={4} />
            <Card title=' Tai nghe Bluetooth Apple AirPods 3 2022 sạc có dây | Chính hãng Apple Việt Nam' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_170_1_1.png' price='$500' rating={4} />
          </div>
        </div>
        {/* End flash sale */}

        {/* Outstanding */}
        <div className="w-full py-10 px-2 md:px-4">
          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-[#1A8B9F] to-[#093239] px-3 py-3 text-white font-bold text-lg md:text-2xl rounded-sm">
              Outstanding
            </div>

            <Button variant='link' className="text-main font-semibold text-lg">
              See all
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex w-full gap-2 px-0 items-center justify-evenly overflow-x-auto my-6 md:px-3 md:gap-4 scrollbar-hide">
            <Card title='Màn hình Monitor Xiaomi 27 inch A27i ELA5345EU' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple_m3_slot.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_3.png' price='$500' rating={4} />
            <Card title=' Tai nghe Bluetooth Apple AirPods 3 2022 sạc có dây | Chính hãng Apple Việt Nam' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_170_1_1.png' price='$500' rating={4} />
            <Card title=' Tai nghe Bluetooth Apple AirPods 3 2022 sạc có dây | Chính hãng Apple Việt Nam' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_170_1_1.png' price='$500' rating={4} />
          </div>
        </div>
        {/* End outstanding */}

        {/* Sugestion for you */}
        <div className="flex flex-col items-center w-full py-10 px-0 md:px-4">
          <div className="w-full flex items-center justify-center">
            <div className="w-full text-center bg-gradient-to-r from-[#1A8B9F] to-[#093239] px-3 py-3 text-white font-bold text-2xl rounded-sm">
              Sugestion for you
            </div>
          </div>

          <div className="grid grid-flow-row grid-cols-2 w-full gap-2 my-6 px-0 md:grid-cols-3 lg:grid-cols-5 md:px-3">
            <Card title='Màn hình Monitor Xiaomi 27 inch A27i ELA5345EU' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple_m3_slot.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_3.png' price='$500' rating={4} />
            <Card title=' Tai nghe Bluetooth Apple AirPods 3 2022 sạc có dây | Chính hãng Apple Việt Nam' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_170_1_1.png' price='$500' rating={4} />
            <Card title=' Tai ngheàn hình Monitor Xiaomi 27 inch A27i ELA5345EU' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple_m3_slot.png' price='$500' rating={4} />
            <Card title='MacBook Air M1 13" (8GB/256GB) - Chính hãng' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_3.png' price='$500' rating={4} />
            <Card title=' Tai nghe Bluetooth Apple AirPods 3 2022 sạc có dây | Chính hãng Apple Việt Nam' imgSrc='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_170_1_1.png' price='$500' rating={4} />
          </div>

          <Button variant='outline' className="text-main font-semibold text-lg">
            See more
          </Button>
        </div>
        {/* End Sugestion for you */}
      </main>
      <Footer />
    </div>
  )
}
