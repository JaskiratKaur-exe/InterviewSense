import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-gradient-to-r from-[#8c60a2] via-[#cd6775] to-[#fa846e] hover:brightness-105 text-white shadow-sm shadow-[#8c60a2]/25 active:scale-[0.99]',
  secondary: 'bg-white hover:bg-[#faf8fb] text-[#6e4876] border border-[#ede3f0] shadow-xs active:scale-[0.99]',
  outline: 'bg-transparent border border-[#8c60a2] text-[#8c60a2] hover:bg-[#8c60a2]/10',
  ghost: 'bg-transparent hover:bg-[#8c60a2]/10 text-[#6e5975] hover:text-[#6e4876]',
  coral: 'bg-[#fa846e] hover:bg-[#fa846e]/90 text-white shadow-sm shadow-[#fa846e]/25 active:scale-[0.99]',
  danger: 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-2.5 text-base rounded-xl gap-2.5 font-semibold',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8c60a2]/50 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : LeftIcon ? (
        <LeftIcon className="w-4 h-4" />
      ) : null}

      <span>{children}</span>

      {!isLoading && RightIcon && <RightIcon className="w-4 h-4" />}
    </button>
  );
}

export default Button;
