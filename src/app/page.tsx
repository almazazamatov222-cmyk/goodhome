import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-pure-white)] text-[var(--color-carbon-black)]">
      {/* Navbar Placeholder */}
      <header className="sticky top-0 z-50 w-full bg-[var(--color-pure-white)]/80 backdrop-blur-md border-b border-[var(--color-pale-silver)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-[var(--tracking-heading)] uppercase">GOOD HOME</div>
          <nav className="hidden md:flex gap-8">
            <Button variant="ghost">Каталог</Button>
            <Button variant="ghost">О нас</Button>
            <Button variant="ghost">Контакты</Button>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm cursor-pointer hover:opacity-70 text-[var(--color-ash-gray)]">RU / KK / EN</span>
            <Button variant="ghost">Войти</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] bg-[var(--color-midnight-indigo)] flex flex-col justify-center items-center text-center px-4">
        {/* Placeholder for hero image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=2070')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        
        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          <h1 className="text-[var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--color-barely-white)] mb-6 font-medium">
            Искусство домашнего уюта
          </h1>
          <p className="text-[var(--text-heading)] leading-[var(--leading-heading)] text-[var(--color-barely-white)]/80 mb-10 max-w-xl">
            Эксклюзивный текстиль для вашего дома. Высочайшее качество и неповторимый стиль.
          </p>
          <Button variant="primary">
            Смотреть коллекцию
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-[var(--spacing-80)] max-w-7xl mx-auto px-6">
        <div className="text-center mb-[var(--spacing-48)]">
          <h2 className="text-[var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] mb-4">
            Бестселлеры
          </h2>
          <p className="text-[var(--color-ash-gray)] max-w-2xl mx-auto">
            Ознакомьтесь с нашей коллекцией премиального постельного белья и текстиля, созданной для идеального комфорта.
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
          <Button variant="ghost" className="border-b">Все товары</Button>
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
            <h4 className="font-bold mb-4">Навигация</h4>
            <div className="flex flex-col gap-2">
              <Button variant="text-link" className="w-fit">Каталог</Button>
              <Button variant="text-link" className="w-fit">О нас</Button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <p className="text-sm opacity-70 mb-2">+7 (777) 123-45-67</p>
            <p className="text-sm opacity-70">info@goodhome.kz</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
