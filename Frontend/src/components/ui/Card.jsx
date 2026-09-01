import React from 'react';
import { cn } from '../../utils/cn';

export function Card({
  children,
  variant = 'default',
  hover = false,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 bg-white border border-[#ede3f0]/80 card-shadow transition-all duration-200',
        variant === 'purple-gradient' && 'bg-gradient-to-r from-[#6e4876] via-[#8c60a2] to-[#cd6775] text-white border-transparent shadow-lg shadow-[#6e4876]/20',
        variant === 'sunset-gradient' && 'bg-gradient-to-r from-[#8c60a2] via-[#cd6775] to-[#fa846e] text-white border-transparent shadow-lg shadow-[#8c60a2]/20',
        variant === 'subtle' && 'bg-[#faf8fb] border border-[#ede3f0]',
        hover && 'card-shadow-hover hover:border-[#ce93cb] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('flex items-center justify-between pb-3 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn('text-base font-bold text-[#2b1d30] tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('text-xs text-[#6e5975] mt-0.5', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return <div className={cn('space-y-4', className)} {...props}>{children}</div>;
}

export default Card;
