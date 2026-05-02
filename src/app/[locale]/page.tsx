'use client';

import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Header } from '@/components/layout/Header';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Home() {
  const t = useTranslations('Index');
  const tNav = useTranslations('Navigation');

  return (
    <div className="min-h-screen bg-[var(--color-pure-white)] text-[var(--color-carbon-black)] selection:bg-[var(--color-midnight-indigo)] selection:text-[var(--color-barely-white)]">
      <Header />

      {/* Premium Hero Section */}
      <section className="relative w-full min-h-[90vh] bg-[var(--color-midnight-indigo)] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=2070" 
            alt="Premium Textile" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-midnight-indigo)] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[var(--color-barely-white)]/60 text-sm tracking-[0.2em] uppercase mb-8 block">
              Новая коллекция
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[48px] md:text-[72px] leading-[1.05] tracking-[-0.056em] text-[var(--color-barely-white)] mb-8 font-medium max-w-4xl"
          >
            {t('title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18px] md:text-[24px] leading-[1.4] text-[var(--color-barely-white)]/70 mb-12 max-w-2xl font-light"
          >
            {t('description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button variant="primary" className="bg-[var(--color-barely-white)] text-[var(--color-midnight-indigo)] hover:bg-white hover:scale-105 transition-all duration-300 px-10 py-4 text-sm tracking-wide">
              {t('cta')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Elegant Products Section */}
      <section className="py-[120px] md:py-[180px] max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-[80px]">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2 className="text-[36px] md:text-[48px] leading-[1.15] tracking-[-0.056em] text-[var(--color-carbon-black)] mb-6">
              {t('bestsellers')}
            </h2>
            <p className="text-[16px] text-[var(--color-ash-gray)] leading-[1.6]">
              {t('bestsellersDescription')}
            </p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button variant="ghost" className="border-b border-black mt-8 md:mt-0 text-sm tracking-wider uppercase pb-1">
              {t('allProducts')}
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&q=80"
            imageAlt="Постельное белье"
            title="Комплект 'Midnight'"
            price="45 000 ₸"
            isNew={true}
            delay={0.1}
          />
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1583847268964-b28e50b58b34?w=1000&q=80"
            imageAlt="Плед"
            title="Кашемировый плед"
            price="32 000 ₸"
            delay={0.3}
            className="md:mt-[80px]"
          />
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1000&q=80"
            imageAlt="Полотенца"
            title="Набор полотенец Spa"
            price="18 500 ₸"
            delay={0.1}
          />
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1596428054924-a21319717b9b?w=1000&q=80"
            imageAlt="Халат"
            title="Шелковый халат"
            price="55 000 ₸"
            isNew={true}
            delay={0.3}
            className="md:mt-[80px]"
          />
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-[var(--color-midnight-indigo)] text-[var(--color-barely-white)] py-[100px] px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="text-3xl font-bold tracking-[0.2em] mb-6">GOOD HOME</div>
            <p className="text-sm opacity-60 leading-relaxed max-w-sm">
              Мы создаем текстиль, который превращает ваш дом в место силы и абсолютного комфорта.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs uppercase tracking-[0.1em] opacity-50 mb-6">Навигация</h4>
            <div className="flex flex-col gap-4">
              <Button variant="text-link" className="w-fit hover:ml-2 transition-all">{tNav('catalog')}</Button>
              <Button variant="text-link" className="w-fit hover:ml-2 transition-all">{tNav('about')}</Button>
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.1em] opacity-50 mb-6">Контакты</h4>
            <p className="text-sm opacity-80 mb-3 hover:opacity-100 transition-opacity cursor-pointer">+7 (777) 123-45-67</p>
            <p className="text-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer">info@goodhome.kz</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
