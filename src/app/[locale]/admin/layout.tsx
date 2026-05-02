import { Link } from '@/i18n/routing';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-midnight-indigo)] text-[var(--color-barely-white)] flex flex-col">
        <div className="p-6 text-xl font-bold uppercase tracking-widest border-b border-white/10">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="px-4 py-2 hover:bg-white/10 rounded transition-colors">Дашборд</Link>
          <Link href="/admin/products" className="px-4 py-2 hover:bg-white/10 rounded transition-colors">Товары</Link>
          <Link href="/admin/orders" className="px-4 py-2 hover:bg-white/10 rounded transition-colors">Заказы</Link>
          <Link href="/admin/users" className="px-4 py-2 hover:bg-white/10 rounded transition-colors">Пользователи</Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="px-4 py-2 hover:bg-white/10 rounded transition-colors block text-center">Вернуться в магазин</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center px-8 justify-between">
          <h1 className="font-medium text-lg">Управление магазином GOOD HOME</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Администратор</span>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
