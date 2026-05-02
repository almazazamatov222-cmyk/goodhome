'use client'

import { CommandMenu } from '@/components/composites/command'
import { MobileNav } from '@/components/native/nav/mobile'
import { UserNav } from '@/components/native/nav/user'
import { MainNav } from '@/components/native/nav/desktop'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { 
   LogInIcon, 
   ShoppingBasketIcon, 
   Search, 
   Menu, 
   Heart, 
   BarChart2, 
   MapPin, 
   Smartphone,
   ChevronDown
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

export default function Header() {
   const { authenticated } = useAuthenticated()

   return (
      <header className="w-full bg-white dark:bg-neutral-900 border-b">
         {/* Top bar */}
         <div className="bg-neutral-50 dark:bg-neutral-800 border-b py-2 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] text-xs flex justify-between items-center text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition">
                  <MapPin size={14} />
                  <span>Алматы</span>
               </div>
               <span className="cursor-pointer hover:text-orange-500 transition">Магазины</span>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition text-blue-600 font-medium">
                  <Smartphone size={14} />
                  <span>Скачать приложение</span>
               </div>
               <div className="flex items-center gap-1">
                  <span>1717</span>
                  <span className="text-[10px] opacity-60">с 9:00 до 22:00</span>
               </div>
               <div className="flex items-center gap-2 border-l pl-4">
                  <span className="font-bold text-neutral-900 dark:text-white underline underline-offset-4 decoration-orange-500">Рус</span>
                  <span className="opacity-40">Қаз</span>
               </div>
            </div>
         </div>

         {/* Main bar */}
         <div className="h-20 flex items-center gap-6 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            {/* Logo */}
            <Link href="/" className="flex-none">
               <h1 className="text-2xl font-black tracking-tighter text-orange-500">GOOD<span className="text-neutral-900 dark:text-white">HOME</span></h1>
            </Link>

            {/* Catalog Button */}
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 flex gap-2 h-12 rounded-xl">
               <Menu size={20} />
               <span>Каталог</span>
            </Button>

            {/* Search Bar */}
            <div className="flex-1 relative">
               <Input 
                  placeholder="Я хочу найти..." 
                  className="w-full h-12 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl pl-4 pr-12 focus-visible:ring-2 focus-visible:ring-orange-500"
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Search size={20} />
               </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
               <Link href="/favorites">
                  <NavIcon icon={<Heart size={22} />} label="Избранное" />
               </Link>
               <Link href="/compare">
                  <NavIcon icon={<BarChart2 size={22} className="rotate-90" />} label="Сравнить" />
               </Link>
               <Link href="/cart">
                  <NavIcon icon={<ShoppingBasketIcon size={22} />} label="Корзина" />
               </Link>
               {authenticated ? (
                  <UserNav />
               ) : (
                  <Link href="/login">
                     <NavIcon icon={<LogInIcon size={22} />} label="Вход" />
                  </Link>
               )}
            </div>
         </div>

         {/* Bottom bar - Categories */}
         <div className="flex items-center gap-6 py-3 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link href="/promo" className="text-orange-500 cursor-pointer flex items-center gap-1"><span className="text-lg">🔥</span> Акции</Link>
            <Link href="/categories/textile" className="hover:text-orange-500 cursor-pointer transition">Текстиль</Link>
            <Link href="/categories/bedding" className="hover:text-orange-500 cursor-pointer transition">Постельное белье</Link>
            <Link href="/categories/kitchen" className="hover:text-orange-500 cursor-pointer transition">Для кухни</Link>
            <Link href="/categories/decor" className="hover:text-orange-500 cursor-pointer transition">Декор</Link>
            <Link href="/categories/gifts" className="hover:text-orange-500 cursor-pointer transition">Подарки</Link>
            <Link href="/categories/sales" className="hover:text-orange-500 cursor-pointer transition">Скидки</Link>
         </div>
      </header>
   )
}

function NavIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <div className="flex flex-col items-center justify-center min-w-[70px] cursor-pointer hover:text-orange-500 transition group">
         <div className="text-neutral-700 dark:text-neutral-300 group-hover:text-orange-500 transition">
            {icon}
         </div>
         <span className="text-[10px] mt-1 font-medium">{label}</span>
      </div>
   )
}

