import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-carbon-black)]">Общая статистика</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm mb-2">Всего продаж</h3>
          <p className="text-3xl font-bold">0 ₸</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm mb-2">Заказы</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm mb-2">Пользователи</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm mb-2">Товары</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[400px]">
        <h3 className="text-lg font-bold mb-4">Последние заказы</h3>
        <div className="flex items-center justify-center h-64 text-gray-400">
          Здесь будут отображаться новые заказы
        </div>
      </div>
    </div>
  );
}
