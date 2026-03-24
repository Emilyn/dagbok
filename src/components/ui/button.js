import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium font-sans transition-all duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95', {
    variants: {
        variant: {
            default: 'bg-[#c8a96e] text-ink-900 hover:bg-[#e8cfa0] shadow-lg shadow-[#c8a96e]/20',
            ghost: 'text-ink-300 hover:bg-ink-800 hover:text-ink-100',
            outline: 'border border-ink-700 text-ink-300 hover:bg-ink-800 hover:text-ink-100',
            destructive: 'bg-[#d95f5f]/15 text-[#d95f5f] hover:bg-[#d95f5f]/25 border border-[#d95f5f]/30',
            link: 'text-[#c8a96e] underline-offset-4 hover:underline',
        },
        size: {
            default: 'h-10 px-5 py-2',
            sm: 'h-8 px-3 text-xs',
            lg: 'h-12 px-8 text-base',
            icon: 'h-10 w-10',
        },
    },
    defaultVariants: { variant: 'default', size: 'default' },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return _jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props });
});
Button.displayName = 'Button';
export { Button, buttonVariants };
