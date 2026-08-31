import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  excellent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  good: 'bg-blue-50 text-blue-700 border-blue-200',
  average: 'bg-amber-50 text-amber-700 border-amber-200',
  needsImprovement: 'bg-rose-50 text-rose-700 border-rose-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
};

const dotColors = {
  excellent: 'bg-emerald-500',
  good: 'bg-blue-500',
  average: 'bg-amber-500',
  needsImprovement: 'bg-rose-500',
  purple: 'bg-purple-500',
  slate: 'bg-slate-500',
};

export function Badge({
  children,
  variant = 'purple',
  withDot = false,
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border tracking-normal',
        variants[variant] || variants.purple,
        className
      )}
      {...props}
    >
      {withDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant] || dotColors.purple)} />
      )}
      {children}
    </span>
  );
}

export default Badge;
