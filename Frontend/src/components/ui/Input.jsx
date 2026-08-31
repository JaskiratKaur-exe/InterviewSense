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
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-300 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3.5 text-slate-500 pointer-events-none flex items-center justify-center">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'w-full bg-slate-900/80 border text-slate-100 text-sm rounded-xl px-3.5 py-2.5 transition-all duration-200',
            'placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60',
            LeftIcon ? 'pl-10' : 'pl-3.5',
            RightIcon || error ? 'pr-10' : 'pr-3.5',
            error
              ? 'border-rose-500/50 bg-rose-950/10 focus:ring-rose-500/30 focus:border-rose-500'
              : 'border-slate-800 hover:border-slate-700',
            className
          )}
          {...props}
        />

        {error ? (
          <div className="absolute right-3.5 text-rose-400 pointer-events-none flex items-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        ) : RightIcon ? (
          <div className="absolute right-3.5 text-slate-500 pointer-events-none flex items-center">
            <RightIcon className="w-4 h-4" />
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-medium">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
