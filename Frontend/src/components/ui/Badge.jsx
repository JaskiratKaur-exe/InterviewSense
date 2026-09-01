import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  amethyst: 'bg-[#8c60a2]/10 text-[#6e4876] border-[#8c60a2]/30 font-semibold',
  plum: 'bg-[#6e4876]/10 text-[#6e4876] border-[#6e4876]/30 font-semibold',
  lilac: 'bg-[#ce93cb]/25 text-[#6e4876] border-[#ce93cb]/50 font-semibold',
  rose: 'bg-[#cd6775]/10 text-[#cd6775] border-[#cd6775]/30 font-semibold',
  coral: 'bg-[#fa846e]/10 text-[#fa846e] border-[#fa846e]/30 font-semibold',
  purple: 'bg-[#8c60a2]/10 text-[#6e4876] border-[#8c60a2]/30 font-semibold',
  excellent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  good: 'bg-[#8c60a2]/15 text-[#6e4876] border-[#8c60a2]/30',
  average: 'bg-amber-50 text-amber-700 border-amber-200',
  needsImprovement: 'bg-[#cd6775]/15 text-[#cd6775] border-[#cd6775]/30',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
};

const dotColors = {
  amethyst: 'bg-[#8c60a2]',
  plum: 'bg-[#6e4876]',
  lilac: 'bg-[#ce93cb]',
  rose: 'bg-[#cd6775]',
  coral: 'bg-[#fa846e]',
  purple: 'bg-[#8c60a2]',
  excellent: 'bg-emerald-500',
  good: 'bg-[#8c60a2]',
  average: 'bg-amber-500',
  needsImprovement: 'bg-[#cd6775]',
  slate: 'bg-slate-500',
};

export function Badge({
  children,
  variant = 'amethyst',
  withDot = false,
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border tracking-normal',
        variants[variant] || variants.amethyst,
        className
      )}
      {...props}
    >
      {withDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant] || dotColors.amethyst)} />
      )}
      {children}
    </span>
  );
}

export default Badge;
