'use client';

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase/client';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    old_price: '',
    image_url: '',
    is_new: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('products').insert([
      {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        old_price: formData.old_price ? parseFloat(formData.old_price) : null,
        image_url: formData.image_url,
        is_new: formData.is_new
      }
    ]);

    setLoading(false);

    if (error) {
      alert('Ошибка при добавлении: ' + error.message);
    } else {
      router.push('/admin/products');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-carbon-black)]">Добавить товар</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Название товара</label>
          <Input 
            required 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Например: Кашемировый плед"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Описание</label>
          <textarea 
            className="w-full bg-[var(--color-pure-white)] text-[var(--color-carbon-black)] border-b border-[var(--color-carbon-black)] text-[var(--text-body)] py-[1px] pr-[2px] focus:outline-none focus:border-b-2 disabled:opacity-50 transition-all min-h-[100px]"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Подробное описание товара..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Цена (₸)</label>
            <Input 
              type="number" 
              required 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Старая цена (₸)</label>
            <Input 
              type="number" 
              value={formData.old_price}
              onChange={(e) => setFormData({...formData, old_price: e.target.value})}
              placeholder="0"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">URL изображения</label>
          <Input 
            type="url" 
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            placeholder="https://..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="is_new"
            checked={formData.is_new}
            onChange={(e) => setFormData({...formData, is_new: e.target.checked})}
            className="w-4 h-4"
          />
          <label htmlFor="is_new" className="text-sm font-medium text-gray-700">Отметить как новинку (New)</label>
        </div>
        
        <div className="flex justify-end gap-4 mt-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/products')} disabled={loading}>
            Отмена
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Сохранение...' : 'Добавить'}
          </Button>
        </div>
      </form>
    </div>
  );
}
