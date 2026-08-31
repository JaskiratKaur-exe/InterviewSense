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
        'rounded-2xl p-6 bg-white border border-slate-100 card-shadow transition-all duration-200',
        variant === 'purple-gradient' && 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-transparent shadow-lg shadow-purple-500/15',
        variant === 'subtle' && 'bg-slate-50 border border-slate-200/60',
        hover && 'card-shadow-hover hover:border-purple-200 cursor-pointer',
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
    <h3 className={cn('text-base font-bold text-slate-800 tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('text-xs text-slate-500 mt-0.5', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return <div className={cn('space-y-4', className)} {...props}>{children}</div>;
}

export default Card;
