import React from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'text-link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  let baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ';
  
  if (variant === 'primary') {
    // Primary Button (Honey Tone CTA)
    baseStyles += 'bg-[var(--color-carbon-black)] text-[var(--color-barely-white)] rounded-[var(--radius-buttons)] px-[32px] py-[8px] hover:bg-black';
  } else if (variant === 'ghost') {
    // Ghost Button (Menu/Search)
    baseStyles += 'bg-transparent text-[var(--color-pure-black)] border border-[var(--color-pure-black)] hover:bg-gray-100 p-0';
  } else if (variant === 'text-link') {
    // Text Link Button
    baseStyles += 'bg-transparent text-[var(--color-barely-white)] border-b border-[var(--color-barely-white)] pb-0 pt-[4px] px-0 hover:opacity-80 rounded-none';
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
