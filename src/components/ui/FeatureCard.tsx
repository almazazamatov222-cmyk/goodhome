'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price?: string;
  isNew?: boolean;
  delay?: number;
  className?: string;
}

export function FeatureCard({ imageSrc, imageAlt, title, price, isNew, delay = 0, className = '' }: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-transparent group relative w-full flex flex-col cursor-pointer ${className}`}
    >
      <div className="relative w-full aspect-[4/5] bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-[#f5f5f5]"></div>
        )}
        
        {isNew && (
          <div className="absolute top-6 left-6 text-[var(--color-carbon-black)] text-[10px] tracking-[0.2em] uppercase font-bold z-10">
            Новинка
          </div>
        )}
      </div>
      <div className="mt-8 flex justify-between items-start">
        <h3 className="text-[18px] md:text-[24px] tracking-[-0.01em] text-[var(--color-carbon-black)] font-medium leading-tight">
          {title}
        </h3>
        {price && (
          <p className="text-[16px] text-[var(--color-ash-gray)] font-light mt-1">
            {price}
          </p>
        )}
      </div>
    </motion.div>
  );
}
