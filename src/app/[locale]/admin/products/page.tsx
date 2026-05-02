import React from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-carbon-black)]">Товары</h2>
        <Link href="/admin/products/new">
          <Button variant="primary">Добавить товар</Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-medium text-gray-600">ID</th>
              <th className="p-4 font-medium text-gray-600">Название</th>
              <th className="p-4 font-medium text-gray-600">Цена</th>
              <th className="p-4 font-medium text-gray-600">Новинка</th>
              <th className="p-4 font-medium text-gray-600 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-400">
                Пока нет добавленных товаров. База данных пуста.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
