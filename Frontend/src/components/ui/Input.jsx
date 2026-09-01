import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    className,
    id,
    type = 'text',
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-[#2b1d30] tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3.5 text-[#a08ba7] pointer-events-none flex items-center justify-center">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'w-full bg-white border text-[#2b1d30] text-sm rounded-xl px-3.5 py-2.5 transition-all duration-200 shadow-2xs',
            'placeholder:text-[#a08ba7] focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2]',
            LeftIcon ? 'pl-10' : 'pl-3.5',
            RightIcon || error ? 'pr-10' : 'pr-3.5',
            error
              ? 'border-rose-300 bg-rose-50/40 text-rose-800 focus:ring-rose-500/20 focus:border-rose-500'
              : 'border-[#ede3f0] hover:border-[#ce93cb]',
            className
          )}
          {...props}
        />

        {error ? (
          <div className="absolute right-3.5 text-rose-500 pointer-events-none flex items-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        ) : RightIcon ? (
          <div className="absolute right-3.5 text-[#a08ba7] flex items-center">
            {typeof RightIcon === 'function' ? <RightIcon /> : <RightIcon className="w-4 h-4" />}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-[#6e5975] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
