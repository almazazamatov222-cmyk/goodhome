'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useTranslations } from 'next-intl';
import { AuthModal } from '../auth/AuthModal';
import { usePathname, useRouter } from '@/i18n/routing';

export function Header() {
  const tNav = useTranslations('Navigation');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (locale: 'ru' | 'kk' | 'en') => {
    router.replace(pathname, { locale });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[var(--color-pure-white)]/80 backdrop-blur-md border-b border-[var(--color-pale-silver)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-[var(--tracking-heading)] uppercase">GOOD HOME</div>
          <nav className="hidden md:flex gap-8">
            <Button variant="ghost">{tNav('catalog')}</Button>
            <Button variant="ghost">{tNav('about')}</Button>
            <Button variant="ghost">{tNav('contact')}</Button>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 text-sm text-[var(--color-ash-gray)]">
              <button onClick={() => changeLocale('ru')} className="hover:text-black">RU</button>
              <span>/</span>
              <button onClick={() => changeLocale('kk')} className="hover:text-black">KK</button>
              <span>/</span>
              <button onClick={() => changeLocale('en')} className="hover:text-black">EN</button>
            </div>
            <Button variant="ghost" onClick={() => setIsAuthOpen(true)}>{tNav('login')}</Button>
          </div>
        </div>
      </header>
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
