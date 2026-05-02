import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Header } from '@/components/layout/Header';
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  const tNav = useTranslations('Navigation');

  return (
    <div className="min-h-screen bg-[var(--color-pure-white)] text-[var(--color-carbon-black)]">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] bg-[var(--color-midnight-indigo)] flex flex-col justify-center items-center text-center px-4">
        {/* Placeholder for hero image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=2070')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        
        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          <h1 className="text-[var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--color-barely-white)] mb-6 font-medium">
            {t('title')}
          </h1>
          <p className="text-[var(--text-heading)] leading-[var(--leading-heading)] text-[var(--color-barely-white)]/80 mb-10 max-w-xl">
            {t('description')}
          </p>
          <Button variant="primary">
            {t('cta')}
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-[var(--spacing-80)] max-w-7xl mx-auto px-6">
        <div className="text-center mb-[var(--spacing-48)]">
          <h2 className="text-[var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] mb-4">
            {t('bestsellers')}
          </h2>
          <p className="text-[var(--color-ash-gray)] max-w-2xl mx-auto">
            {t('bestsellersDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80"
            imageAlt="Постельное белье"
            title="Комплект 'Midnight'"
            price="45 000 ₸"
            isNew={true}
          />
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1583847268964-b28e50b58b34?w=500&q=80"
            imageAlt="Плед"
            title="Кашемировый плед"
            price="32 000 ₸"
          />
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80"
            imageAlt="Полотенца"
            title="Набор полотенец Spa"
            price="18 500 ₸"
          />
          <FeatureCard 
            imageSrc="https://images.unsplash.com/photo-1596428054924-a21319717b9b?w=500&q=80"
            imageAlt="Халат"
            title="Шелковый халат"
            price="55 000 ₸"
            isNew={true}
          />
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="ghost" className="border-b">{t('allProducts')}</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-midnight-indigo)] text-[var(--color-barely-white)] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold mb-4">GOOD HOME</div>
            <p className="text-sm opacity-70">Магазин премиального текстиля</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{tNav('catalog')}</h4>
            <div className="flex flex-col gap-2">
              <Button variant="text-link" className="w-fit">{tNav('catalog')}</Button>
              <Button variant="text-link" className="w-fit">{tNav('about')}</Button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">{tNav('contact')}</h4>
            <p className="text-sm opacity-70 mb-2">+7 (777) 123-45-67</p>
            <p className="text-sm opacity-70">info@goodhome.kz</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
