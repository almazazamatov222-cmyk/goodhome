import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={`w-full bg-[var(--color-pure-white)] text-[var(--color-carbon-black)] border-b border-[var(--color-carbon-black)] text-[var(--text-body)] py-[1px] pr-[2px] focus:outline-none focus:border-b-2 disabled:opacity-50 transition-all ${className}`}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
