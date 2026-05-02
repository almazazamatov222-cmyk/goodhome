'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const t = useTranslations('Navigation');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // In a real scenario with WhatsApp:
    // const { error } = await supabase.auth.signInWithOtp({ phone, options: { channel: 'whatsapp' } });
    
    // Using standard SMS for now
    const { error } = await supabase.auth.signInWithOtp({ phone });
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      setStep('otp');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms'
    });
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      onClose();
      // Optionally reload or update state
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--color-pure-white)] p-8 max-w-md w-full shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-ash-gray)] hover:text-black"
        >
          ✕
        </button>
        
        <h2 className="text-[var(--text-heading)] font-medium mb-6 text-center">
          {step === 'phone' ? t('login') : 'Введите код'}
        </h2>
        
        {step === 'phone' ? (
          <form onSubmit={handleSendCode} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-[var(--color-ash-gray)] mb-2 block">Номер телефона</label>
              <Input 
                type="tel" 
                placeholder="+7 (___) ___-__-__" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
              {loading ? 'Отправка...' : 'Получить код'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-[var(--color-ash-gray)] mb-2 block">Код из SMS/WhatsApp</label>
              <Input 
                type="text" 
                placeholder="000000" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
              {loading ? 'Проверка...' : 'Войти'}
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full text-sm" 
              onClick={() => setStep('phone')}
              disabled={loading}
            >
              Изменить номер
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
