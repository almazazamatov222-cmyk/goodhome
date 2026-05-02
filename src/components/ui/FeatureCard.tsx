import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price?: string;
  isNew?: boolean;
}

export function FeatureCard({ imageSrc, imageAlt, title, price, isNew }: FeatureCardProps) {
  return (
    <div className="bg-transparent group relative w-full flex flex-col gap-[var(--element-gap)] cursor-pointer">
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        {/* Mock image placeholder if real one not provided, else next/image */}
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        
        {isNew && (
          <div className="absolute top-4 left-4 bg-[var(--color-pure-white)] text-[var(--color-carbon-black)] rounded-[var(--radius-badges)] px-2 py-1 text-xs font-bold uppercase z-10">
            New
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-[var(--text-heading)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--color-carbon-black)] font-medium">
          {title}
        </h3>
        {price && (
          <p className="text-[var(--text-body)] text-[var(--color-ash-gray)] mt-1">
            {price}
          </p>
        )}
      </div>
    </div>
  );
}
